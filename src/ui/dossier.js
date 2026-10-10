import { h, replace } from './dom.js';
import { t, fieldLabel, valueLabel, formatNumber } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { modal } from './overlay.js';
import { FIELDS, contactsUnlockedAt, fieldsUnlockedAt } from '../core/fields.js';
import { compileRules, matchesCompiled, VERDICTS, fieldBlock, rule } from '../core/rules.js';
import { contactsOf } from '../core/game.js';
import { nameOf, registryOf, portraitOf, viewValue, humanLineOf } from './citizen.js';

export function openDossier(ctx, id) {
  modal((box, close) => {
    const render = (citizen) => {
      const current = store.state();
      const result = store.monthResult();
      const view = result.view;
      const month = current.month;
      const jailedMonth = current.jailed[citizen];
      const compiled = compileRules(result.rules);
      const matching = compiled.map((entry, index) => (view.present[citizen] && matchesCompiled(entry, view, citizen) ? index + 1 : 0)).filter(Boolean);
      const verdict = jailedMonth ? null : VERDICTS[result.verdicts[citizen]];
      const fields = FIELDS.map((field) => [fieldLabel(field.key), field.unlock <= month ? valueLabel(field.key, viewValue(view, field.key, citizen)) : t('dossier.hidden')]);
      const contactList = contactsUnlockedAt(month)
        ? h('div.contact-list', null, contactsOf(world, current, citizen)
          .filter((other) => world.population.arrival[other] <= month)
          .map((other) => h('button.chip' + (current.jailed[other] ? '.jailed' : ''), { onclick: () => render(other) }, nameOf(other), current.jailed[other] ? ` · ${t('table.jailed')}` : '')))
        : h('p.small.dim', null, t('dossier.contactsLocked'));
      replace(box.querySelector('.dossier-body') ?? box.appendChild(h('div.dossier-body')),
        h('h2', null, nameOf(citizen), ' ', h('span.small.dim', null, registryOf(citizen))),
        h('div.dossier', null,
          h('div', null,
            h('img.portrait', { src: portraitOf(citizen, jailedMonth ? 'paper' : 'terminal'), alt: '' }),
            verdict ? h('p', null, h(`span.verdict.${verdict}`, null, t(`verdicts.${verdict}`))) : null),
          h('div', null,
            h('dl', null, fields.map(([label, value]) => [h('dt', null, label), h('dd', null, value)])),
            jailedMonth
              ? h('p.red', null, t('dossier.jailed', { month: jailedMonth }), ' · ', t('dossier.trial', { verdict: t(current.jailedGuilty[citizen] ? 'briefing.guilty' : 'briefing.innocent') }), h('br'), h('span.small.dim', null, humanLineOf(citizen)))
              : h('p.small', null, t('dossier.matchedBy'), ': ', matching.length ? matching.map((n) => t('shift.rule', { n })).join(', ') : t('dossier.noRule')),
            h('h3.small.dim', null, t('dossier.contacts'), contactsUnlockedAt(month) ? ` (${formatNumber(contactsOf(world, current, citizen).length)})` : ''),
            contactList,
            jailedMonth ? null : h('p', null, h('button.btn.small', {
              onclick: () => {
                const draftRule = rule('watch', fieldsUnlockedAt(month).map((field) => fieldBlock(field.key, [viewValue(view, field.key, citizen)])));
                if (ctx.addRule(draftRule)) close();
              },
            }, t('dossier.draftRule'))),
          ),
        ),
      );
    };
    render(id);
  });
}

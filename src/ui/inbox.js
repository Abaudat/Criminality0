import { h, icon, replace } from './dom.js';
import { t, s, fill, fieldLabel, valueLabel } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { inboxFor } from '../core/story.js';
import { VERDICTS, fieldBlock, rule } from '../core/rules.js';
import { fieldsUnlockedAt } from '../core/fields.js';
import { nameOf, portraitOf, profileText, viewValue, registryOf } from './citizen.js';
import { sfx } from '../audio/sound.js';

function liveVerdict(current, result, id) {
  return current.jailed[id] ? 'detain' : VERDICTS[result.verdicts[id]];
}

function itemTitle(item) {
  if (item.kind === 'tip') return s(`tips.${item.id}.subject`);
  if (item.kind === 'letter') return nameOf(item.citizen);
  if (item.kind === 'forced') return nameOf(item.targets[0]);
  return s(`requests.${item.id}.subject`);
}

function memo({ from, subject, body }, extra) {
  const vars = { first: store.getSave().profile.first };
  return h('article.memo', null,
    h('div.memo-head', null, h('b', null, t('inbox.from')), h('span', null, from), h('b', null, t('inbox.re')), h('span', null, fill(subject, vars))),
    h('div', null, fill(body, vars)),
    extra);
}

export function createInbox(ctx) {
  const list = h('div.inbox-list');
  const reader = h('div.reader');
  const panel = h('div.panel', { style: { paddingBottom: '1rem' } },
    h('div.panel-head', null, h('h1', null, t('inbox.title'))),
    h('div.inbox', { style: { height: 'calc(100% - 3.5rem)' } }, list, reader));
  let selected = null;

  function targetCard(id, current, result, wants) {
    const verdict = liveVerdict(current, result, id);
    const ok = wants ? wants.includes(verdict) : null;
    return h('div.target', null,
      h('img', { src: portraitOf(id), alt: '' }),
      h('div', null,
        h('strong', null, nameOf(id)), ' ', h('span.small.dim', null, registryOf(id)),
        h('div.profile', null, profileText(result.view, id, current.month)),
        h('div.small', null, t('inbox.liveVerdict'), ': ', h(`span.verdict.${verdict}`, null, t(`verdicts.${verdict}`)),
          current.jailed[id] ? h('span.small.red', null, ' · ', t('inbox.inCustody', { month: current.jailed[id] })) : null,
          ok === null ? null : h(`span.small.${ok ? 'cyan' : 'amber'}`, null, ' · ', t(ok ? 'inbox.satisfied' : 'inbox.unsatisfied')))),
      h('div.actions', null,
        h('button.btn.small', { onclick: () => ctx.openDossier(id) }, t('inbox.showInDatabase')),
        current.jailed[id] ? null : h('button.btn.small', {
          onclick: () => ctx.addRule(rule('watch', fieldsUnlockedAt(current.month).map((field) => fieldBlock(field.key, [viewValue(result.view, field.key, id)])))),
        }, t('inbox.draftRule'))));
  }

  function renderReader(item) {
    const current = store.state();
    const result = store.monthResult();
    if (!item) {
      replace(reader, h('p.dim', null, t('inbox.empty')));
      return;
    }
    if (item.kind === 'tip') {
      const text = s(`tips.${item.id}`);
      const chips = Object.entries(item.where).map(([field, values]) => h('span.chip', null, `${fieldLabel(field)}: ${values.map((value) => valueLabel(field, value)).join(' / ')}`));
      replace(reader, memo(text, [
        h('div.tip-profile', null, chips),
        h('button.btn.primary', { onclick: () => ctx.addRule(rule('watch', Object.entries(item.where).map(([field, values]) => fieldBlock(field, values)))) }, t('inbox.draftTip')),
      ]));
      return;
    }
    if (item.kind === 'letter') {
      const template = s('letters')[item.template];
      const district = valueLabel('district', viewValue(result.view, 'district', item.citizen));
      const occupation = valueLabel('occupation', viewValue(result.view, 'occupation', item.citizen));
      replace(reader,
        h('div.letter', null, fill(template, { name: nameOf(item.citizen), month: current.jailed[item.citizen], district, occupation }), '\n\n— ', t('inbox.fromFamily', { name: nameOf(item.citizen) })),
        h('div.targets', null, targetCard(item.citizen, current, result, null)));
      return;
    }
    if (item.kind === 'optional') {
      const text = s(`requests.${item.id}`);
      const wants = item.request.wants;
      replace(reader,
        memo(text, h('div.ask', null, t('inbox.asks'), ': ', wants.map((want) => t(`wants.${want}`)).join(' / '))),
        h('p.small.dim', null, t('inbox.optionalNote')),
        h('div.targets', null, item.targets.map((id) => targetCard(id, current, result, wants))));
      return;
    }
    const sides = s(`requests.${item.id}.sides`);
    const labels = s(`sides.${item.id}`);
    const id = item.targets[0];
    const verdict = liveVerdict(current, result, id);
    const winning = item.request.sides.findIndex((side) => side.wants.includes(verdict));
    replace(reader,
      h('p.small.dim', null, t('inbox.forcedNote')),
      h('div.targets', null, targetCard(id, current, result, null)),
      h('div.forced-status', null, t('inbox.sideWins'), ': ', h('strong', null, labels[winning])),
      h('div.sides', null, sides.map((side, index) =>
        h('div.side' + (index === winning ? '.winning' : ''), null, h('div.side-label', null, labels[index]), memo(side)))));
  }

  function renderList() {
    const current = store.state();
    const items = inboxFor(world, current, current.month);
    const read = store.draft().read;
    if (!selected && items.length) selected = items[0].id;
    replace(list, items.map((item) =>
      h('button.inbox-item' + (item.id === selected ? '.active' : '') + (read.includes(item.id) ? '' : '.unread'), {
        onclick: () => {
          selected = item.id;
          sfx.click();
          markRead(item.id);
          renderList();
        },
      },
        h('span.kind', null, h(`span.flag.${item.kind}`, null, t(`inbox.${item.kind}`)), item.kind === 'tip' ? s(`tips.${item.id}.from`) : item.kind === 'optional' ? s(`requests.${item.id}.from`) : ''),
        h('strong', null, itemTitle(item)))));
    if (!items.length) list.append(h('p.dim', null, t('inbox.empty')));
    renderReader(items.find((item) => item.id === selected));
  }

  function markRead(id) {
    if (!store.draft().read.includes(id)) store.setTransient((data) => data.draft.read.push(id), 'read');
  }

  const element = h('div', { style: { display: 'contents' } }, panel, h('div.panel-foot', null, h('button.btn.primary', { onclick: () => ctx.go('shift') }, t('inbox.toShift'), icon('arrow'))));
  return {
    element,
    mounted() {
      renderList();
      if (selected) markRead(selected);
    },
    refresh(reason) {
      if (reason !== 'read') renderList();
    },
  };
}

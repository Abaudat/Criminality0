import { h, icon } from './dom.js';
import { t, s, formatNumber, fieldLabel, valueLabel } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { criminalsAtLarge, criminalityPercent } from '../core/game.js';
import { slotsFor, watchCapFor, MONTHS } from '../core/campaign.js';
import { FIELDS, CONTACTS_UNLOCK_MONTH } from '../core/fields.js';
import { poiUpdates, newsFor } from '../core/story.js';
import { blotterFor } from '../core/blotter.js';
import { nameOf, portraitOf, humanLineOf, baseValue } from './citizen.js';
import { atLargeNow } from './desk.js';

const CARD_LIMIT = 18;

function spark(values) {
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => `${(index / Math.max(1, values.length - 1)) * 100},${30 - (value / max) * 28}`).join(' ');
  return h('div', { html: `<svg class="spark" viewBox="0 0 100 30" preserveAspectRatio="none"><polyline points="${points}" fill="none" stroke="#8ff5c8" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>` });
}

function changesFor(month) {
  const changes = [];
  for (const field of FIELDS) if (field.unlock === month && month > 1) changes.push(t('briefing.unlockColumn', { field: fieldLabel(field.key) }));
  if (month === CONTACTS_UNLOCK_MONTH) changes.push(t('briefing.unlockColumn', { field: fieldLabel('contacts') }));
  if (month > 1 && slotsFor(month) !== slotsFor(month - 1)) changes.push(t('briefing.slots', { n: slotsFor(month) }));
  if (month === 1 || watchCapFor(month) !== watchCapFor(month - 1)) changes.push(t('briefing.watchCap', { n: watchCapFor(month) }));
  if (month === 5) changes.push(t('briefing.refugees'));
  return changes;
}

function mugshot(ctx, id, kind, index, usedLines) {
  const age = valueLabel('age', baseValue('age', id));
  const occupation = valueLabel('occupation', baseValue('occupation', id));
  const stampClass = kind === 'innocent' ? '.innocent' : kind === 'caught' ? '.caught' : '';
  return h('button.mugshot', { style: { '--tilt': `${((id % 7) - 3) * 0.6}deg` }, onclick: () => ctx.openDossier(id), title: nameOf(id) },
    h('div.photo', null, h('img', { src: portraitOf(id, 'paper'), alt: '', loading: 'lazy' }), h(`div.stamp${stampClass}`, { style: { animationDelay: `${index * 40}ms` }, class: 'slam' }, t(`briefing.${kind}`))),
    h('div.name', null, nameOf(id)),
    h('div.meta', null, `${age} · ${occupation}`),
    h('div.crime' + (kind === 'innocent' ? '.none' : ''), null, kind === 'innocent' ? t('briefing.noCrime') : t(`crimes.${world.population.crime[id]}`)),
    h('div.line', null, humanLineOf(id, usedLines)));
}

function latestFree(role, month) {
  const lines = s(`poi.${role}.free`) ?? {};
  for (let at = month; at >= 1; at--) if (lines[at]) return lines[at];
  return null;
}

export function createBriefing(ctx) {
  const current = store.state();
  const month = current.month;
  const last = current.history.at(-1);
  const atLarge = atLargeNow(current);
  const percent = criminalityPercent(atLarge);
  const roles = world.roles;
  const panel = h('div.panel');

  panel.append(h('div.panel-head', null, h('h1', null, t('briefing.title')), h('span.dim', null, t('briefing.month', { month }))));

  const changes = changesFor(month);
  if (changes.length) panel.append(h('h2.section', null, t('briefing.changes')), h('div.changes', null, changes.map((change) => h('span.change', null, change))));

  const series = [criminalsAtLarge(world, { ...current, jailed: new Uint8Array(world.population.size) }, 1), ...current.history.map((entry) => entry.atLarge)];
  panel.append(
    h('h2.section', null, t('briefing.report')),
    h('div.grid-report', null,
      h('div.stat', null, h('div.label', null, t('briefing.monthsLeft')), h('div.value', null, String(MONTHS - month + 1))),
      h('div.stat' + (percent > 0 ? '.warn' : ''), null, h('div.label', null, t('briefing.criminality')), h('div.value', null, `${percent}%`), h('div.note', null, t('briefing.atLarge', { n: formatNumber(atLarge) })), spark(series)),
      h('div.stat' + (current.unrest >= 60 ? '.alert' : current.unrest >= 30 ? '.warn' : ''), null, h('div.label', null, t('briefing.unrest')), h('div.value', null, formatNumber(Math.round(current.unrest))), h('div.note', null, t('briefing.unrestNote'))),
      h('div.stat', null, h('div.label', null, t('briefing.falsePositive')), h('div.value', null, `${Math.round((last?.falsePositiveRate ?? 0) * 100)}%`), h('div.note', null, t('briefing.falsePositiveNote'))),
      h('div.stat', null, h('div.label', null, t('briefing.savings')), h('div.value', null, formatNumber(current.savings))),
    ),
  );

  if (month === 1) {
    panel.append(h('p.cyan', null, t('briefing.previousBlotter', { n: formatNumber(blotterFor(world, current, 0).length) })));
  }

  if (last) {
    panel.append(h('h2.section', null, t('briefing.ruleStats')));
    if (!last.ruleStats.length) panel.append(h('p.dim', null, t('briefing.noRules')));
    last.ruleStats.forEach((stat, index) => {
      const key = stat.verdict === 'detain' ? 'briefing.ruleLineDetain' : 'briefing.ruleLineWatch';
      const meter = h('div.meter', null, h(stat.verdict === 'detain' ? 'i' : 'i', { style: { width: '100%', background: stat.verdict === 'detain' ? 'var(--red)' : 'var(--amber)', opacity: 0.35 } }), h('b', { style: { width: `${stat.matched ? (stat.guilty / stat.matched) * 100 : 0}%` } }));
      panel.append(h('div.rule-stat', null, h('span', null, t(key, { n: index + 1, matched: formatNumber(stat.matched), guilty: formatNumber(stat.guilty) })), meter));
    });

    const named = new Set(Object.values(roles).flat());
    const priority = (id) => (named.has(id) ? 0 : current.jailedGuilty[id] ? 2 : 1);
    const entries = [
      ...last.caught.map((id) => ({ id, kind: 'caught' })),
      ...last.detained.map((id) => ({ id, kind: current.jailedGuilty[id] ? 'guilty' : 'innocent' })),
    ].sort((a, b) => priority(a.id) - priority(b.id));
    panel.append(h('h2.section', null, t('briefing.cards'), ` · ${formatNumber(entries.length)}`));
    if (!entries.length) panel.append(h('p.dim', null, t('briefing.cardsNone')));
    else panel.append(h('div.cards', null, entries.slice(0, CARD_LIMIT).map((entry, index, list, usedLines = (list.used ??= new Set())) => mugshot(ctx, entry.id, entry.kind, index, usedLines))));
    if (entries.length > CARD_LIMIT) panel.append(h('p.small.dim', null, t('briefing.cardsMore', { n: formatNumber(entries.length - CARD_LIMIT) })));
  }

  const updates = poiUpdates(world, current, month).map((update) => {
    const text = update.key === 'free' ? latestFree(update.role, month) : s(`poi.${update.role}.${update.key}`);
    return text ? { ...update, text } : null;
  }).filter(Boolean);
  if (updates.length) {
    panel.append(h('h2.section', null, t('briefing.poi')), h('div.poi-list', null, updates.map((update) =>
      h('button.poi' + (update.key.startsWith('jailed') ? '.jailed' : ''), { onclick: () => ctx.openDossier(update.id) },
        h('img', { src: portraitOf(update.id, update.key.startsWith('jailed') ? 'paper' : 'terminal'), alt: '' }),
        h('div', null, h('strong', null, nameOf(update.id)), update.jailedMonth ? h('span.small.red', null, ' · ', t('briefing.jailedSince', { month: update.jailedMonth })) : null, h('div.small', null, update.text))))));
  }

  panel.append(h('h2.section', null, t('briefing.news')), h('div.news', null, newsFor(current, month, percent).map((item) => {
    const entry = typeof item.key === 'number' ? s(`news.${item.key}`)[item.index] : s(`news.${item.key}`);
    return h('article', null, h('h3', null, entry[0].replace('{pct}', item.vars?.pct ?? '')), h('p', null, entry[1]));
  })));

  const element = h('div', { style: { display: 'contents' } }, panel, h('div.panel-foot', null, h('button.btn.primary', { onclick: () => ctx.go('inbox') }, t('briefing.toInbox'), icon('arrow'))));
  return { element };
}

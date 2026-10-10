import { h, icon, replace } from './dom.js';
import { t, fieldLabel, valueLabel, formatNumber } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { FIELD_BY_KEY, fieldsUnlockedAt, contactsUnlockedAt } from '../core/fields.js';
import { slotsFor } from '../core/campaign.js';
import { fieldBlock, contactBlock, rule, VERDICTS } from '../core/rules.js';
import { sfx } from '../audio/sound.js';

export function describeBlock(block) {
  if (block.type === 'contacts') {
    return `${block.not ? t('shift.not') + ' ' : ''}${t('shift.hasAtLeast')} ${block.count} ${t('shift.contactsThatAre')} ${t(`shift.${block.kind}`)}`;
  }
  const field = FIELD_BY_KEY[block.field];
  const chosen = field.values.filter((value) => block.values.includes(value));
  const label = (value) => valueLabel(field.key, value);
  let text;
  if (chosen.length === 0) text = `${t('shift.oneOf')} ∅`;
  else if (chosen.length === 1) text = `${t('shift.is')} ${label(chosen[0])}`;
  else if (chosen.length === field.values.length - 1) text = `${t('shift.isNot')} ${label(field.values.find((value) => !chosen.includes(value)))}`;
  else if (field.ordered && chosen.every((value, index) => value === field.values[index])) text = `${t('shift.below')} ${label(field.values[chosen.length])}`;
  else if (field.ordered && chosen.every((value, index) => value === field.values[field.values.length - chosen.length + index])) text = `${t('shift.above')} ${label(field.values[field.values.length - chosen.length - 1])}`;
  else text = `${t('shift.oneOf')} ${chosen.map(label).join(' / ')}`;
  return `${block.not ? t('shift.not') + ' ' : ''}${text}`;
}

function describeRule(entry) {
  if (!entry.blocks.length) return t('shift.everyone');
  return entry.blocks.map((block) => `${block.type === 'contacts' ? '' : fieldLabel(block.field) + ' '}${describeBlock(block)}`).join(` ${t('shift.and')} `);
}

export function createRulesEditor(ctx) {
  const summary = h('div.rules-summary');
  const list = h('div.rules-scroll');
  const element = h('div.rules-pane', null, summary, list);

  const update = (mutate) => {
    if (store.draft().validated) {
      sfx.error();
      return;
    }
    store.edit(mutate);
  };

  function gauge(labelText, value, max, className) {
    const width = max ? Math.min(100, (value / max) * 100) : Math.min(100, value / 10);
    return h(`div.gauge${className ? '.' + className : ''}`, null,
      h('span', null, labelText),
      h('div.track', null, h('i', { style: { width: `${width}%` } })),
      h('b', null, max ? `${formatNumber(value)}/${formatNumber(max)}` : formatNumber(value)));
  }

  function renderSummary() {
    const result = store.monthResult();
    const current = store.state();
    const draft = store.draft();
    const verdict = VERDICTS[result.playerVerdict];
    const validate = h('button.btn.primary', {
      disabled: result.overCap || draft.validated,
      onclick: () => {
        store.edit((data) => (data.validated = true));
        sfx.stamp();
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 300);
      },
    }, icon('lock'), t('shift.validate'));
    replace(summary,
      gauge(t('shift.watchList'), result.watched, result.watchCap, result.overCap ? 'over' : ''),
      gauge(t('shift.detentionList'), result.detained, 0, 'detain'),
      h('div.self-verdict', null, t('shift.yourVerdict'), h(`span.verdict.${verdict}`, null, t(`verdicts.${verdict}`)), h('span.dim', { style: { marginLeft: 'auto' } }, t('shift.slotsLeft', { n: draft.rules.length, total: slotsFor(current.month) }))),
      result.overCap ? h('div.small.red', null, t('shift.overCap')) : null,
      draft.validated
        ? h('div', { style: { display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' } },
          h('span.stamp.slam', { style: { fontSize: '1.4rem', transform: 'rotate(-4deg)' } }, t('shift.lockedStamp')),
          h('button.btn.small', { onclick: () => store.undo() }, t('shift.reopen')),
          h('button.btn.primary', { style: { marginLeft: 'auto' }, onclick: () => ctx.go('home') }, t('shift.toHome'), icon('arrow')))
        : h('div', { style: { display: 'flex', justifyContent: 'flex-end' } }, validate),
    );
  }

  function blockView(ruleIndex, blockIndex, block, locked) {
    const set = (mutator) => update((draft) => mutator(draft.rules[ruleIndex].blocks[blockIndex]));
    const notButton = h('button.chip' + (block.not ? '.on' : ''), { disabled: locked, onclick: () => { sfx.toggle(); set((target) => (target.not = !target.not)); } }, t('shift.not'));
    const removeButton = h('button.btn.ghost.small.icon-only', { disabled: locked, 'aria-label': t('shift.remove'), onclick: () => { sfx.click(); update((draft) => draft.rules[ruleIndex].blocks.splice(blockIndex, 1)); } }, icon('close'));
    if (block.type === 'contacts') {
      return h('div.block' + (block.not ? '.not' : ''), null,
        h('div.block-head', null, fieldLabel('contacts'), h('span.grow'), notButton, removeButton),
        h('div.values', null,
          h('span.small', null, t('shift.hasAtLeast')),
          h('span.stepper', null,
            h('button.btn.small.icon-only', { disabled: locked || block.count <= 1, onclick: () => set((target) => (target.count = Math.max(1, target.count - 1))) }, '−'),
            h('b', null, String(block.count)),
            h('button.btn.small.icon-only', { disabled: locked || block.count >= 20, onclick: () => set((target) => (target.count = Math.min(20, target.count + 1))) }, '+')),
          h('span.small', null, t('shift.contactsThatAre')),
          ['criminal', 'innocent'].map((kind) => h('button.chip' + (block.kind === kind ? '.on' : ''), { disabled: locked, onclick: () => set((target) => (target.kind = kind)) }, t(`shift.${kind}`)))),
        h('div.small.dim', null, t('shift.criminalHint')));
    }
    const field = FIELD_BY_KEY[block.field];
    return h('div.block' + (block.not ? '.not' : ''), null,
      h('div.block-head', null, fieldLabel(field.key), h('span.op', null, describeBlock(block)), h('span.grow'), notButton, removeButton),
      h('div.values', null, field.values.map((value) => h('button.chip' + (block.values.includes(value) ? '.on' : ''), {
        disabled: locked,
        onclick: () => {
          sfx.toggle();
          set((target) => {
            target.values = target.values.includes(value) ? target.values.filter((entry) => entry !== value) : field.values.filter((entry) => entry === value || target.values.includes(entry));
          });
        },
      }, valueLabel(field.key, value)))));
  }

  function ruleCard(index, entry, locked) {
    const result = store.monthResult();
    const current = store.state();
    const previous = current.history.at(-1);
    const last = previous && JSON.stringify(previous.rules[index]) === JSON.stringify(entry) ? previous.ruleStats[index] : null;
    const matched = result.matches[index]?.length ?? 0;
    const matchesPlayer = result.matches[index]?.includes(world.roles.player);
    const usedFields = new Set(entry.blocks.filter((block) => block.type === 'field').map((block) => block.field));
    const hasContacts = entry.blocks.some((block) => block.type === 'contacts');
    const setVerdict = (verdict) => update((draft) => (draft.rules[index].verdict = verdict));
    const addMenu = locked ? null : h('div.add-menu', null,
      h('span.small.dim', { style: { alignSelf: 'center' } }, icon('plus'), t('shift.addCondition')),
      fieldsUnlockedAt(current.month).filter((field) => !usedFields.has(field.key)).map((field) =>
        h('button.chip', { onclick: () => { sfx.click(); update((draft) => draft.rules[index].blocks.push(fieldBlock(field.key, []))); } }, fieldLabel(field.key))),
      contactsUnlockedAt(current.month) && !hasContacts
        ? h('button.chip', { onclick: () => { sfx.click(); update((draft) => draft.rules[index].blocks.push(contactBlock('criminal', 3))); } }, fieldLabel('contacts'))
        : null);
    return h(`article.rule-card.${entry.verdict}`, null,
      h('header', null,
        h('span.rule-name', null, t('shift.rule', { n: index + 1 })),
        ['watch', 'detain'].map((verdict) => h(`button.chip.${verdict}` + (entry.verdict === verdict ? '.on' : ''), { disabled: locked, onclick: () => { sfx.toggle(); setVerdict(verdict); } }, t(`verdicts.${verdict}`))),
        h('span.count', { class: entry.verdict === 'detain' ? 'red' : 'amber' }, matched === 1 ? t('shift.matchesOne') : t('shift.matches', { n: formatNumber(matched) })),
        h('button.btn.ghost.small.icon-only', { disabled: locked, title: t('shift.clearRule'), 'aria-label': t('shift.clearRule'), onclick: () => { sfx.click(); update((draft) => draft.rules.splice(index, 1)); } }, icon('trash'))),
      last ? h('div.last', null, t('shift.lastMonth', { matched: formatNumber(last.matched), guilty: formatNumber(last.guilty) })) : null,
      matchesPlayer ? h('div.last.red', null, '⚠ ', t('shift.youMatch')) : null,
      h('div.blocks', null, entry.blocks.map((block, blockIndex) => blockView(index, blockIndex, block, locked))),
      addMenu,
      h('div.sentence', null, h('b', null, t(`verdicts.${entry.verdict}`)), ' ← ', describeRule(entry)));
  }

  function renderList() {
    const current = store.state();
    const draft = store.draft();
    const locked = draft.validated;
    const cards = draft.rules.map((entry, index) => ruleCard(index, entry, locked));
    for (let index = draft.rules.length; index < slotsFor(current.month); index++) {
      cards.push(h('div.rule-card.empty', null,
        h('button.btn', {
          disabled: locked,
          onclick: () => {
            sfx.click();
            update((data) => data.rules.push(rule('watch', [])));
          },
        }, icon('plus'), t('shift.newRule'))));
    }
    const scrollTop = list.scrollTop;
    replace(list, draft.rules.length ? null : h('p.small.dim', null, t('shift.noRulesYet')), cards);
    list.scrollTop = scrollTop;
  }

  return {
    element,
    refresh() {
      renderSummary();
      renderList();
    },
  };
}

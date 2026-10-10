import { FIELDS, FIELD_BY_KEY } from './fields.js';

export const CLEAR = 0;
export const WATCH = 1;
export const DETAIN = 2;
export const VERDICTS = ['clear', 'watch', 'detain'];
export const VERDICT_CODE = { clear: CLEAR, watch: WATCH, detain: DETAIN };

export function fieldBlock(field, values, not = false) {
  return { type: 'field', field, values: [...values], not };
}

export function contactBlock(kind, count, not = false) {
  return { type: 'contacts', kind, count, not };
}

export function rule(verdict, blocks) {
  return { verdict, blocks };
}

function compileBlock(block) {
  if (block.type === 'contacts') {
    return { contacts: true, criminal: block.kind === 'criminal', count: block.count, not: block.not };
  }
  const field = FIELD_BY_KEY[block.field];
  let mask = 0;
  for (const value of block.values) mask |= 1 << field.values.indexOf(value);
  return { contacts: false, field: block.field, mask, not: block.not };
}

export function compileRules(rules) {
  return rules.map((entry) => ({ verdict: VERDICT_CODE[entry.verdict], blocks: entry.blocks.map(compileBlock) }));
}

export function matchesCompiled(compiled, view, id) {
  for (const block of compiled.blocks) {
    let pass;
    if (block.contacts) {
      const count = block.criminal ? view.criminalContacts[id] : view.innocentContacts[id];
      pass = count >= block.count;
    } else {
      pass = ((1 << view.columns[block.field][id]) & block.mask) !== 0;
    }
    if (pass === block.not) return false;
  }
  return true;
}

export function evaluateRules(rules, view) {
  const compiled = compileRules(rules);
  const size = view.size;
  const verdicts = new Uint8Array(size);
  const matches = compiled.map(() => []);
  for (let id = 0; id < size; id++) {
    if (!view.present[id]) continue;
    let verdict = CLEAR;
    for (let index = 0; index < compiled.length; index++) {
      if (matchesCompiled(compiled[index], view, id)) {
        matches[index].push(id);
        if (compiled[index].verdict > verdict) verdict = compiled[index].verdict;
      }
    }
    verdicts[id] = verdict;
  }
  return { verdicts, matches };
}

export function verdictOf(rules, view, id) {
  let verdict = CLEAR;
  for (const compiled of compileRules(rules)) {
    if (matchesCompiled(compiled, view, id) && compiled.verdict > verdict) verdict = compiled.verdict;
  }
  return verdict;
}

export function ruleFromProfile(profile, verdict, unlockedFields) {
  return rule(
    verdict,
    unlockedFields.map((field) => fieldBlock(field.key, [profile[field.key]])),
  );
}

export function profileOf(view, id) {
  return Object.fromEntries(FIELDS.map((field) => [field.key, field.values[view.columns[field.key][id]]]));
}

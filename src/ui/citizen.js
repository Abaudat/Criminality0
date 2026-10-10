import { world, getSave } from './store.js';
import { portraitUrl } from '../art/portrait.js';
import { FIELDS, FIELD_BY_KEY } from '../core/fields.js';
import { s, valueLabel } from './i18n.js';
import { hashSeed } from '../core/random.js';

const population = world.population;

export function nameOf(id) {
  const profile = getSave().profile;
  if (profile && id === world.roles.player) return `${profile.first} ${profile.last}`;
  if (profile && id === world.roles.sister) return `${population.firstName[id]} ${profile.last}`;
  return `${population.firstName[id]} ${population.lastName[id]}`;
}

export function registryOf(id) {
  return `#${population.registry[id]}`;
}

export function baseValue(fieldKey, id) {
  return FIELD_BY_KEY[fieldKey].values[population.columns[fieldKey][id]];
}

export function viewValue(view, fieldKey, id) {
  return FIELD_BY_KEY[fieldKey].values[view.columns[fieldKey][id]];
}

export function portraitOf(id, tone = 'terminal') {
  return portraitUrl(
    {
      seed: id === world.roles.player ? hashSeed('player', getSave().profile?.first ?? '') : id,
      sex: baseValue('sex', id),
      age: population.columns.age[id],
      medical: baseValue('medical', id),
      occupation: baseValue('occupation', id),
    },
    tone,
  );
}

export function humanLineOf(id, used = null) {
  const age = population.columns.age[id];
  const group = age === 0 ? 'young' : age === 3 ? 'old' : 'adult';
  const own = s(`humanLines.${group}`);
  const pool = [...own, ...s('humanLines.adult').filter((line) => group !== 'adult' && !own.includes(line))];
  const start = hashSeed('line', id) % own.length;
  for (let offset = 0; offset < pool.length; offset++) {
    const line = pool[(start + offset) % pool.length];
    if (!used || !used.has(line)) {
      used?.add(line);
      return line;
    }
  }
  return pool[start];
}

export function profileText(view, id, month) {
  return FIELDS.filter((field) => field.unlock <= month)
    .map((field) => valueLabel(field.key, viewValue(view, field.key, id)))
    .join(' · ');
}

export function roleOf(id) {
  return population.roleOf[id];
}

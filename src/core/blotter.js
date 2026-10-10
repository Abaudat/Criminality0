import { fieldsUnlockedAt } from './fields.js';
import { createRandom, hashSeed } from './random.js';

const OBVIOUS_CHANCE = 0.7;
const HIDDEN_CHANCE = 0.2;
const MIN_REVEALED = 2;
const MAX_REVEALED = 4;

export function revealFields(id, month, unlocked) {
  const random = createRandom(hashSeed('blotter', id, month));
  const revealed = unlocked.filter((field) => random.chance(field.obvious ? OBVIOUS_CHANCE : HIDDEN_CHANCE));
  const hiddenObvious = random.shuffle(unlocked.filter((field) => field.obvious && !revealed.includes(field)));
  while (revealed.length < MIN_REVEALED) revealed.push(hiddenObvious.shift());
  random.shuffle(revealed);
  return revealed.slice(0, MAX_REVEALED).map((field) => field.key);
}

export function blotterFor(world, state, month) {
  const population = world.population;
  const { guiltyFrom, arrival, gang, crime, columns, contactStart, contactList, size, registry } = population;
  const activeMonth = Math.max(month, 1);
  const unlocked = fieldsUnlockedAt(month + 1);
  const reports = [];
  for (let id = 0; id < size; id++) {
    if (!guiltyFrom[id] || guiltyFrom[id] > activeMonth || arrival[id] > activeMonth) continue;
    if (state.jailed[id] && state.jailed[id] <= month) continue;
    const keys = revealFields(id, month, unlocked);
    const fields = {};
    for (const key of keys) fields[key] = unlocked.find((field) => field.key === key).values[columns[key][id]];
    let associate = false;
    if (gang[id]) {
      for (let index = contactStart[id]; index < contactStart[id + 1]; index++) {
        const other = contactList[index];
        if (state.jailed[other] && state.jailed[other] <= month) associate = true;
      }
    }
    reports.push({ order: hashSeed('case', id, month), month, crime: crime[id], fields, associate, suspect: id, registry: registry[id] });
  }
  reports.sort((a, b) => a.order - b.order);
  reports.forEach((report, index) => (report.caseNumber = (month + 1) * 10000 + index));
  return reports;
}

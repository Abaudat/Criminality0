import { requestsFor, TIPS } from './campaign.js';
import { REGION_BY_ID } from './regions.js';
import { jailedCountOfGang } from './game.js';
import { hashSeed } from './random.js';

export const POI_ORDER = ['sister', 'coworker', 'courier', 'shopkeeper', 'son', 'nephew', 'hacker'];
export const POI_INTRO = { sister: 2, coworker: 1, courier: 3, shopkeeper: 4, son: 4, nephew: 6, hacker: 7 };

const isFree = (world, state, role) => state.jailed[world.roles[role]] === 0;

export function scenesFor(world, state, month) {
  const scenes = [];
  const last = state.history.at(-1);
  if (last && last.playerVerdict === 1) scenes.push('craneSelfWatch');
  if (state.unrest >= 40) scenes.push('craneUnrest');
  const free = (role) => isFree(world, state, role);
  const byMonth = {
    1: ['craneIntro'],
    2: free('sister') ? ['sisterCall'] : [],
    3: [free('sister') ? 'craneContacts' : 'craneContactsJailed'],
    4: free('shopkeeper') ? ['shopkeeperTip'] : [],
    5: free('sister') ? ['sisterUndocumented'] : [],
    6: ['craneBudget', ...(free('coworker') ? ['coworkerCoffee'] : [])],
    7: [free('hacker') ? 'mothTakeover' : 'lanternTakeover'],
    8: [...(free('sister') ? ['sisterConfession'] : []), 'craneInsulin'],
    9: ['craneHalcyon'],
    10: free('coworker') ? ['coworkerNote'] : [],
    11: ['craneProtests'],
    12: ['craneFinal'],
  };
  return [...byMonth[month], ...scenes];
}

export function poiUpdates(world, state, month) {
  const updates = [];
  for (const role of POI_ORDER) {
    if (POI_INTRO[role] > month) continue;
    const id = world.roles[role];
    if (state.jailed[id]) {
      updates.push({ role, id, key: state.jailedGuilty[id] ? 'jailedGuilty' : 'jailedInnocent', jailedMonth: state.jailed[id] });
      continue;
    }
    if (role === 'sister' && state.residency !== 'none' && month >= 5) {
      updates.push({ role, id, key: 'residency' });
      continue;
    }
    if (role === 'shopkeeper') {
      const g1Jailed = jailedCountOfGang(world, state, 'g1');
      const coworkerLeaked = state.jailed[world.roles.coworker] === 0 || state.jailed[world.roles.coworker] > 6;
      if (month >= 7 && coworkerLeaked && g1Jailed < 30) {
        updates.push({ role, id, key: 'smashed' });
        continue;
      }
      if (month >= 6 && g1Jailed < 15) {
        updates.push({ role, id, key: 'squeezed' });
        continue;
      }
      if (month >= 5 && g1Jailed >= 15) {
        updates.push({ role, id, key: 'safe' });
        continue;
      }
    }
    updates.push({ role, id, key: 'free', month });
  }
  return updates;
}

export function inboxFor(world, state, month) {
  const items = [];
  for (const tip of TIPS.filter((entry) => entry.month === month)) {
    items.push({ kind: 'tip', id: tip.id, from: tip.from, where: REGION_BY_ID[tip.id].where });
  }
  for (const request of requestsFor(month)) {
    const targets = request.targets.map((role) => world.roles[role]);
    items.push({ kind: request.kind, id: request.id, request, targets });
  }
  if (month >= 6) {
    const wronged = [];
    for (let id = 0; id < world.population.size; id++) {
      if (state.jailed[id] && !state.jailedGuilty[id] && state.jailed[id] < month) wronged.push(id);
    }
    wronged.sort((a, b) => hashSeed('letter', a, month) - hashSeed('letter', b, month));
    wronged.slice(0, 2).forEach((id, index) => items.push({ kind: 'letter', id: `letter-${month}-${id}`, citizen: id, template: (id + month) % 3, order: index }));
  }
  return items;
}

export function newsFor(state, month, atLargePercent) {
  const items = [{ key: month, index: 0 }, { key: month, index: 1 }, { key: month, index: 2 }];
  if (state.unrest >= 60) items.unshift({ key: 'unrestHigh' });
  else if (state.unrest >= 30) items.unshift({ key: 'unrestMid' });
  if (month > 1 && atLargePercent < 8) items.push({ key: 'progress', vars: { pct: atLargePercent } });
  return items;
}

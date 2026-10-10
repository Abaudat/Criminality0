import { FIELDS, FIELD_BY_KEY } from './fields.js';
import { evaluateRules, CLEAR, WATCH, DETAIN, VERDICTS } from './rules.js';
import { slotsFor, watchCapFor, requestsFor, REQUESTS, MONTHS, ZERO_THRESHOLD, UNREST_LIMIT, UNREST_DECAY, OPTIONAL_RANGE } from './campaign.js';
import { START_SAVINGS, normalizeChoices, expensesOf, isIllegal, worthBracket, salaryFor } from './economy.js';
import { generatePopulation } from './population.js';

export function createWorld(population = generatePopulation()) {
  const heldUntil = new Uint8Array(population.size);
  for (const request of REQUESTS) {
    for (const role of request.targets) {
      const id = population.roles[role];
      heldUntil[id] = heldUntil[id] ? Math.min(heldUntil[id], request.month) : request.month;
    }
  }
  return { population, roles: population.roles, heldUntil };
}

export function isHeld(world, id, month) {
  return month < world.heldUntil[id];
}

export function initialState(world) {
  const size = world.population.size;
  return {
    month: 1,
    jailed: new Uint8Array(size),
    jailedGuilty: new Uint8Array(size),
    unrest: 0,
    savings: START_SAVINGS,
    housing: 'oldtown',
    contactCut: false,
    residency: 'none',
    burned: false,
    sponsorLiable: false,
    alignment: { lc: 0, ge: 0, optLc: 0, optGe: 0 },
    requestResults: {},
    history: [],
    outcome: null,
  };
}

export function isGuiltyAt(world, id, month) {
  const from = world.population.guiltyFrom[id];
  return from > 0 && from <= month;
}

export function isSisterFree(world, state) {
  return state.jailed[world.roles.sister] === 0;
}

export function jailedCountOfGang(world, state, gangId) {
  const { gang, size } = world.population;
  let count = 0;
  for (let id = 0; id < size; id++) if (gang[id] === gangId && state.jailed[id]) count++;
  return count;
}

export function overridesFor(world, state, month, choices, playerWorth) {
  const roles = world.roles;
  const overrides = new Map();
  overrides.set(roles.player, {
    district: choices.housing,
    worth: playerWorth,
    record: state.burned || state.sponsorLiable ? 'yes' : 'no',
  });
  if (choices.residency !== 'none') overrides.set(roles.sister, { citizenship: 'citizen' });
  if (month >= 6 && jailedCountOfGang(world, state, 'g1') < 15) overrides.set(roles.shopkeeper, { worth: 'low' });
  return overrides;
}

export function buildView(world, state, month, overrides) {
  const population = world.population;
  const size = population.size;
  const columns = {};
  for (const field of FIELDS) columns[field.key] = population.columns[field.key].slice();
  for (const [id, values] of overrides) {
    for (const key in values) columns[key][id] = FIELD_BY_KEY[key].values.indexOf(values[key]);
  }
  const present = new Uint8Array(size);
  for (let id = 0; id < size; id++) present[id] = population.arrival[id] <= month && !state.jailed[id] ? 1 : 0;
  const criminalContacts = new Uint8Array(size);
  const innocentContacts = new Uint8Array(size);
  const { contactStart, contactList, arrival } = population;
  const player = world.roles.player;
  const sister = world.roles.sister;
  for (let id = 0; id < size; id++) {
    let criminal = 0;
    let innocent = 0;
    for (let index = contactStart[id]; index < contactStart[id + 1]; index++) {
      const other = contactList[index];
      if (state.contactCut && ((id === player && other === sister) || (id === sister && other === player))) continue;
      if (state.jailed[other]) criminal++;
      else if (arrival[other] <= month) innocent++;
    }
    criminalContacts[id] = criminal;
    innocentContacts[id] = innocent;
  }
  return { size, columns, present, criminalContacts, innocentContacts };
}

export function contactsOf(world, state, id) {
  const { contactStart, contactList } = world.population;
  const { player, sister } = world.roles;
  const list = [];
  for (let index = contactStart[id]; index < contactStart[id + 1]; index++) {
    const other = contactList[index];
    if (state.contactCut && ((id === player && other === sister) || (id === sister && other === player))) continue;
    list.push(other);
  }
  return list;
}

export function criminalsAtLarge(world, state, month) {
  const { guiltyFrom, arrival, size } = world.population;
  let count = 0;
  for (let id = 0; id < size; id++) {
    if (guiltyFrom[id] > 0 && guiltyFrom[id] <= month && arrival[id] <= month && !state.jailed[id]) count++;
  }
  return count;
}

function effectiveVerdict(state, verdicts, id) {
  return state.jailed[id] ? DETAIN : verdicts[id];
}

export function computeMonth(world, state, input) {
  const month = state.month;
  const roles = world.roles;
  const player = roles.player;
  const rules = (input.rules ?? []).slice(0, slotsFor(month));
  const sisterFree = isSisterFree(world, state);
  const choices = normalizeChoices(state, input.choices, sisterFree);

  const firstView = buildView(world, state, month, overridesFor(world, state, month, choices, worthBracket(state.savings)));
  const firstPass = evaluateRules(rules, firstView);
  let detainedOthers = 0;
  for (let id = 0; id < firstView.size; id++) if (id !== player && firstPass.verdicts[id] === DETAIN && !isHeld(world, id, month)) detainedOthers++;
  const salary = salaryFor(detainedOthers);
  const expenses = expensesOf(state, choices);
  const savingsAfter = state.savings + salary - expenses.reduce((sum, line) => sum + line.amount, 0);
  const playerWorth = worthBracket(savingsAfter);

  const view = buildView(world, state, month, overridesFor(world, state, month, choices, playerWorth));
  const evaluated = evaluateRules(rules, view);
  const verdicts = evaluated.verdicts;
  for (let id = 0; id < view.size; id++) if (isHeld(world, id, month)) verdicts[id] = CLEAR;
  const matches = evaluated.matches.map((list) => list.filter((id) => !isHeld(world, id, month)));
  let watched = 0;
  let detained = 0;
  for (let id = 0; id < view.size; id++) {
    if (verdicts[id] === WATCH) watched++;
    else if (verdicts[id] === DETAIN) detained++;
  }
  const illegal = isIllegal(choices);
  const playerVerdict = verdicts[player];
  return {
    month,
    rules,
    choices,
    view,
    verdicts,
    matches,
    watched,
    detained,
    watchCap: watchCapFor(month),
    overCap: watched > watchCapFor(month),
    salary,
    expenses,
    savingsAfter,
    playerWorth,
    playerVerdict,
    illegal,
    playerCaught: playerVerdict === DETAIN || (playerVerdict === WATCH && illegal),
  };
}

function resolveRequests(world, state, month, verdicts) {
  const results = {};
  for (const request of requestsFor(month)) {
    const ids = request.targets.map((role) => world.roles[role]);
    const targetVerdicts = ids.map((id) => VERDICTS[effectiveVerdict(state, verdicts, id)]);
    if (request.kind === 'forced') {
      const sideIndex = request.sides.findIndex((side) => side.wants.includes(targetVerdicts[0]));
      results[request.id] = { side: sideIndex, verdicts: targetVerdicts };
    } else {
      results[request.id] = { satisfied: targetVerdicts.every((verdict) => request.wants.includes(verdict)), verdicts: targetVerdicts };
    }
  }
  return results;
}

function applyAlignment(alignment, month, results) {
  const next = { ...alignment };
  for (const request of requestsFor(month)) {
    const result = results[request.id];
    if (request.kind === 'forced') {
      next.lc += request.sides[result.side].lc;
      next.ge += request.sides[result.side].ge;
    } else if (result.satisfied) {
      next.optLc += request.lc;
      next.optGe += request.ge;
    }
  }
  return next;
}

export function alignmentPin(alignment) {
  return {
    lc: alignment.lc + (0.9 * alignment.optLc) / OPTIONAL_RANGE.lc,
    ge: alignment.ge + (0.9 * alignment.optGe) / OPTIONAL_RANGE.ge,
  };
}

export function quadrantOf(alignment) {
  return `${alignment.lc > 0 ? 'lawful' : 'chaotic'}${alignment.ge > 0 ? 'good' : 'evil'}`;
}

export function resolveMonth(world, state, input) {
  const result = computeMonth(world, state, input);
  const { month, rules, choices, verdicts, matches, view } = result;
  if (result.overCap) throw new Error('watch cap exceeded');
  const population = world.population;
  const roles = world.roles;
  const jailed = state.jailed.slice();
  const jailedGuilty = state.jailedGuilty.slice();
  const caught = [];
  const detainedList = [];
  let innocentsDetained = 0;

  for (let id = 0; id < view.size; id++) {
    if (!view.present[id]) continue;
    const guilty = id === roles.player ? result.illegal : isGuiltyAt(world, id, month);
    if (verdicts[id] === DETAIN) {
      jailed[id] = month;
      jailedGuilty[id] = guilty ? 1 : 0;
      detainedList.push(id);
      if (!guilty) innocentsDetained++;
    } else if (verdicts[id] === WATCH && guilty) {
      jailed[id] = month;
      jailedGuilty[id] = 1;
      caught.push(id);
    }
  }

  const ruleStats = rules.map((entry, index) => {
    let guilty = 0;
    for (const id of matches[index]) if (id === roles.player ? result.illegal : isGuiltyAt(world, id, month)) guilty++;
    return { verdict: entry.verdict, matched: matches[index].length, guilty };
  });

  const requestResults = resolveRequests(world, state, month, verdicts);
  const alignment = applyAlignment(state.alignment, month, requestResults);
  const unrest = state.unrest * (1 - UNREST_DECAY) + innocentsDetained;

  const next = {
    ...state,
    jailed,
    jailedGuilty,
    unrest,
    savings: result.savingsAfter,
    housing: choices.housing,
    contactCut: choices.contact === 'cut',
    residency: choices.residency,
    burned: state.burned || requestResults.hacker?.side === 0,
    sponsorLiable: state.sponsorLiable || (choices.residency === 'vouch' && jailed[roles.sister] > 0),
    alignment,
    requestResults: { ...state.requestResults, ...requestResults },
    outcome: null,
  };
  const atLarge = criminalsAtLarge(world, next, month);
  const totalDetained = state.history.reduce((sum, entry) => sum + entry.detained.length, 0) + detainedList.length;
  const totalInnocents = state.history.reduce((sum, entry) => sum + entry.innocentsDetained, 0) + innocentsDetained;

  next.history = [
    ...state.history,
    {
      month,
      rules,
      choices,
      replies: input.replies ?? {},
      caught,
      detained: detainedList,
      innocentsDetained,
      ruleStats,
      watched: result.watched,
      salary: result.salary,
      expenses: result.expenses,
      savingsAfter: result.savingsAfter,
      playerVerdict: result.playerVerdict,
      illegal: result.illegal,
      unrest,
      atLarge,
      falsePositiveRate: totalDetained ? totalInnocents / totalDetained : 0,
      alignment,
    },
  ];

  if (jailed[roles.player]) next.outcome = { kind: 'failure', reason: 'selfFlagged', verdict: VERDICTS[result.playerVerdict], month };
  else if (unrest >= UNREST_LIMIT) next.outcome = { kind: 'failure', reason: 'riots', month };
  else if (month === MONTHS && atLarge >= ZERO_THRESHOLD) next.outcome = { kind: 'failure', reason: 'deadline', month, atLarge };
  else if (month === MONTHS) next.outcome = { kind: 'ending', quadrant: quadrantOf(alignment), month };
  else next.month = month + 1;
  return next;
}

export function replay(world, log) {
  let state = initialState(world);
  for (const input of log) {
    if (state.outcome) break;
    state = resolveMonth(world, state, input);
  }
  return state;
}

export function criminalityPercent(atLarge) {
  return Math.round((atLarge / 10000) * 100);
}

export { CLEAR, WATCH, DETAIN };

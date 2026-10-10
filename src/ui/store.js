import { createWorld, replay, computeMonth } from '../core/game.js';
import { slotsFor } from '../core/campaign.js';

const SAVE_KEY = 'zero-criminality/save/v1';
const UNDO_LIMIT = 200;

export const world = createWorld();

function freshDraft(log) {
  const previous = log.at(-1);
  return {
    rules: previous ? structuredClone(previous.rules) : [],
    choices: {},
    replies: {},
    validated: false,
    phase: 'briefing',
    seenScenes: [],
    read: [],
  };
}

function emptySave() {
  return {
    version: 1,
    profile: null,
    lang: null,
    sound: true,
    log: [],
    draft: freshDraft([]),
    past: [],
    future: [],
    endings: [],
    ui: { workspace: 'database' },
  };
}

function readSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return emptySave();
    return { ...emptySave(), ...JSON.parse(raw) };
  } catch {
    return emptySave();
  }
}

const listeners = new Set();
let save = readSave();
let derivedCache = { logKey: null, state: null };
let monthCache = { key: null, result: null };
let saveTimer = null;

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit(reason) {
  scheduleSave();
  for (const listener of listeners) listener(reason);
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 150);
}

export function flush() {
  clearTimeout(saveTimer);
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    return false;
  }
  return true;
}

export function getSave() {
  return save;
}

export function hasCareer() {
  return Boolean(save.profile);
}

export function state() {
  const logKey = save.log.length + ':' + JSON.stringify(save.log.at(-1) ?? null);
  if (derivedCache.logKey !== logKey) derivedCache = { logKey, state: replay(world, save.log) };
  return derivedCache.state;
}

export function draft() {
  return save.draft;
}

export function monthResult() {
  const current = state();
  if (current.outcome) return null;
  const key = `${save.log.length}|${JSON.stringify(save.draft.rules)}|${JSON.stringify(save.draft.choices)}`;
  if (monthCache.key !== key) monthCache = { key, result: computeMonth(world, current, { rules: save.draft.rules, choices: save.draft.choices }) };
  return monthCache.result;
}

function snapshot() {
  const { rules, choices, validated } = save.draft;
  return JSON.stringify({ rules, choices, validated });
}

export function edit(mutator, reason = 'draft') {
  const before = snapshot();
  mutator(save.draft);
  save.draft.rules = save.draft.rules.slice(0, slotsFor(state().month));
  if (snapshot() !== before) {
    save.past.push(before);
    if (save.past.length > UNDO_LIMIT) save.past.shift();
    save.future = [];
  }
  emit(reason);
}

export function setTransient(mutator, reason = 'ui') {
  mutator(save);
  emit(reason);
}

function restore(serialized) {
  Object.assign(save.draft, JSON.parse(serialized));
  if (!save.draft.validated && save.draft.phase === 'home') save.draft.phase = 'shift';
}

export function canUndo() {
  return save.past.length > 0;
}

export function canRedo() {
  return save.future.length > 0;
}

export function undo() {
  if (!save.past.length) return;
  save.future.push(snapshot());
  restore(save.past.pop());
  emit('undo');
}

export function redo() {
  if (!save.future.length) return;
  save.past.push(snapshot());
  restore(save.future.pop());
  emit('redo');
}

export function newCareer(profile) {
  const keep = { lang: save.lang, sound: save.sound, endings: save.endings };
  save = { ...emptySave(), ...keep, profile };
  emit('new');
}

export function commitMonth() {
  const { rules, choices, replies } = save.draft;
  save.log.push(structuredClone({ rules, choices, replies }));
  save.draft = freshDraft(save.log);
  save.past = [];
  save.future = [];
  const outcome = state().outcome;
  if (outcome?.kind === 'ending' && !save.endings.includes(outcome.quadrant)) save.endings.push(outcome.quadrant);
  emit('commit');
}

export function restartFrom(month) {
  save.log = save.log.slice(0, month - 1);
  save.draft = freshDraft(save.log);
  save.past = [];
  save.future = [];
  emit('restart');
}

export function abandonCareer() {
  save.profile = null;
  save.log = [];
  save.draft = freshDraft([]);
  save.past = [];
  save.future = [];
  emit('abandon');
}

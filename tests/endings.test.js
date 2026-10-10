import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PLANS, RULES, play, world } from './playthroughs.js';
import { rule, fieldBlock as field } from '../src/core/rules.js';

for (const [quadrant, plan] of Object.entries(PLANS)) {
  test(`a careful ${quadrant} career reaches its ending`, () => {
    const state = play(plan);
    assert.equal(state.outcome?.kind, 'ending', JSON.stringify(state.outcome));
    assert.equal(state.outcome.quadrant, quadrant);
    assert.ok(state.history.at(-1).atLarge < 50);
  });
}

test('the lawful good career detains only a handful of innocents', () => {
  const state = play(PLANS.lawfulgood);
  const innocents = state.history.reduce((sum, month) => sum + month.innocentsDetained, 0);
  assert.ok(innocents < 15, `innocents detained: ${innocents}`);
});

test('sparing the sister leaves her and her six look-alikes at large', () => {
  const state = play(PLANS.chaoticgood);
  assert.equal(state.jailed[world.roles.sister], 0);
  for (const id of world.roles.lookalikes) assert.equal(state.jailed[id], 0);
});

test('a blanket detention of Stack 9 poverty starts riots', () => {
  const state = play([[rule('detain', [field('district', ['stack9']), field('worth', ['neg'])]), RULES.embezzlers]]);
  assert.equal(state.outcome?.reason, 'riots');
});

test('doing nothing misses the deadline', () => {
  const state = play(Array.from({ length: 12 }, () => []));
  assert.equal(state.outcome?.reason, 'deadline');
});

test('moving to Stack 9 and eating from the black market under your own watch rule flags you', () => {
  const months = [[RULES.shoplifters, RULES.embezzlers], [RULES.burglars, rule('watch', [field('district', ['stack9']), field('sex', ['m']), field('age', ['30-44']), field('worth', ['low'])])]];
  const state = play(months, { 2: { housing: 'stack9', food: 'blackmarket' } });
  assert.equal(state.outcome?.reason, 'selfFlagged');
});

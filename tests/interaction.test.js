import { test } from 'node:test';
import assert from 'node:assert/strict';
import { world, RULES, play } from './playthroughs.js';
import { initialState, computeMonth, resolveMonth, contactsOf } from '../src/core/game.js';
import { blotterFor } from '../src/core/blotter.js';
import { scenesFor, inboxFor } from '../src/core/story.js';
import { evaluateRules } from '../src/core/rules.js';

test('the first morning: Crane briefs you and the old reports point at Stack 9 shoplifters', () => {
  const state = initialState(world);
  assert.deepEqual(scenesFor(world, state, 1), ['craneIntro']);
  const reports = blotterFor(world, state, 0);
  assert.ok(reports.length > 200 && reports.length < 400);
  assert.ok(reports.filter((report) => report.crime === 'shoplifting').length > reports.filter((report) => report.crime === 'insidertrading').length * 2);
  const shoplifting = reports.filter((report) => report.crime === 'shoplifting' && report.fields.district);
  const stack9 = shoplifting.filter((report) => report.fields.district === 'stack9').length;
  assert.ok(stack9 / shoplifting.length > 0.9);
});

test('a blanket poverty rule is too broad to watch, a refined one fits', () => {
  const state = initialState(world);
  const broad = computeMonth(world, state, { rules: [{ verdict: 'watch', blocks: [{ type: 'field', field: 'district', values: ['stack9'], not: false }, { type: 'field', field: 'worth', values: ['neg'], not: false }] }] });
  assert.ok(broad.overCap);
  const refined = computeMonth(world, state, { rules: [RULES.shoplifters] });
  assert.ok(!refined.overCap);
  assert.equal(refined.watched, 123);
  assert.equal(refined.rules.length, 1);
});

test('next morning the rule stats confirm the hypothesis', () => {
  const state = resolveMonth(world, initialState(world), { rules: [RULES.shoplifters, RULES.embezzlers] });
  assert.deepEqual(state.history[0].ruleStats.map((stat) => stat.guilty), [109]);
  assert.equal(state.history[0].innocentsDetained, 0);
});

test('month 4 brings the shopkeeper, his tip and the conflict over his son', () => {
  const state = play([[RULES.shoplifters, RULES.embezzlers], [RULES.cargoThieves, RULES.burglars], [RULES.creditFraud, RULES.fences]]);
  assert.equal(state.month, 4);
  assert.ok(scenesFor(world, state, 4).includes('shopkeeperTip'));
  const inbox = inboxFor(world, state, 4);
  assert.ok(inbox.some((item) => item.kind === 'tip' && item.id === 'g1tip'));
  assert.ok(inbox.some((item) => item.kind === 'forced' && item.id === 'son'));
  const tipped = evaluateRules([RULES.tidewaterTip], computeMonth(world, state, { rules: [] }).view).matches[0];
  assert.equal(tipped.filter((id) => world.population.gang[id] === 'g1').length, 3);
});

test('ignoring the courier memo sides with the Unlisted', () => {
  const state = play([[RULES.shoplifters, RULES.embezzlers], [RULES.cargoThieves, RULES.burglars], [RULES.creditFraud, RULES.fences]]);
  assert.equal(state.requestResults.courier.side, 1);
});

test('the sister confesses in month 8 and the insulin rule sides with the state', () => {
  const months = [
    [RULES.shoplifters, RULES.embezzlers], [RULES.cargoThieves, RULES.burglars], [RULES.creditFraud, RULES.fences],
    [RULES.rationFraud, RULES.insiders, RULES.tidewaterTip], [RULES.laidOff, RULES.cascade, RULES.rationCut], [RULES.cascade], [RULES.glasshouseTip, RULES.cascade],
  ];
  const before = play(months);
  assert.ok(scenesFor(world, before, 8).includes('sisterConfession'));
  const after = resolveMonth(world, before, { rules: [RULES.cascade, RULES.insulin] });
  assert.equal(after.requestResults.sister.side, 0);
  assert.ok(after.jailed[world.roles.sister] > 0);
});

test('cutting contact removes your sister from your graph', () => {
  const state = play([[RULES.shoplifters], [RULES.cargoThieves], [RULES.creditFraud]], { 3: { contact: 'cut' } });
  assert.ok(!contactsOf(world, state, world.roles.player).includes(world.roles.sister));
});

test('people named in a later request stay out of reach until their month', () => {
  const lev = world.roles.motherson;
  const first = resolveMonth(world, initialState(world), { rules: [RULES.shoplifters] });
  assert.equal(first.jailed[lev], 0);
  const second = resolveMonth(world, first, { rules: [RULES.shoplifters] });
  assert.equal(second.jailed[lev], 2);
  assert.equal(second.requestResults.motherson.satisfied, false);
});

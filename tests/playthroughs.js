import { createWorld, initialState, resolveMonth } from '../src/core/game.js';
import { fieldBlock as field, contactBlock as contacts, rule } from '../src/core/rules.js';

export const world = createWorld();

const shoplifters = rule('watch', [field('district', ['stack9']), field('occupation', ['unemployed']), field('worth', ['neg']), field('record', ['yes'])]);
const embezzlers = rule('watch', [field('district', ['spire']), field('occupation', ['state']), field('worth', ['high'])]);
const cargoThieves = rule('watch', [field('district', ['docks']), field('occupation', ['laborer']), field('sex', ['m']), field('age', ['18-29'])]);
const burglars = rule('watch', [field('district', ['stack4']), field('occupation', ['unemployed']), field('sex', ['m']), field('age', ['18-29', '30-44'])]);
const creditFraud = rule('watch', [field('district', ['midtown']), field('occupation', ['office']), field('worth', ['neg'])]);
const fences = rule('watch', [field('district', ['oldtown']), field('occupation', ['service']), field('age', ['18-29']), field('record', ['yes'])]);
const rationFraud = rule('watch', [field('district', ['stack4', 'docks']), field('occupation', ['unemployed']), field('age', ['65+']), field('worth', ['low'])]);
const insiders = rule('watch', [field('district', ['midtown']), field('occupation', ['executive']), field('age', ['30-44']), field('worth', ['high'])]);
const tidewaterTip = rule('watch', [field('district', ['docks']), field('occupation', ['laborer']), field('sex', ['m']), field('age', ['30-44', '45-64']), field('worth', ['mid']), field('record', ['yes'])]);
const glasshouseTip = rule('watch', [field('district', ['stack9']), field('occupation', ['laborer']), field('age', ['18-29']), field('worth', ['mid']), field('citizenship', ['undocumented'])]);
const cascade = rule('watch', [contacts('criminal', 3)]);
const laidOff = rule('watch', [field('district', ['stack4']), field('occupation', ['laborer']), field('worth', ['neg'])]);
const rationCut = rule('watch', [field('district', ['oldtown']), field('occupation', ['unemployed']), field('citizenship', ['refugee'])]);
const insulin = rule('watch', [field('district', ['stack9']), field('occupation', ['service']), field('medical', ['diabetes'])]);
const insulinMen = rule('watch', [field('district', ['stack9']), field('occupation', ['service']), field('medical', ['diabetes']), field('sex', ['m'])]);
const insulinOlderWomen = rule('watch', [field('district', ['stack9']), field('occupation', ['service']), field('medical', ['diabetes']), field('sex', ['f']), field('age', ['18-29'], true)]);

const courier = rule('detain', [field('district', ['stack4']), field('occupation', ['service']), field('sex', ['m']), field('age', ['30-44']), field('worth', ['low']), field('record', ['yes'])]);
const nephew = rule('watch', [field('district', ['spire']), field('occupation', ['executive']), field('age', ['18-29']), field('worth', ['high'])]);
const hacker = rule('watch', [field('district', ['oldtown']), field('occupation', ['unemployed']), field('sex', ['f']), field('age', ['18-29']), field('record', ['yes'])]);
const coworker = rule('watch', [field('district', ['midtown']), field('occupation', ['state']), field('sex', ['f']), field('age', ['30-44']), field('worth', ['mid'])]);
const cargoDetain = { ...cargoThieves, verdict: 'detain' };

export const RULES = { shoplifters, embezzlers, cargoThieves, burglars, creditFraud, fences, rationFraud, insiders, tidewaterTip, glasshouseTip, cascade, laidOff, rationCut, insulin, insulinMen, insulinOlderWomen, courier, nephew, hacker, coworker, cargoDetain };

function baseSchedule({ lawfulCourier, sonDetained, flagNephew, flagHacker, spareSister, flagCoworker }) {
  return [
    [shoplifters],
    [embezzlers, cargoThieves],
    lawfulCourier ? [burglars, courier] : [burglars, creditFraud],
    [lawfulCourier ? creditFraud : fences, sonDetained ? cargoDetain : insiders, tidewaterTip],
    [laidOff, rationFraud, rationCut],
    [lawfulCourier ? fences : cascade, flagNephew ? nephew : cascade, cascade],
    [glasshouseTip, cascade, flagHacker ? hacker : cascade],
    spareSister ? [cascade, insulinMen, insulinOlderWomen, shoplifters] : [cascade, insulin, shoplifters],
    [cascade, insiders],
    [cascade, flagCoworker ? coworker : cascade],
    [cascade],
    [cascade],
  ];
}

export const PLANS = {
  lawfulgood: baseSchedule({ lawfulCourier: true, sonDetained: false, flagNephew: true, flagHacker: true, spareSister: true, flagCoworker: true }),
  lawfulevil: baseSchedule({ lawfulCourier: true, sonDetained: true, flagNephew: false, flagHacker: true, spareSister: false, flagCoworker: true }),
  chaoticgood: baseSchedule({ lawfulCourier: false, sonDetained: false, flagNephew: true, flagHacker: false, spareSister: true, flagCoworker: false }),
  chaoticevil: baseSchedule({ lawfulCourier: false, sonDetained: true, flagNephew: false, flagHacker: false, spareSister: false, flagCoworker: false }),
};

export function play(months, choicesByMonth = {}) {
  let state = initialState(world);
  for (let index = 0; index < months.length && !state.outcome; index++) {
    state = resolveMonth(world, state, { rules: months[index], choices: choicesByMonth[index + 1] ?? {} });
  }
  return state;
}

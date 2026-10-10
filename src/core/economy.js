export const START_SAVINGS = 2500;
export const BASE_SALARY = 2000;
export const DETAIN_BONUS = 15;
export const MOVE_FEE = 300;

export const CHOICES = [
  { key: 'housing', options: ['oldtown', 'stack9'], persistent: true, from: 1, cost: { oldtown: 1200, stack9: 500 } },
  { key: 'food', options: ['canteen', 'blackmarket'], from: 1, cost: { canteen: 600, blackmarket: 250 }, illegal: ['blackmarket'] },
  { key: 'support', options: ['none', 'money'], from: 2, cost: { none: 0, money: 400 }, needsSister: true },
  { key: 'contact', options: ['keep', 'cut'], persistent: true, from: 3, cost: { keep: 0, cut: 0 } },
  { key: 'residency', options: ['none', 'pay', 'vouch'], persistent: true, once: true, from: 5, cost: { none: 0, pay: 3000, vouch: 0 }, needsSister: true },
  { key: 'insulin', options: ['none', 'buy'], from: 8, cost: { none: 0, buy: 300 }, illegal: ['buy'], needsSister: true },
];

export const CHOICE_BY_KEY = Object.fromEntries(CHOICES.map((choice) => [choice.key, choice]));

export function defaultChoices(state) {
  return {
    housing: state.housing,
    food: 'canteen',
    support: 'none',
    contact: state.contactCut ? 'cut' : 'keep',
    residency: state.residency,
    insulin: 'none',
  };
}

export function choiceAvailable(choice, state, sisterFree) {
  if (state.month < choice.from) return false;
  if (choice.needsSister && !sisterFree) return false;
  if (choice.once && state.residency !== 'none') return false;
  return true;
}

export function normalizeChoices(state, choices, sisterFree) {
  const normalized = defaultChoices(state);
  for (const choice of CHOICES) {
    const wanted = choices?.[choice.key];
    if (wanted && choice.options.includes(wanted) && choiceAvailable(choice, state, sisterFree)) normalized[choice.key] = wanted;
  }
  return normalized;
}

export function expensesOf(state, choices) {
  const lines = [];
  for (const choice of CHOICES) {
    const amount = choice.cost[choices[choice.key]] ?? 0;
    if (amount && !(choice.once && state.residency !== 'none')) lines.push({ key: `${choice.key}.${choices[choice.key]}`, amount });
  }
  if (choices.housing !== state.housing) lines.push({ key: 'housing.move', amount: MOVE_FEE });
  return lines;
}

export function isIllegal(choices) {
  return CHOICES.some((choice) => choice.illegal?.includes(choices[choice.key]));
}

export function worthBracket(savings) {
  if (savings < 0) return 'neg';
  if (savings < 10000) return 'low';
  if (savings < 100000) return 'mid';
  return 'high';
}

export function salaryFor(detained) {
  return BASE_SALARY + DETAIN_BONUS * detained;
}

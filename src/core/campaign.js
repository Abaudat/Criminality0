export const MONTHS = 12;
export const SLOTS = [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4];
export const POPULATION_DENOMINATOR = 10000;
export const ZERO_THRESHOLD = 50;
export const UNREST_LIMIT = 100;
export const UNREST_DECAY = 0.3;

export function slotsFor(month) {
  return SLOTS[month - 1];
}

export function watchCapFor(month) {
  if (month >= 9) return 350;
  if (month >= 6) return 250;
  return 300;
}

export const TIPS = [
  { id: 'g1tip', gang: 'g1', month: 4, from: 'shopkeeper' },
  { id: 'g2tip', gang: 'g2', month: 7, from: 'hacker' },
];

export const REQUESTS = [
  { id: 'unionists', month: 2, kind: 'optional', from: 'labourdesk', targets: ['organizer1', 'organizer2', 'organizer3'], wants: ['detain'], lc: 1, ge: -1 },
  { id: 'motherson', month: 2, kind: 'optional', from: 'mother', targets: ['motherson'], wants: ['clear'], lc: -1, ge: 1 },
  { id: 'cell', month: 3, kind: 'optional', from: 'hackercell', targets: ['cellmember1', 'cellmember2', 'cellmember3', 'cellmember4'], wants: ['clear'], lc: -2, ge: 0 },
  {
    id: 'courier', month: 3, kind: 'forced', targets: ['courier'],
    sides: [{ from: 'state', wants: ['detain'], lc: 1, ge: 0 }, { from: 'resistance', wants: ['clear', 'watch'], lc: -1, ge: 0 }],
  },
  {
    id: 'son', month: 4, kind: 'forced', targets: ['son'],
    sides: [{ from: 'shopkeeper', wants: ['clear', 'watch'], lc: 0, ge: 1 }, { from: 'tidewater', wants: ['detain'], lc: 0, ge: -1 }],
  },
  { id: 'pressrefugees', month: 5, kind: 'optional', from: 'pressoffice', targets: ['newsrefugee1', 'newsrefugee2', 'newsrefugee3', 'newsrefugee4', 'newsrefugee5'], wants: ['detain'], lc: 1, ge: -2 },
  {
    id: 'nephew', month: 6, kind: 'forced', targets: ['nephew'],
    sides: [{ from: 'commissioner', wants: ['clear'], lc: 0, ge: -1 }, { from: 'victimfamily', wants: ['watch', 'detain'], lc: 0, ge: 1 }],
  },
  {
    id: 'hacker', month: 7, kind: 'forced', targets: ['hacker'],
    sides: [{ from: 'state', wants: ['watch', 'detain'], lc: 2, ge: 0 }, { from: 'hackercell', wants: ['clear'], lc: -2, ge: 0 }],
  },
  {
    id: 'sister', month: 8, kind: 'forced', targets: ['sister'],
    sides: [{ from: 'state', wants: ['watch', 'detain'], lc: 1, ge: -1 }, { from: 'sister', wants: ['clear'], lc: -1, ge: 1 }],
  },
  { id: 'executives', month: 9, kind: 'optional', from: 'halcyon', targets: ['exec1', 'exec2', 'exec3', 'exec4', 'exec5', 'exec6'], wants: ['clear'], lc: 1, ge: -1 },
  {
    id: 'coworker', month: 10, kind: 'forced', targets: ['coworker'],
    sides: [{ from: 'state', wants: ['watch', 'detain'], lc: 1, ge: 0 }, { from: 'coworker', wants: ['clear'], lc: -1, ge: 0 }],
  },
  { id: 'protestclear', month: 11, kind: 'optional', from: 'resistance', targets: ['protest1', 'protest2', 'protest3'], wants: ['clear'], lc: -1, ge: 1 },
  { id: 'protestdetain', month: 11, kind: 'optional', from: 'state', targets: ['protest1', 'protest2', 'protest3'], wants: ['detain'], lc: 1, ge: -1 },
];

export const OPTIONAL_RANGE = {
  lc: REQUESTS.filter((request) => request.kind === 'optional').reduce((sum, request) => sum + Math.abs(request.lc), 0),
  ge: REQUESTS.filter((request) => request.kind === 'optional').reduce((sum, request) => sum + Math.abs(request.ge), 0),
};

export const FORCED_RANGE = {
  lc: REQUESTS.filter((request) => request.kind === 'forced').reduce((sum, request) => sum + Math.abs(request.sides[0].lc), 0),
  ge: REQUESTS.filter((request) => request.kind === 'forced').reduce((sum, request) => sum + Math.abs(request.sides[0].ge), 0),
};

export function requestsFor(month) {
  return REQUESTS.filter((request) => request.month === month);
}

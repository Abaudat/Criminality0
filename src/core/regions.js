export const CORE = 'core';
export const EVENT = 'event';
export const TAIL = 'tail';
export const TIP = 'tip';

export const REGIONS = [
  { id: 'c1', kind: CORE, crime: 'shoplifting', active: 1, guilty: 110, innocent: 14, where: { district: ['stack9'], occupation: ['unemployed'], worth: ['neg'], record: ['yes'] } },
  { id: 'c2', kind: CORE, crime: 'embezzlement', active: 1, guilty: 70, innocent: 20, where: { district: ['spire'], occupation: ['state'], worth: ['high'] } },
  { id: 'c3', kind: CORE, crime: 'cargotheft', active: 1, guilty: 95, innocent: 22, where: { district: ['docks'], occupation: ['laborer'], sex: ['m'], age: ['18-29'] } },
  { id: 'c4', kind: CORE, crime: 'burglary', active: 1, guilty: 85, innocent: 10, where: { district: ['stack4'], occupation: ['unemployed'], sex: ['m'], age: ['18-29', '30-44'] } },
  { id: 'c5', kind: CORE, crime: 'creditfraud', active: 1, guilty: 100, innocent: 25, where: { district: ['midtown'], occupation: ['office'], worth: ['neg'] } },
  { id: 'c6', kind: CORE, crime: 'fencing', active: 1, guilty: 75, innocent: 12, where: { district: ['oldtown'], occupation: ['service'], age: ['18-29'], record: ['yes'] } },
  { id: 'c7', kind: CORE, crime: 'rationfraud', active: 1, guilty: 80, innocent: 18, where: { district: ['stack4', 'docks'], occupation: ['unemployed'], age: ['65+'], worth: ['low'] } },
  { id: 'c8', kind: CORE, crime: 'insidertrading', active: 1, guilty: 105, innocent: 12, where: { district: ['midtown'], occupation: ['executive'], age: ['30-44'], worth: ['high'] } },

  { id: 'e1', kind: EVENT, crime: 'equipmenttheft', active: 4, guilty: 60, innocent: 10, where: { district: ['stack4'], occupation: ['laborer'], worth: ['neg'] } },
  { id: 'e2', kind: EVENT, crime: 'foodtheft', active: 5, guilty: 80, innocent: 14, refugees: true, where: { district: ['oldtown'], occupation: ['unemployed'], citizenship: ['refugee'] } },
  { id: 'e3', kind: EVENT, crime: 'pharmacytheft', active: 8, guilty: 60, innocent: 10, where: { district: ['stack9'], occupation: ['service'], medical: ['diabetes'] }, exclude: { sex: ['f'], age: ['18-29'] } },

  { id: 't1', kind: TAIL, crime: 'artforgery', active: 1, guilty: 3, innocent: 1, where: { district: ['spire'], occupation: ['unemployed'], sex: ['f'], age: ['65+'], worth: ['high'] } },
  { id: 't2', kind: TAIL, crime: 'passforgery', active: 1, guilty: 3, innocent: 1, where: { district: ['midtown'], occupation: ['laborer'], sex: ['f'], age: ['45-64'], worth: ['neg'] } },
  { id: 't3', kind: TAIL, crime: 'gambling', active: 1, guilty: 3, innocent: 1, where: { district: ['docks'], occupation: ['service'], sex: ['m'], age: ['45-64'], worth: ['high'] } },
  { id: 't4', kind: TAIL, crime: 'dronetheft', active: 1, guilty: 3, innocent: 1, where: { district: ['oldtown'], occupation: ['office'], sex: ['f'], age: ['18-29'], worth: ['neg'], record: ['yes'] } },
  { id: 't5', kind: TAIL, crime: 'identitytheft', active: 1, guilty: 3, innocent: 1, where: { district: ['stack9'], occupation: ['office'], sex: ['m'], age: ['30-44'], worth: ['mid'] } },
  { id: 't6', kind: TAIL, crime: 'shoplifting', active: 1, guilty: 3, innocent: 1, where: { district: ['spire'], occupation: ['service'], age: ['18-29'], worth: ['neg'], record: ['yes'] } },
  { id: 't7', kind: TAIL, crime: 'augmentclinic', active: 1, guilty: 3, innocent: 1, where: { district: ['stack4'], occupation: ['executive'], sex: ['m'], age: ['45-64'] } },
  { id: 't8', kind: TAIL, crime: 'burglary', active: 1, guilty: 3, innocent: 1, where: { district: ['midtown'], occupation: ['unemployed'], sex: ['m'], age: ['65+'], worth: ['mid'], record: ['yes'] } },
  { id: 't9', kind: TAIL, crime: 'filterscam', active: 1, guilty: 3, innocent: 1, where: { district: ['docks'], occupation: ['office'], sex: ['f'], age: ['65+'] } },
  { id: 't10', kind: TAIL, crime: 'bribery', active: 1, guilty: 3, innocent: 1, where: { district: ['oldtown'], occupation: ['state'], age: ['45-64'], worth: ['high'] } },

  { id: 'g1tip', kind: TIP, gang: 'g1', active: 1, guilty: 3, innocent: 3, where: { district: ['docks'], occupation: ['laborer'], sex: ['m'], age: ['30-44', '45-64'], worth: ['mid'], record: ['yes'] } },
  { id: 'g2tip', kind: TIP, gang: 'g2', active: 1, guilty: 3, innocent: 2, where: { district: ['stack9'], occupation: ['laborer'], age: ['18-29'], worth: ['mid'], citizenship: ['undocumented'] } },
];

export const GANGS = [
  { id: 'g1', crime: 'extortion', size: 30, tipMonth: 4, districts: { docks: 6, oldtown: 3, stack4: 2, midtown: 1 } },
  { id: 'g2', crime: 'smuggling', size: 30, tipMonth: 7, districts: { stack9: 5, midtown: 3, spire: 1, docks: 2 } },
];

export const REGION_BY_ID = Object.fromEntries(REGIONS.map((region) => [region.id, region]));

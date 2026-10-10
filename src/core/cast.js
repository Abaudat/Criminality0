const PLAYER_FIELDS = { sex: 'm', age: '30-44', district: 'oldtown', occupation: 'state', worth: 'low', record: 'no', citizenship: 'citizen', medical: 'none' };
const SISTER_FIELDS = { sex: 'f', age: '18-29', district: 'stack9', occupation: 'service', worth: 'neg', record: 'yes', citizenship: 'undocumented', medical: 'diabetes' };

export const CAST = [
  { role: 'player', first: 'Teodor', last: 'Vale', fields: PLAYER_FIELDS, guiltyFrom: 0 },
  { role: 'sister', first: 'Mira', last: 'Vale', fields: SISTER_FIELDS, guiltyFrom: 8, region: 'e3', crime: 'pharmacytheft' },
  { role: 'shopkeeper', first: 'Haruto', last: 'Ibe', fields: { sex: 'm', age: '45-64', district: 'oldtown', occupation: 'service', worth: 'mid', record: 'no', citizenship: 'citizen', medical: 'heart' }, guiltyFrom: 0 },
  { role: 'son', first: 'Ren', last: 'Ibe', fields: { sex: 'm', age: '18-29', district: 'docks', occupation: 'laborer', worth: 'low', record: 'no', citizenship: 'citizen', medical: 'asthma' }, guiltyFrom: 0, region: 'c3' },
  { role: 'coworker', first: 'Saskia', last: 'Oyelaran', fields: { sex: 'f', age: '30-44', district: 'midtown', occupation: 'state', worth: 'mid', record: 'no', citizenship: 'citizen', medical: 'depression' }, guiltyFrom: 6, crime: 'dataleak' },
  { role: 'nephew', first: 'Julian', last: 'Castell', fields: { sex: 'm', age: '18-29', district: 'spire', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'opioid' }, guiltyFrom: 1, crime: 'narcotics' },
  { role: 'hacker', first: 'Inès', last: 'Varga', fields: { sex: 'f', age: '18-29', district: 'oldtown', occupation: 'unemployed', worth: 'neg', record: 'yes', citizenship: 'undocumented', medical: 'implant' }, guiltyFrom: 1, crime: 'intrusion' },
  { role: 'courier', first: 'Marek', last: 'Duarte', fields: { sex: 'm', age: '30-44', district: 'stack4', occupation: 'service', worth: 'low', record: 'yes', citizenship: 'citizen', medical: 'ptsd' }, guiltyFrom: 1, crime: 'smuggling' },

  { role: 'cellmember1', first: 'Oskar', last: 'Lindqvist', fields: { sex: 'm', age: '18-29', district: 'midtown', occupation: 'office', worth: 'low', record: 'no', citizenship: 'citizen', medical: 'none' }, guiltyFrom: 1, crime: 'intrusion' },
  { role: 'cellmember2', first: 'Amara', last: 'Nwosu', fields: { sex: 'f', age: '18-29', district: 'oldtown', occupation: 'service', worth: 'low', record: 'no', citizenship: 'citizen', medical: 'asthma' }, guiltyFrom: 1, crime: 'intrusion' },
  { role: 'cellmember3', first: 'Kenji', last: 'Morales', fields: { sex: 'm', age: '30-44', district: 'stack9', occupation: 'laborer', worth: 'neg', record: 'no', citizenship: 'undocumented', medical: 'none' }, guiltyFrom: 1, crime: 'intrusion' },
  { role: 'cellmember4', first: 'Yusra', last: 'Haddad', fields: { sex: 'f', age: '18-29', district: 'midtown', occupation: 'unemployed', worth: 'neg', record: 'no', citizenship: 'citizen', medical: 'depression' }, guiltyFrom: 1, crime: 'intrusion' },

  { role: 'mother', first: 'Nadia', last: 'Petrosyan', fields: { sex: 'f', age: '45-64', district: 'stack9', occupation: 'service', worth: 'neg', record: 'no', citizenship: 'citizen', medical: 'chronicpain' }, guiltyFrom: 0 },
  { role: 'motherson', first: 'Lev', last: 'Petrosyan', fields: { sex: 'm', age: '18-29', district: 'stack9', occupation: 'unemployed', worth: 'neg', record: 'yes', citizenship: 'citizen', medical: 'none' }, guiltyFrom: 1, region: 'c1', crime: 'shoplifting' },

  { role: 'organizer1', first: 'Bram', last: 'Okoye', fields: { sex: 'm', age: '18-29', district: 'docks', occupation: 'laborer', worth: 'low', record: 'no', citizenship: 'citizen', medical: 'none' }, guiltyFrom: 0, region: 'c3' },
  { role: 'organizer2', first: 'Tavita', last: 'Fonoti', fields: { sex: 'm', age: '18-29', district: 'docks', occupation: 'laborer', worth: 'neg', record: 'no', citizenship: 'citizen', medical: 'chronicpain' }, guiltyFrom: 0, region: 'c3' },
  { role: 'organizer3', first: 'Grete', last: 'Halvorsen', fields: { sex: 'f', age: '30-44', district: 'docks', occupation: 'laborer', worth: 'low', record: 'no', citizenship: 'citizen', medical: 'prosthetic' }, guiltyFrom: 0 },

  { role: 'newsrefugee1', first: 'Samir', last: 'Aziz', fields: { sex: 'm', age: '30-44', district: 'oldtown', occupation: 'unemployed', worth: 'neg', record: 'no', citizenship: 'refugee', medical: 'ptsd' }, guiltyFrom: 0, region: 'e2', refugee: true },
  { role: 'newsrefugee2', first: 'Leilani', last: 'Kahale', fields: { sex: 'f', age: '18-29', district: 'oldtown', occupation: 'unemployed', worth: 'neg', record: 'no', citizenship: 'refugee', medical: 'pregnancy' }, guiltyFrom: 0, region: 'e2', refugee: true },
  { role: 'newsrefugee3', first: 'Tomás', last: 'Ferreira', fields: { sex: 'm', age: '65+', district: 'oldtown', occupation: 'unemployed', worth: 'low', record: 'no', citizenship: 'refugee', medical: 'heart' }, guiltyFrom: 0, region: 'e2', refugee: true },
  { role: 'newsrefugee4', first: 'Ayesha', last: 'Rahman', fields: { sex: 'f', age: '45-64', district: 'oldtown', occupation: 'unemployed', worth: 'neg', record: 'no', citizenship: 'refugee', medical: 'none' }, guiltyFrom: 0, region: 'e2', refugee: true },
  { role: 'newsrefugee5', first: 'Joseph', last: 'Mensah', fields: { sex: 'm', age: '18-29', district: 'oldtown', occupation: 'unemployed', worth: 'neg', record: 'no', citizenship: 'refugee', medical: 'asthma' }, guiltyFrom: 0, region: 'e2', refugee: true },

  { role: 'exec1', first: 'Corinne', last: 'Aldana', fields: { sex: 'f', age: '30-44', district: 'midtown', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'none' }, guiltyFrom: 1, region: 'c8', crime: 'insidertrading' },
  { role: 'exec2', first: 'Viktor', last: 'Sato', fields: { sex: 'm', age: '30-44', district: 'midtown', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'heart' }, guiltyFrom: 1, region: 'c8', crime: 'insidertrading' },
  { role: 'exec3', first: 'Priya', last: 'Lindgren', fields: { sex: 'f', age: '30-44', district: 'midtown', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'depression' }, guiltyFrom: 0, region: 'c8' },
  { role: 'exec4', first: 'Edmund', last: 'Achebe', fields: { sex: 'm', age: '45-64', district: 'spire', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'none' }, guiltyFrom: 0 },
  { role: 'exec5', first: 'Hana', last: 'Kowalczyk', fields: { sex: 'f', age: '45-64', district: 'spire', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'cancer' }, guiltyFrom: 0 },
  { role: 'exec6', first: 'Ruben', last: 'Takahashi', fields: { sex: 'm', age: '65+', district: 'spire', occupation: 'executive', worth: 'high', record: 'no', citizenship: 'corporate', medical: 'dementia' }, guiltyFrom: 0 },

  { role: 'protest1', first: 'Elif', last: 'Demir', fields: { sex: 'f', age: '30-44', district: 'midtown', occupation: 'office', worth: 'neg', record: 'no', citizenship: 'citizen', medical: 'none' }, guiltyFrom: 0, region: 'c5' },
  { role: 'protest2', first: 'Kwame', last: 'Asante', fields: { sex: 'm', age: '45-64', district: 'midtown', occupation: 'office', worth: 'neg', record: 'yes', citizenship: 'citizen', medical: 'smoglung' }, guiltyFrom: 0, region: 'c5' },
  { role: 'protest3', first: 'Wen', last: 'Zhao', fields: { sex: 'f', age: '18-29', district: 'midtown', occupation: 'office', worth: 'neg', record: 'no', citizenship: 'undocumented', medical: 'epilepsy' }, guiltyFrom: 0, region: 'c5' },
];

export const LOOKALIKES = 6;
export const PLAYER_FRIENDS = 2;
export const SISTER_FRIENDS = 4;

export const CAST_BY_ROLE = Object.fromEntries(CAST.map((member) => [member.role, member]));

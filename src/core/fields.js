export const FIELDS = [
  { key: 'sex', values: ['m', 'f'], unlock: 1, ordered: false, obvious: true },
  { key: 'age', values: ['18-29', '30-44', '45-64', '65+'], unlock: 1, ordered: true, obvious: true },
  { key: 'district', values: ['spire', 'midtown', 'docks', 'oldtown', 'stack4', 'stack9'], unlock: 1, ordered: false, obvious: true },
  { key: 'occupation', values: ['unemployed', 'laborer', 'service', 'office', 'state', 'executive'], unlock: 1, ordered: false, obvious: false },
  { key: 'worth', values: ['neg', 'low', 'mid', 'high'], unlock: 1, ordered: true, obvious: true },
  { key: 'record', values: ['no', 'yes'], unlock: 1, ordered: false, obvious: false },
  { key: 'citizenship', values: ['citizen', 'corporate', 'refugee', 'undocumented'], unlock: 5, ordered: false, obvious: false },
  {
    key: 'medical',
    values: ['none', 'diabetes', 'chronicpain', 'depression', 'schizophrenia', 'ptsd', 'opioid', 'asthma', 'smoglung', 'heart', 'kidney', 'cancer', 'hiv', 'epilepsy', 'dementia', 'prosthetic', 'implant', 'pregnancy'],
    unlock: 8,
    ordered: false,
    obvious: false,
  },
];

export const CONTACTS_UNLOCK_MONTH = 3;

export const FIELD_INDEX = Object.fromEntries(FIELDS.map((field, index) => [field.key, index]));

export const FIELD_BY_KEY = Object.fromEntries(FIELDS.map((field) => [field.key, field]));

export function valueIndex(fieldKey, value) {
  return FIELD_BY_KEY[fieldKey].values.indexOf(value);
}

export function fullMask(fieldKey) {
  return (1 << FIELD_BY_KEY[fieldKey].values.length) - 1;
}

export function maskOf(fieldKey, values) {
  return values.reduce((mask, value) => mask | (1 << valueIndex(fieldKey, value)), 0);
}

export function fieldsUnlockedAt(month) {
  return FIELDS.filter((field) => field.unlock <= month);
}

export function contactsUnlockedAt(month) {
  return month >= CONTACTS_UNLOCK_MONTH;
}

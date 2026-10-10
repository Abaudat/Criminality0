import { FIELDS, FIELD_BY_KEY } from './fields.js';
import { REGIONS, GANGS } from './regions.js';
import { CAST, LOOKALIKES, PLAYER_FRIENDS, SISTER_FRIENDS } from './cast.js';
import { createRandom } from './random.js';
import { FIRST_NAMES, LAST_NAMES } from './names.js';

export const SEED = 20461;
export const BASE_POPULATION = 10000;
export const REFUGEE_POPULATION = 1000;
export const REFUGEE_ARRIVAL = 5;
export const UNLUCKY_INNOCENTS_PER_GANG = 20;

const DISTRICT_WEIGHTS = { spire: 7, midtown: 22, docks: 15, oldtown: 18, stack4: 17, stack9: 21 };
const REFUGEE_DISTRICT_WEIGHTS = { spire: 0, midtown: 4, docks: 22, oldtown: 46, stack4: 12, stack9: 16 };
const AGE_WEIGHTS = { spire: [18, 30, 32, 20], midtown: [30, 33, 25, 12], docks: [32, 32, 25, 11], oldtown: [26, 28, 28, 18], stack4: [30, 30, 26, 14], stack9: [34, 30, 24, 12] };
const OCCUPATION_WEIGHTS = {
  spire: [5, 2, 20, 25, 25, 23],
  midtown: [8, 6, 26, 38, 17, 5],
  docks: [15, 50, 20, 8, 5, 2],
  oldtown: [15, 12, 40, 15, 15, 3],
  stack4: [24, 48, 16, 6, 5, 1],
  stack9: [32, 22, 32, 8, 5, 1],
};
const WORTH_WEIGHTS = { spire: [3, 12, 40, 45], midtown: [15, 40, 38, 7], docks: [30, 50, 18, 2], oldtown: [25, 45, 27, 3], stack4: [38, 47, 14, 1], stack9: [45, 43, 11, 1] };
const WORTH_BY_OCCUPATION = [[2, 1, 0.4, 0.2], [1.2, 1.2, 0.6, 0.3], [1, 1.2, 0.8, 0.4], [0.8, 1, 1.3, 0.8], [0.6, 1, 1.5, 1.2], [0.3, 0.4, 1.2, 4]];
const RECORD_BY_DISTRICT = { spire: 0.04, midtown: 0.08, docks: 0.22, oldtown: 0.18, stack4: 0.25, stack9: 0.3 };
const RECORD_BY_AGE = [1.2, 1.1, 0.9, 0.6];
const UNDOCUMENTED_BY_DISTRICT = { spire: 0.01, midtown: 0.03, docks: 0.1, oldtown: 0.09, stack4: 0.08, stack9: 0.12 };
const MEDICAL_BASE = { none: 520, diabetes: 70, chronicpain: 60, depression: 70, schizophrenia: 8, ptsd: 25, opioid: 20, asthma: 50, smoglung: 30, heart: 30, kidney: 7, cancer: 10, hiv: 6, epilepsy: 7, dementia: 2, prosthetic: 15, implant: 10, pregnancy: 0 };

const STACKS = new Set(['stack4', 'stack9']);

function medicalWeights(profile) {
  const older = profile.age === '45-64' || profile.age === '65+';
  const weights = { ...MEDICAL_BASE };
  if (older) {
    weights.diabetes *= 1.6;
    weights.chronicpain *= 1.5;
    weights.heart *= 3;
  }
  if (profile.age === '65+') {
    weights.cancer *= 3;
    weights.dementia *= 25;
  }
  if (profile.occupation === 'laborer') {
    weights.chronicpain *= 1.5;
    weights.prosthetic *= 2;
  }
  if (STACKS.has(profile.district)) {
    weights.smoglung *= 3;
    weights.opioid *= 1.5;
  }
  if (profile.district === 'stack4' || profile.district === 'docks') weights.asthma *= 1.5;
  if (profile.citizenship === 'refugee') weights.ptsd *= 3;
  if (profile.sex === 'f' && (profile.age === '18-29' || profile.age === '30-44')) weights.pregnancy = 30;
  return FIELD_BY_KEY.medical.values.map((value) => weights[value]);
}

function restrict(fieldKey, weights, allowed) {
  const values = FIELD_BY_KEY[fieldKey].values;
  if (!allowed) return weights;
  const masked = values.map((value, index) => (allowed.includes(value) ? weights[index] : 0));
  return masked.some((weight) => weight > 0) ? masked : values.map((value) => (allowed.includes(value) ? 1 : 0));
}

function sampleField(random, fieldKey, weights, where) {
  const index = random.weighted(restrict(fieldKey, weights, where[fieldKey]));
  return FIELD_BY_KEY[fieldKey].values[index];
}

export function sampleProfile(random, where = {}, refugee = false) {
  const profile = {};
  const districtTable = refugee ? REFUGEE_DISTRICT_WEIGHTS : DISTRICT_WEIGHTS;
  profile.district = sampleField(random, 'district', FIELD_BY_KEY.district.values.map((value) => districtTable[value]), where);
  profile.sex = sampleField(random, 'sex', [1, 1], where);
  profile.age = sampleField(random, 'age', AGE_WEIGHTS[profile.district], where);
  const occupationWeights = [...OCCUPATION_WEIGHTS[profile.district]];
  if (profile.age === '65+') occupationWeights[0] += 120;
  if (refugee) occupationWeights[0] += 80;
  profile.occupation = sampleField(random, 'occupation', occupationWeights, where);
  const occupationIndex = FIELD_BY_KEY.occupation.values.indexOf(profile.occupation);
  const worthWeights = WORTH_WEIGHTS[profile.district].map((weight, index) => weight * WORTH_BY_OCCUPATION[occupationIndex][index] * (refugee && index > 1 ? 0.1 : 1));
  profile.worth = sampleField(random, 'worth', worthWeights, where);
  const ageIndex = FIELD_BY_KEY.age.values.indexOf(profile.age);
  const recordChance = Math.min(0.9, RECORD_BY_DISTRICT[profile.district] * (profile.sex === 'm' ? 1.3 : 0.7) * RECORD_BY_AGE[ageIndex] * (profile.worth === 'neg' ? 1.5 : 1));
  profile.record = sampleField(random, 'record', [1 - recordChance, recordChance], where);
  if (refugee) {
    profile.citizenship = sampleField(random, 'citizenship', [0, 0, 1, 0], where);
  } else {
    const corporate = profile.occupation === 'executive' || profile.district === 'spire' ? 0.35 : 0.04;
    const undocumented = UNDOCUMENTED_BY_DISTRICT[profile.district];
    const oldRefugee = profile.district === 'oldtown' || profile.district === 'docks' ? 0.03 : 0.01;
    profile.citizenship = sampleField(random, 'citizenship', [1 - corporate - undocumented - oldRefugee, corporate, oldRefugee, undocumented], where);
  }
  profile.medical = sampleField(random, 'medical', medicalWeights(profile), where);
  return profile;
}

export function matchesWhere(profile, where) {
  for (const fieldKey in where) {
    if (!where[fieldKey].includes(profile[fieldKey])) return false;
  }
  return true;
}

function matchesAnyRegion(profile) {
  return REGIONS.some((region) => matchesWhere(profile, region.where));
}

function sampleRegionMember(random, region) {
  for (;;) {
    const profile = sampleProfile(random, region.where, Boolean(region.refugees));
    if (!region.exclude || !matchesWhere(profile, region.exclude)) return profile;
  }
}

function sampleOutsideRegions(random, where, refugee) {
  for (;;) {
    const profile = sampleProfile(random, where, refugee);
    if (!matchesAnyRegion(profile)) return profile;
  }
}

function registryNumber(id) {
  return ((id * 7919 + 104729) % 900000) + 100000;
}

export function generatePopulation(seed = SEED) {
  const random = createRandom(seed);
  const specs = [];
  const castInRegion = {};

  for (const member of CAST) {
    specs.push({
      role: member.role,
      profile: { ...member.fields },
      guiltyFrom: member.guiltyFrom,
      crime: member.crime ?? null,
      region: member.region ?? null,
      refugee: Boolean(member.refugee),
      first: member.first,
      last: member.last,
    });
    if (member.region) {
      const tally = (castInRegion[member.region] ??= { guilty: 0, innocent: 0 });
      if (member.guiltyFrom > 0) tally.guilty++;
      else tally.innocent++;
    }
  }

  const sister = CAST.find((member) => member.role === 'sister');
  for (let index = 0; index < LOOKALIKES; index++) {
    specs.push({ role: 'lookalike', profile: { ...sister.fields }, guiltyFrom: 8, crime: 'pharmacytheft', region: 'e3', refugee: false });
  }
  castInRegion.e3.guilty += LOOKALIKES;

  for (const region of REGIONS) {
    const tally = castInRegion[region.id] ?? { guilty: 0, innocent: 0 };
    const regionRefugee = Boolean(region.refugees);
    const plantedGuilty = region.guilty - tally.guilty;
    const plantedInnocent = region.innocent - tally.innocent;
    for (let index = 0; index < plantedGuilty; index++) {
      const isGang = region.kind === 'tip';
      specs.push({
        role: isGang ? `${region.gang}-tipped` : null,
        profile: sampleRegionMember(random, region),
        guiltyFrom: region.active,
        crime: isGang ? GANGS.find((gang) => gang.id === region.gang).crime : region.crime,
        region: region.id,
        gang: isGang ? region.gang : null,
        refugee: regionRefugee,
      });
    }
    for (let index = 0; index < plantedInnocent; index++) {
      specs.push({ role: null, profile: sampleRegionMember(random, region), guiltyFrom: 0, crime: null, region: region.id, refugee: regionRefugee });
    }
  }

  for (const gang of GANGS) {
    const tipped = REGIONS.find((region) => region.kind === 'tip' && region.gang === gang.id).guilty;
    const districtNames = Object.keys(gang.districts);
    const districtWeights = Object.values(gang.districts);
    for (let index = tipped; index < gang.size; index++) {
      const district = districtNames[random.weighted(districtWeights)];
      specs.push({ role: null, profile: sampleOutsideRegions(random, { district: [district] }, false), guiltyFrom: 1, crime: gang.crime, region: null, gang: gang.id, refugee: false });
    }
  }

  const baseCount = specs.filter((spec) => !spec.refugee).length;
  const refugeeCount = specs.length - baseCount;
  for (let index = baseCount; index < BASE_POPULATION; index++) {
    specs.push({ role: null, profile: sampleOutsideRegions(random, {}, false), guiltyFrom: 0, crime: null, region: null, refugee: false });
  }
  for (let index = refugeeCount; index < REFUGEE_POPULATION; index++) {
    specs.push({ role: null, profile: sampleOutsideRegions(random, {}, true), guiltyFrom: 0, crime: null, region: null, refugee: true });
  }

  const player = specs.shift();
  random.shuffle(specs);
  specs.unshift(player);

  const size = specs.length;
  const columns = Object.fromEntries(FIELDS.map((field) => [field.key, new Uint8Array(size)]));
  const arrival = new Uint8Array(size);
  const guiltyFrom = new Uint8Array(size);
  const crime = new Array(size);
  const region = new Array(size);
  const gang = new Array(size);
  const firstName = new Array(size);
  const lastName = new Array(size);
  const registry = new Uint32Array(size);
  const roles = {};
  const roleOf = new Array(size).fill(null);

  specs.forEach((spec, id) => {
    for (const field of FIELDS) columns[field.key][id] = field.values.indexOf(spec.profile[field.key]);
    arrival[id] = spec.refugee ? REFUGEE_ARRIVAL : 1;
    guiltyFrom[id] = spec.guiltyFrom;
    crime[id] = spec.crime;
    region[id] = spec.region;
    gang[id] = spec.gang ?? null;
    const sex = spec.profile.sex;
    firstName[id] = spec.first ?? random.pick(FIRST_NAMES[sex]);
    lastName[id] = spec.last ?? random.pick(LAST_NAMES);
    registry[id] = registryNumber(id);
    if (spec.role) {
      roleOf[id] = spec.role;
      if (!roles[spec.role]) roles[spec.role] = id;
      (roles[`${spec.role}s`] ??= []).push(id);
    }
  });

  const contacts = buildContacts(random, { size, columns, arrival, guiltyFrom, gang, roles, roleOf });
  return { size, columns, arrival, guiltyFrom, crime, region, gang, firstName, lastName, registry, roles, roleOf, ...contacts };
}

function buildContacts(random, population) {
  const { size, columns, arrival, guiltyFrom, gang, roles, roleOf } = population;
  const adjacency = Array.from({ length: size }, () => []);
  const guiltyContacts = new Uint8Array(size);
  const locked = new Uint8Array(size);
  const isGuilty = (id) => guiltyFrom[id] > 0;
  const linked = (a, b) => adjacency[a].includes(b);

  const link = (a, b) => {
    adjacency[a].push(b);
    adjacency[b].push(a);
    if (isGuilty(b)) guiltyContacts[a]++;
    if (isGuilty(a)) guiltyContacts[b]++;
  };
  const allowed = (a, b) => {
    if (a === b || linked(a, b)) return false;
    if (arrival[a] !== arrival[b]) return false;
    if (isGuilty(a) && !isGuilty(b) && guiltyContacts[b] >= 2) return false;
    if (isGuilty(b) && !isGuilty(a) && guiltyContacts[a] >= 2) return false;
    return true;
  };

  const byDistrict = Array.from({ length: 6 }, () => []);
  const innocentByDistrict = Array.from({ length: 6 }, () => []);
  for (let id = 0; id < size; id++) {
    byDistrict[columns.district[id]].push(id);
    if (!isGuilty(id) && roleOf[id] === null && arrival[id] === 1) innocentByDistrict[columns.district[id]].push(id);
  }
  const used = new Set();
  const takeInnocent = (district) => {
    for (;;) {
      const id = random.pick(innocentByDistrict[district]);
      if (!used.has(id)) {
        used.add(id);
        return id;
      }
    }
  };

  const player = roles.player;
  const oldtown = FIELD_BY_KEY.district.values.indexOf('oldtown');
  const stack9 = FIELD_BY_KEY.district.values.indexOf('stack9');
  locked[player] = 1;
  link(player, roles.sister);
  link(player, roles.coworker);
  link(player, roles.shopkeeper);
  for (let index = 0; index < PLAYER_FRIENDS; index++) link(player, takeInnocent(oldtown));

  for (const id of [roles.sister, ...roles.lookalikes]) {
    locked[id] = 1;
    for (let index = 0; index < SISTER_FRIENDS + (id === roles.sister ? 0 : 1); index++) link(id, takeInnocent(stack9));
  }

  link(roles.shopkeeper, roles.son);
  link(roles.mother, roles.motherson);
  const cell = [roles.hacker, roles.cellmember1, roles.cellmember2, roles.cellmember3, roles.cellmember4];
  cell.forEach((a, index) => cell.slice(index + 1).forEach((b) => link(a, b)));

  for (const gangId of ['g1', 'g2']) {
    const members = [];
    for (let id = 0; id < size; id++) if (gang[id] === gangId) members.push(id);
    members.forEach((a, index) => {
      locked[a] = 1;
      members.slice(index + 1).forEach((b) => link(a, b));
    });
    for (const member of members) {
      const family = 1 + random.int(2);
      for (let index = 0; index < family; index++) {
        const relative = takeInnocent(columns.district[member]);
        if (allowed(member, relative)) link(member, relative);
      }
    }
    for (let index = 0; index < UNLUCKY_INNOCENTS_PER_GANG; index++) {
      const unlucky = takeInnocent(random.int(6));
      locked[unlucky] = 1;
      random.shuffle([...members]).slice(0, 3).forEach((member) => link(member, unlucky));
    }
  }

  const target = new Uint8Array(size);
  for (let id = 0; id < size; id++) target[id] = 4 + random.int(4);
  const order = random.shuffle(Array.from({ length: size }, (_, id) => id));
  for (const a of order) {
    if (locked[a]) continue;
    let attempts = 0;
    while (adjacency[a].length < target[a] && attempts < 40) {
      attempts++;
      const pool = random.chance(0.8) ? byDistrict[columns.district[a]] : byDistrict[random.int(6)];
      const b = random.pick(pool);
      if (locked[b] || adjacency[b].length >= 9) continue;
      if (allowed(a, b)) link(a, b);
    }
  }

  const contactStart = new Int32Array(size + 1);
  for (let id = 0; id < size; id++) contactStart[id + 1] = contactStart[id] + adjacency[id].length;
  const contactList = new Int32Array(contactStart[size]);
  for (let id = 0; id < size; id++) contactList.set(adjacency[id], contactStart[id]);
  return { contactStart, contactList };
}

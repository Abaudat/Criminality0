export function createRandom(seed) {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (max) => Math.floor(next() * max);
  const pick = (list) => list[int(list.length)];
  const weighted = (weights) => {
    let total = 0;
    for (const weight of weights) total += weight;
    let roll = next() * total;
    for (let index = 0; index < weights.length; index++) {
      roll -= weights[index];
      if (roll < 0) return index;
    }
    return weights.length - 1;
  };
  const shuffle = (list) => {
    for (let index = list.length - 1; index > 0; index--) {
      const other = int(index + 1);
      [list[index], list[other]] = [list[other], list[index]];
    }
    return list;
  };
  return { next, int, pick, weighted, shuffle, chance: (probability) => next() < probability };
}

export function hashSeed(...parts) {
  let hash = 2166136261;
  for (const part of parts) {
    const text = String(part);
    for (let index = 0; index < text.length; index++) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    hash ^= 0x9e3779b9;
  }
  return hash >>> 0;
}

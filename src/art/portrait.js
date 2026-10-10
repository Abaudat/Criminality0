import { createRandom, hashSeed } from '../core/random.js';
import { BAYER4, hexToRgb, PALETTE } from './palette.js';

export const PORTRAIT_WIDTH = 64;
export const PORTRAIT_HEIGHT = 72;

const LIGHT = (() => {
  const vector = [-0.4, -0.45, 0.8];
  const length = Math.hypot(...vector);
  return vector.map((value) => value / length);
})();

const HAIR_STYLES = {
  f: { long: 3, bob: 3, bun: 2, short: 2, buzz: 0.7, hood: 1, cap: 0.5 },
  m: { short: 4, buzz: 3, bald: 1.5, mohawk: 0.5, hood: 1.5, cap: 1.5, long: 0.8 },
};

function pickWeighted(random, table) {
  const keys = Object.keys(table);
  return keys[random.weighted(keys.map((key) => table[key]))];
}

export function drawLuminance(spec) {
  const W = PORTRAIT_WIDTH;
  const H = PORTRAIT_HEIGHT;
  const random = createRandom(hashSeed('face', spec.seed));
  const lum = new Float32Array(W * H);
  const set = (x, y, value) => {
    if (x >= 0 && y >= 0 && x < W && y < H) lum[(y | 0) * W + (x | 0)] = value;
  };
  const get = (x, y) => (x >= 0 && y >= 0 && x < W && y < H ? lum[(y | 0) * W + (x | 0)] : 0);
  const shade = (x, y, factor) => set(x, y, get(x, y) * factor);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) lum[y * W + x] = 0.04 + 0.2 * Math.max(0, 1 - Math.hypot(x - W * 0.5, y - H * 0.4) / (W * 0.55)) ** 2;
  }

  const age = spec.age;
  const female = spec.sex === 'f';
  const skin = 0.5 + random.next() * 0.38;
  const hairLum = age >= 2 && random.chance(0.4 + age * 0.15) ? 0.55 + random.next() * 0.3 : 0.06 + random.next() * 0.22;
  const cx = 32 + (random.next() - 0.5) * 2;
  const cy = 33 + (random.next() - 0.5) * 2;
  const rx = (female ? 11.5 : 12.5) + random.next() * 2;
  const ry = 15 + random.next() * 2;
  const clothing = spec.occupation === 'executive' || spec.occupation === 'state' ? 0.18 : 0.25 + random.next() * 0.35;

  const shoulderWidth = (female ? 26 : 30) + random.next() * 4;
  for (let y = 52; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - 32) / shoulderWidth;
      const dy = (y - 80) / 26;
      if (dx * dx + dy * dy < 1) {
        const nx = dx;
        const nz = Math.sqrt(Math.max(0, 1 - dx * dx));
        set(x, y, clothing * (0.45 + 0.8 * Math.max(0, nx * LIGHT[0] + nz * LIGHT[2])));
      }
    }
  }
  if (spec.occupation === 'executive' || spec.occupation === 'state' || spec.occupation === 'office') {
    for (let y = 56; y < H; y++) {
      const half = (y - 56) * 0.45;
      for (let x = Math.round(32 - half); x <= Math.round(32 + half); x++) set(x, y, 0.85);
    }
    if (spec.occupation !== 'office') for (let y = 59; y < H; y++) set(32, y, 0.12);
  }

  const neckHalf = female ? 4.5 : 5.5;
  for (let y = Math.round(cy + ry - 6); y < 60; y++) {
    for (let x = Math.round(cx - neckHalf); x <= Math.round(cx + neckHalf); x++) set(x, y, skin * (x < cx ? 0.62 : 0.42));
  }

  const headMask = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dy = (y - cy) / ry;
      const jaw = dy > 0 ? 1 - (female ? 0.3 : 0.2) * dy * dy : 1;
      const dx = (x - cx) / (rx * jaw);
      const d = dx * dx + dy * dy;
      if (d < 1) {
        headMask[y * W + x] = 1;
        const nz = Math.sqrt(1 - d);
        const lambert = Math.max(0, dx * LIGHT[0] + dy * LIGHT[1] + nz * LIGHT[2]);
        set(x, y, skin * (0.38 + 0.95 * lambert) + (d > 0.7 && dx > 0.25 ? 0.22 : 0));
      }
    }
  }
  for (const side of [-1, 1]) {
    for (let y = -3; y <= 3; y++) {
      for (let x = -2; x <= 2; x++) {
        if ((x * x) / 4 + (y * y) / 9 < 1) set(cx + side * (rx + 0.5) + x, cy + 2 + y, skin * (side < 0 ? 0.75 : 0.35));
      }
    }
  }

  const eyeY = cy - 1 + (random.next() - 0.5) * 2;
  const eyeSpread = 4.8 + random.next() * 1.4;
  for (const side of [-1, 1]) {
    const ex = cx + side * eyeSpread;
    for (let y = -3; y <= 3; y++) {
      for (let x = -4; x <= 4; x++) {
        if ((x * x) / 16 + (y * y) / 7 < 1) shade(ex + x, eyeY + y, 0.55);
      }
    }
    for (let x = -2; x <= 2; x++) set(ex + x, eyeY, 0.75);
    set(ex, eyeY, 0.04);
    set(ex + side * 0.0 + 1, eyeY, 0.04);
    set(ex - 1, eyeY - 1, 0.95);
    const browTilt = (random.next() - 0.5) * 1.2;
    for (let x = -3; x <= 3; x++) {
      const by = eyeY - 4 + (x * side * browTilt) / 3;
      set(ex + x, by, Math.min(get(ex + x, by), hairLum * 0.8));
      if (!female) set(ex + x, by + 1, Math.min(get(ex + x, by + 1), hairLum));
    }
  }

  for (let y = Math.round(eyeY + 1); y < cy + 7; y++) shade(cx + 1.5, y, 0.6);
  shade(cx - 1, cy + 7, 0.45);
  shade(cx + 2, cy + 7, 0.4);
  for (let x = -1; x <= 2; x++) shade(cx + x, cy + 8, 0.75);

  const mouthY = cy + 10.5 + random.next();
  const mouthHalf = 3 + random.next() * 1.6;
  const smile = (random.next() - 0.6) * 1.2;
  for (let x = -mouthHalf; x <= mouthHalf; x++) {
    const curve = smile * ((x * x) / (mouthHalf * mouthHalf) - 0.5);
    set(cx + x, mouthY + curve, 0.08);
    shade(cx + x, mouthY + curve + 1, 1.25);
  }

  if (age >= 2) {
    for (let x = -5; x <= 5; x++) shade(cx + x, cy - ry * 0.55 + (x % 3 === 0 ? 1 : 0), 0.8);
    for (let step = 0; step < 6; step++) {
      shade(cx - 5 - step * 0.4, cy + 5 + step, 0.72);
      shade(cx + 5 + step * 0.4, cy + 5 + step, 0.72);
    }
  }
  if (age >= 3) {
    for (const side of [-1, 1]) for (let x = 0; x < 4; x++) shade(cx + side * (eyeSpread + 3 + x), eyeY + 1 + x * 0.5, 0.7);
  }

  const style = pickWeighted(random, HAIR_STYLES[spec.sex]);
  const hair = (x, y) => set(x, y, hairLum * (0.7 + random.next() * 0.6) * (x < cx ? 1.25 : 0.8));
  const hairline = cy - ry * (0.42 + random.next() * 0.12);
  const hairCap = (thickness, mottled) => {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const dx = (x - cx) / (rx + thickness);
        const dy = (y - cy) / (ry + thickness);
        if (dx * dx + dy * dy < 1 && y < hairline + Math.abs(x - cx) * 0.25 && (!mottled || random.chance(0.75))) hair(x, y);
      }
    }
  };
  if (style === 'short') hairCap(2, false);
  if (style === 'buzz') hairCap(0.8, true);
  if (style === 'mohawk') for (let y = cy - ry - 4; y < hairline; y++) for (let x = cx - 2; x <= cx + 2; x++) hair(x, y);
  if (style === 'long' || style === 'bob') {
    hairCap(2.5, false);
    const bottom = style === 'long' ? 66 : cy + ry * 0.6;
    for (let y = Math.round(hairline); y < bottom; y++) {
      for (const side of [-1, 1]) {
        for (let w = 0; w < 5; w++) {
          const x = cx + side * (rx - 1 + w + (y > cy + 6 ? (y - cy - 6) * 0.25 : 0));
          if (!headMask[(y | 0) * W + (x | 0)] || w < 2) hair(x, y);
        }
      }
    }
  }
  if (style === 'bun') {
    hairCap(1.8, false);
    for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) if (x * x + y * y < 25) hair(cx + x, cy - ry - 4 + y);
  }
  if (style === 'hood' || style === 'cap') {
    const hoodLum = clothing * 0.8;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const dx = (x - cx) / (rx + 5);
        const dy = (y - cy + 2) / (ry + 5);
        const inside = dx * dx + dy * dy < 1;
        if (style === 'hood' && inside && !(headMask[y * W + x] && y > hairline - 1)) set(x, y, hoodLum * (x < cx ? 1.3 : 0.7));
        if (style === 'cap' && inside && y < hairline + 1) set(x, y, hoodLum * (x < cx ? 1.4 : 0.8));
      }
    }
    if (style === 'cap') for (let x = -rx - 3; x <= rx + 1; x++) set(cx + x, hairline + 1, 0.05);
    if (style === 'cap') for (let x = -rx; x <= rx; x++) shade(cx + x, hairline + 2, 0.5);
  }

  if (!female && random.chance(0.3)) {
    for (let y = Math.round(cy + 6); y < cy + ry; y++) {
      for (let x = 0; x < W; x++) if (headMask[y * W + x] && Math.abs(x - cx) > 1 - (y > mouthY ? 3 : 0) && random.chance(0.8)) hair(x, y);
    }
  }
  if (random.chance(0.18)) {
    for (const side of [-1, 1]) {
      const ex = cx + side * eyeSpread;
      for (let x = -4; x <= 4; x++) {
        set(ex + x, eyeY - 3, 0.9);
        set(ex + x, eyeY + 3, 0.9);
      }
      for (let y = -3; y <= 3; y++) {
        set(ex - 4, eyeY + y, 0.9);
        set(ex + 4, eyeY + y, 0.9);
      }
    }
    set(cx, eyeY - 2, 0.9);
    set(cx - 1, eyeY - 2, 0.9);
  }
  if (spec.medical === 'implant' || spec.medical === 'prosthetic' || random.chance(0.08)) {
    const px = cx - rx + 1;
    for (let y = -4; y <= 4; y++) for (let x = 0; x < 5; x++) set(px + x, eyeY - 2 + y, 0.95);
    for (let y = -3; y <= 3; y += 2) set(px + 2, eyeY - 2 + y, 0.1);
    for (let y = eyeY + 2; y < cy + ry; y++) set(px + 1 + (y % 2), y, 0.85);
  }
  if (spec.medical === 'smoglung') {
    for (let y = Math.round(cy + 4); y < cy + 14; y++) for (let x = -7; x <= 7; x++) set(cx + x, y, 0.62 + (x < 0 ? 0.15 : 0));
    for (const side of [-1, 1]) for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) if (x * x + y * y < 5) set(cx + side * 5 + x, cy + 10 + y, 0.12);
  }
  if (random.chance(0.1)) for (let step = 0; step < 7; step++) set(cx + 4 + step * 0.6, cy + 1 + step, 0.98);
  if (female && random.chance(0.4)) {
    set(cx - rx - 0.5, cy + 6, 1);
    set(cx + rx + 0.5, cy + 6, 0.8);
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const index = y * W + x;
      const vx = (x - W / 2) / (W / 2);
      const vy = (y - H / 2) / (H / 2);
      let value = lum[index] * (1 - 0.25 * (vx * vx + vy * vy)) + (random.next() - 0.5) * 0.04;
      if (y % 3 === 0) value *= 0.92;
      value = Math.min(1, Math.max(0, (value - 0.06) * 1.45));
      lum[index] = value;
    }
  }
  return lum;
}

const cache = new Map();

export function portraitUrl(spec, tone = 'terminal') {
  const key = `${spec.seed}:${tone}`;
  if (cache.has(key)) return cache.get(key);
  const [dark, light] = tone === 'paper' ? [PALETTE.paperInk, PALETTE.paper] : tone === 'alert' ? [PALETTE.ink, PALETTE.red] : [PALETTE.ink, PALETTE.phos];
  const darkRgb = hexToRgb(dark);
  const lightRgb = hexToRgb(light);
  const lum = drawLuminance(spec);
  const canvas = document.createElement('canvas');
  canvas.width = PORTRAIT_WIDTH;
  canvas.height = PORTRAIT_HEIGHT;
  const context = canvas.getContext('2d');
  const image = context.createImageData(PORTRAIT_WIDTH, PORTRAIT_HEIGHT);
  for (let y = 0; y < PORTRAIT_HEIGHT; y++) {
    for (let x = 0; x < PORTRAIT_WIDTH; x++) {
      const on = lum[y * PORTRAIT_WIDTH + x] > BAYER4[(y % 4) * 4 + (x % 4)];
      const rgb = on ? lightRgb : darkRgb;
      const offset = (y * PORTRAIT_WIDTH + x) * 4;
      image.data[offset] = rgb[0];
      image.data[offset + 1] = rgb[1];
      image.data[offset + 2] = rgb[2];
      image.data[offset + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  const url = canvas.toDataURL();
  if (cache.size > 600) cache.delete(cache.keys().next().value);
  cache.set(key, url);
  return url;
}

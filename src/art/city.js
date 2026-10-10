import { createRandom } from '../core/random.js';
import { PALETTE } from './palette.js';

export const FEED_WIDTH = 320;
export const FEED_HEIGHT = 180;
const STREET = 148;
const SKY_BANDS = ['#06090a', '#08101a', '#0b1522', '#0f1b2c', '#132236', '#16233a'];

function buildSkyline(random) {
  const far = [];
  for (let x = -10; x < FEED_WIDTH + 10; ) {
    const width = 8 + random.int(18);
    far.push({ x, width, top: 40 + random.int(70), windows: [] });
    x += width + random.int(3);
  }
  const near = [];
  for (let x = -20; x < FEED_WIDTH + 20; ) {
    const width = 22 + random.int(40);
    near.push({ x, width, top: 70 + random.int(55), windows: [] });
    x += width + 2 + random.int(10);
  }
  for (const building of [...far, ...near]) {
    for (let y = building.top + 3; y < STREET - 2; y += 4) {
      for (let x = building.x + 2; x < building.x + building.width - 2; x += 3) {
        if (random.chance(0.22)) building.windows.push({ x, y, color: random.chance(0.7) ? PALETTE.amber : PALETTE.phos, phase: random.next() * 100 });
      }
    }
  }
  const signs = [];
  for (let index = 0; index < 7; index++) {
    const building = near[random.int(near.length)];
    signs.push({
      x: building.x + 2 + random.int(Math.max(1, building.width - 14)),
      y: building.top + 6 + random.int(30),
      width: 8 + random.int(10),
      height: 14 + random.int(18),
      color: random.chance(0.5) ? PALETTE.magenta : PALETTE.cyan,
      glyphs: Array.from({ length: 12 }, () => random.chance(0.5)),
      phase: random.next() * 10,
    });
  }
  return { far, near, signs, spire: { x: 40 + random.int(220), top: 6 } };
}

export function createCityFeed(canvas, options = {}) {
  canvas.width = FEED_WIDTH;
  canvas.height = FEED_HEIGHT;
  const context = canvas.getContext('2d');
  const random = createRandom(options.seed ?? 7);
  const skyline = buildSkyline(random);
  const rain = Array.from({ length: 140 }, () => ({ x: random.next() * FEED_WIDTH, y: random.next() * FEED_HEIGHT, speed: 5 + random.next() * 5 }));
  const drops = Array.from({ length: 10 }, () => ({ x: random.next() * FEED_WIDTH, y: random.next() * FEED_HEIGHT, r: 3 + random.next() * 7, speed: 0.05 + random.next() * 0.25 }));
  let mood = { watch: 0.05, detain: 0.02, unrest: 0, label: options.label ?? 'CAM 07 · STACK 9' };
  const walkers = Array.from({ length: 18 }, () => spawnWalker(random, true));
  let running = false;
  let frame = 0;
  let last = 0;
  let handle = 0;

  function spawnWalker(rng, anywhere) {
    const direction = rng.chance(0.5) ? 1 : -1;
    const roll = rng.next();
    return {
      x: anywhere ? rng.next() * FEED_WIDTH : direction > 0 ? -10 : FEED_WIDTH + 10,
      y: STREET + 4 + rng.int(22),
      direction,
      speed: 0.25 + rng.next() * 0.5,
      umbrella: rng.chance(0.6),
      tag: roll < mood.detain ? 'detain' : roll < mood.detain + mood.watch ? 'watch' : null,
      shade: rng.chance(0.5) ? '#1a2627' : '#24302f',
    };
  }

  function draw(time) {
    frame++;
    const bandHeight = STREET / SKY_BANDS.length;
    SKY_BANDS.forEach((color, index) => {
      context.fillStyle = color;
      context.fillRect(0, index * bandHeight, FEED_WIDTH, bandHeight + 1);
    });
    context.fillStyle = '#0a1018';
    context.fillRect(skyline.spire.x, skyline.spire.top, 10, STREET);
    context.fillRect(skyline.spire.x - 4, 40, 18, STREET);
    context.fillStyle = Math.floor(time / 600) % 2 ? PALETTE.red : '#40100e';
    context.fillRect(skyline.spire.x + 4, skyline.spire.top - 2, 2, 2);
    for (const building of skyline.far) {
      context.fillStyle = '#0c1520';
      context.fillRect(building.x, building.top, building.width, STREET - building.top);
      for (const light of building.windows) {
        if ((light.phase + time / 4000) % 7 > 0.3) {
          context.fillStyle = light.color;
          context.globalAlpha = 0.35;
          context.fillRect(light.x, light.y, 1, 1);
        }
      }
      context.globalAlpha = 1;
    }
    for (const building of skyline.near) {
      context.fillStyle = PALETTE.ink;
      context.fillRect(building.x, building.top, building.width, STREET - building.top);
      context.fillStyle = PALETTE.panel;
      context.fillRect(building.x, building.top, 1, STREET - building.top);
      for (const light of building.windows) {
        if ((light.phase + time / 3000) % 9 > 0.5) {
          context.fillStyle = light.color;
          context.globalAlpha = 0.6;
          context.fillRect(light.x, light.y, 1, 2);
        }
      }
      context.globalAlpha = 1;
    }
    for (const sign of skyline.signs) {
      const on = Math.sin(time / 90 + sign.phase * 7) > -0.92 || Math.random() > 0.5;
      context.fillStyle = on ? sign.color : '#2a1020';
      context.fillRect(sign.x, sign.y, sign.width, sign.height);
      context.fillStyle = PALETTE.ink;
      sign.glyphs.forEach((filled, index) => {
        if (filled) context.fillRect(sign.x + 2 + (index % 2) * Math.floor((sign.width - 4) / 2), sign.y + 2 + Math.floor(index / 2) * Math.floor((sign.height - 4) / 6), Math.floor((sign.width - 6) / 2), 1);
      });
      if (on) {
        context.globalAlpha = 0.18;
        context.fillStyle = sign.color;
        context.fillRect(sign.x - 4, sign.y - 4, sign.width + 8, sign.height + 8);
        context.globalAlpha = 0.25;
        context.fillRect(sign.x, STREET + (STREET - sign.y) * 0.18, sign.width, 2 + (sign.height >> 2));
        context.globalAlpha = 1;
      }
    }
    context.fillStyle = '#080d0e';
    context.fillRect(0, STREET, FEED_WIDTH, FEED_HEIGHT - STREET);
    for (let y = STREET + 2; y < FEED_HEIGHT; y += 3) {
      context.fillStyle = y % 2 ? '#0d1617' : '#0a1213';
      context.fillRect(0, y, FEED_WIDTH, 1);
    }
    if (mood.unrest > 0.3) {
      const flicker = 0.4 + Math.random() * 0.4;
      context.globalAlpha = Math.min(0.6, mood.unrest - 0.2) * flicker;
      context.fillStyle = PALETTE.amber;
      context.fillRect(60, STREET - 10, 24, 14);
      context.fillStyle = PALETTE.red;
      context.fillRect(230, STREET - 6, 18, 10);
      context.globalAlpha = 1;
    }
    walkers.sort((a, b) => a.y - b.y);
    for (let index = 0; index < walkers.length; index++) {
      const walker = walkers[index];
      walker.x += walker.direction * walker.speed;
      if (walker.x < -14 || walker.x > FEED_WIDTH + 14) walkers[index] = spawnWalker(random, false);
      const step = Math.floor(walker.x / 3) % 2;
      const x = Math.round(walker.x);
      const y = walker.y;
      context.fillStyle = walker.shade;
      context.fillRect(x - 2, y - 11, 4, 8);
      context.fillRect(x - 1, y - 14, 3, 3);
      context.fillRect(x - 2 + step, y - 3, 1, 3);
      context.fillRect(x + 1 - step, y - 3, 1, 3);
      if (walker.umbrella) {
        context.fillStyle = '#121c1d';
        context.fillRect(x - 5, y - 17, 11, 2);
        context.fillRect(x - 3, y - 18, 7, 1);
        context.fillRect(x, y - 16, 1, 4);
      }
      if (walker.tag) {
        context.strokeStyle = walker.tag === 'detain' ? PALETTE.red : PALETTE.amber;
        context.lineWidth = 1;
        context.strokeRect(x - 6.5, y - 20.5, 13, 21);
        context.fillStyle = context.strokeStyle;
        context.fillRect(x - 6, y - 24, 9, 3);
      }
    }
    context.strokeStyle = 'rgba(143, 245, 200, 0.22)';
    context.lineWidth = 1;
    context.beginPath();
    for (const streak of rain) {
      streak.y += streak.speed;
      streak.x -= streak.speed * 0.25;
      if (streak.y > FEED_HEIGHT) {
        streak.y = -6;
        streak.x = Math.random() * (FEED_WIDTH + 40);
      }
      context.moveTo(streak.x, streak.y);
      context.lineTo(streak.x + 1.5, streak.y - 6);
    }
    context.stroke();
    for (const drop of drops) {
      drop.y += drop.speed;
      if (drop.y - drop.r > FEED_HEIGHT) {
        drop.y = -drop.r;
        drop.x = Math.random() * FEED_WIDTH;
      }
      context.globalAlpha = 0.12;
      context.fillStyle = PALETTE.bright;
      context.beginPath();
      context.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 0.25;
      context.fillRect(drop.x - drop.r * 0.4, drop.y - drop.r * 0.5, 2, 2);
      context.globalAlpha = 1;
    }
    context.fillStyle = PALETTE.phos;
    context.font = '8px monospace';
    context.textBaseline = 'top';
    const clock = new Date(Date.now()).toTimeString().slice(0, 8);
    context.fillText(`${mood.label}  ${clock}`, 6, 5);
    if (Math.floor(time / 700) % 2) {
      context.fillStyle = PALETTE.red;
      context.fillRect(FEED_WIDTH - 30, 6, 4, 4);
      context.fillText('REC', FEED_WIDTH - 24, 5);
    }
    context.strokeStyle = 'rgba(143, 245, 200, 0.5)';
    for (const [cx, cy, dx, dy] of [[3, 3, 1, 1], [FEED_WIDTH - 3, 3, -1, 1], [3, FEED_HEIGHT - 3, 1, -1], [FEED_WIDTH - 3, FEED_HEIGHT - 3, -1, -1]]) {
      context.beginPath();
      context.moveTo(cx + dx * 10, cy);
      context.lineTo(cx, cy);
      context.lineTo(cx, cy + dy * 10);
      context.stroke();
    }
  }

  function loop(time) {
    if (!running) return;
    handle = requestAnimationFrame(loop);
    if (document.hidden || time - last < 66) return;
    last = time;
    draw(time);
  }

  return {
    start() {
      if (running) return;
      running = true;
      draw(performance.now());
      handle = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(handle);
    },
    setMood(next) {
      mood = { ...mood, ...next };
    },
    mood: () => mood,
    drawOnce(time = 1000) {
      draw(time);
    },
  };
}

const PROGRESSION = [
  { root: 48, chord: [0, 3, 7, 10, 14] },
  { root: 44, chord: [0, 4, 7, 11, 14] },
  { root: 41, chord: [0, 3, 7, 10, 14] },
  { root: 43, chord: [0, 4, 8, 10, 13] },
];
const BLUES = [0, 3, 5, 6, 7, 10, 12, 15];
const BEAT = 60 / 66;

let context = null;
let master = null;
let musicBus = null;
let sfxBus = null;
let enabled = true;
let nextBar = 0;
let bar = 0;
let scheduler = 0;
let shortNoise = null;

const midi = (note) => 440 * Math.pow(2, (note - 69) / 12);

function noiseBuffer(seconds) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let index = 0; index < data.length; index++) {
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.02 * white) / 1.02;
    data[index] = brown * 3.5 + white * 0.15;
  }
  return buffer;
}

function startRain() {
  const source = context.createBufferSource();
  source.buffer = noiseBuffer(4);
  source.loop = true;
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  const gain = context.createGain();
  gain.gain.value = 0.22;
  source.connect(filter).connect(gain).connect(musicBus);
  source.start();
}

function envelope(gain, time, attack, peak, decay) {
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(peak, time + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + attack + decay);
}

function piano(note, time, duration, peak = 0.05) {
  const carrier = context.createOscillator();
  const modulator = context.createOscillator();
  const modulation = context.createGain();
  const gain = context.createGain();
  carrier.frequency.value = midi(note);
  modulator.frequency.value = midi(note) * 2;
  modulation.gain.setValueAtTime(midi(note) * 1.2, time);
  modulation.gain.exponentialRampToValueAtTime(1, time + duration * 0.6);
  modulator.connect(modulation).connect(carrier.frequency);
  envelope(gain, time, 0.01, peak, duration);
  carrier.connect(gain).connect(musicBus);
  carrier.start(time);
  modulator.start(time);
  carrier.stop(time + duration + 0.1);
  modulator.stop(time + duration + 0.1);
}

function bass(note, time, duration) {
  const oscillator = context.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.value = midi(note);
  const gain = context.createGain();
  envelope(gain, time, 0.02, 0.16, duration);
  oscillator.connect(gain).connect(musicBus);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.1);
}

function brush(time, peak) {
  const source = context.createBufferSource();
  shortNoise ??= noiseBuffer(0.3);
  source.buffer = shortNoise;
  const filter = context.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 5000;
  const gain = context.createGain();
  envelope(gain, time, 0.005, peak, 0.12);
  source.connect(filter).connect(gain).connect(musicBus);
  source.start(time);
}

function horn(note, time, duration) {
  const oscillator = context.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = midi(note);
  const vibrato = context.createOscillator();
  const depth = context.createGain();
  vibrato.frequency.value = 5;
  depth.gain.value = 4;
  vibrato.connect(depth).connect(oscillator.frequency);
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1100;
  filter.Q.value = 2;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.035, time + 0.12);
  gain.gain.setValueAtTime(0.035, time + duration * 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(filter).connect(gain).connect(musicBus);
  oscillator.start(time);
  vibrato.start(time);
  oscillator.stop(time + duration + 0.1);
  vibrato.stop(time + duration + 0.1);
}

function scheduleBar(time) {
  const { root, chord } = PROGRESSION[bar % PROGRESSION.length];
  for (const interval of chord) piano(root + 12 + interval, time + (interval % 2 ? 0.03 : 0), BEAT * 3.5, 0.022);
  piano(root + 12 + chord[1], time + BEAT * 2.66, BEAT * 1.2, 0.015);
  const walk = [0, 7, 12, 10];
  walk.forEach((step, beat) => bass(root - 12 + step, time + beat * BEAT, BEAT * 0.9));
  for (let beat = 0; beat < 4; beat++) {
    brush(time + beat * BEAT, beat % 2 ? 0.05 : 0.03);
    brush(time + beat * BEAT + BEAT * 0.66, 0.02);
  }
  if (bar % 8 >= 4 && Math.random() < 0.7) {
    let offset = Math.random() < 0.5 ? 0 : BEAT;
    const phrase = 2 + Math.floor(Math.random() * 4);
    for (let note = 0; note < phrase && offset < BEAT * 4; note++) {
      const length = BEAT * (Math.random() < 0.4 ? 1.5 : 0.66);
      horn(60 + BLUES[Math.floor(Math.random() * BLUES.length)], time + offset, length);
      offset += length;
    }
  }
  bar++;
}

function tick() {
  if (!context) return;
  while (nextBar < context.currentTime + 1.5) {
    scheduleBar(nextBar);
    nextBar += BEAT * 4;
  }
}

export function initAudio() {
  if (context) {
    if (context.state === 'suspended' && enabled && !document.hidden) context.resume();
    return;
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  context = new AudioContext();
  master = context.createGain();
  master.gain.value = enabled ? 0.8 : 0;
  const compressor = context.createDynamicsCompressor();
  master.connect(compressor).connect(context.destination);
  musicBus = context.createGain();
  musicBus.gain.value = 0.55;
  musicBus.connect(master);
  sfxBus = context.createGain();
  sfxBus.gain.value = 0.7;
  sfxBus.connect(master);
  startRain();
  nextBar = context.currentTime + 0.3;
  scheduler = setInterval(tick, 400);
  tick();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) context.suspend();
    else if (enabled) context.resume();
  });
}

export function setSoundEnabled(value) {
  enabled = value;
  if (master) master.gain.setTargetAtTime(value ? 0.8 : 0, context.currentTime, 0.1);
}

function tone(type, from, to, duration, peak, delay = 0) {
  if (!context || !enabled) return;
  const time = context.currentTime + delay;
  const oscillator = context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, time);
  oscillator.frequency.exponentialRampToValueAtTime(to, time + duration);
  const gain = context.createGain();
  envelope(gain, time, 0.005, peak, duration);
  oscillator.connect(gain).connect(sfxBus);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.05);
}

function thump(peak, cutoff) {
  if (!context || !enabled) return;
  const time = context.currentTime;
  const source = context.createBufferSource();
  shortNoise ??= noiseBuffer(0.3);
  source.buffer = shortNoise;
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = cutoff;
  const gain = context.createGain();
  envelope(gain, time, 0.002, peak, 0.18);
  source.connect(filter).connect(gain).connect(sfxBus);
  source.start(time);
}

export const sfx = {
  click: () => tone('square', 1800, 1200, 0.03, 0.03),
  key: () => tone('square', 2400 + Math.random() * 400, 2000, 0.015, 0.015),
  toggle: () => tone('triangle', 660, 880, 0.06, 0.05),
  open: () => tone('sine', 440, 660, 0.12, 0.05),
  close: () => tone('sine', 660, 440, 0.1, 0.04),
  stamp: () => {
    thump(0.9, 600);
    tone('sine', 110, 40, 0.25, 0.4);
  },
  error: () => {
    tone('square', 220, 200, 0.12, 0.06);
    tone('square', 180, 160, 0.16, 0.06, 0.13);
  },
  ring: () => {
    for (let index = 0; index < 4; index++) {
      tone('sine', 440, 440, 0.18, 0.06, index * 0.22);
      tone('sine', 480, 480, 0.18, 0.06, index * 0.22);
    }
  },
  glitch: () => {
    for (let index = 0; index < 8; index++) tone('square', 100 + Math.random() * 2000, 50 + Math.random() * 400, 0.05, 0.05, index * 0.04);
  },
  chime: () => {
    tone('sine', 523, 523, 0.4, 0.05);
    tone('sine', 784, 784, 0.5, 0.04, 0.12);
  },
  alarm: () => {
    for (let index = 0; index < 3; index++) tone('sawtooth', 880, 440, 0.3, 0.05, index * 0.35);
  },
};

export const PALETTE = {
  void: '#06090a',
  ink: '#0c1213',
  panel: '#111a1b',
  raise: '#1a2627',
  line: '#2a3c3c',
  dim: '#4d7268',
  phos: '#8ff5c8',
  bright: '#d6ffe9',
  amber: '#ffb547',
  red: '#ff4438',
  cyan: '#4cc9f0',
  magenta: '#ff3d9a',
  paper: '#e9e1cf',
  paperInk: '#2a2420',
  paperDim: '#b9ae97',
  night: '#16233a',
};

export function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export const PALETTE_LIST = Object.values(PALETTE);
export const PALETTE_RGB = PALETTE_LIST.map(hexToRgb);

export const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((value) => (value + 0.5) / 16);

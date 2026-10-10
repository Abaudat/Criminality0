class ByteWriter {
  constructor() {
    this.bytes = [];
  }
  byte(value) {
    this.bytes.push(value & 255);
  }
  word(value) {
    this.byte(value);
    this.byte(value >> 8);
  }
  text(value) {
    for (const character of value) this.byte(character.charCodeAt(0));
  }
}

function lzw(indices, minCodeSize, out) {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = endCode + 1;
  let dictionary = new Map();
  let buffer = 0;
  let bufferBits = 0;
  const block = [];
  const flushBlock = () => {
    out.byte(block.length);
    for (const value of block) out.byte(value);
    block.length = 0;
  };
  const emit = (code) => {
    buffer |= code << bufferBits;
    bufferBits += codeSize;
    while (bufferBits >= 8) {
      block.push(buffer & 255);
      if (block.length === 255) flushBlock();
      buffer >>= 8;
      bufferBits -= 8;
    }
  };
  emit(clearCode);
  let prefix = indices[0];
  for (let index = 1; index < indices.length; index++) {
    const value = indices[index];
    const key = prefix * 4096 + value;
    const existing = dictionary.get(key);
    if (existing !== undefined) {
      prefix = existing;
      continue;
    }
    emit(prefix);
    if (nextCode < 4096) {
      dictionary.set(key, nextCode++);
      if (nextCode > 1 << codeSize && codeSize < 12) codeSize++;
    } else {
      emit(clearCode);
      dictionary = new Map();
      codeSize = minCodeSize + 1;
      nextCode = endCode + 1;
    }
    prefix = value;
  }
  emit(prefix);
  emit(endCode);
  if (bufferBits > 0) block.push(buffer & 255);
  if (block.length) flushBlock();
  out.byte(0);
}

export function encodeGif(width, height, frames, palette, delays) {
  let bits = 1;
  while (1 << bits < palette.length) bits++;
  const tableSize = 1 << bits;
  const out = new ByteWriter();
  out.text('GIF89a');
  out.word(width);
  out.word(height);
  out.byte(0x80 | ((bits - 1) << 4) | (bits - 1));
  out.byte(0);
  out.byte(0);
  for (let index = 0; index < tableSize; index++) {
    const rgb = palette[index] ?? [0, 0, 0];
    out.byte(rgb[0]);
    out.byte(rgb[1]);
    out.byte(rgb[2]);
  }
  out.byte(0x21);
  out.byte(0xff);
  out.byte(11);
  out.text('NETSCAPE2.0');
  out.byte(3);
  out.byte(1);
  out.word(0);
  out.byte(0);
  frames.forEach((indices, frameIndex) => {
    out.byte(0x21);
    out.byte(0xf9);
    out.byte(4);
    out.byte(0);
    out.word(delays[frameIndex]);
    out.byte(0);
    out.byte(0);
    out.byte(0x2c);
    out.word(0);
    out.word(0);
    out.word(width);
    out.word(height);
    out.byte(0);
    const minCodeSize = Math.max(2, bits);
    out.byte(minCodeSize);
    lzw(indices, minCodeSize, out);
  });
  out.byte(0x3b);
  return new Uint8Array(out.bytes);
}

export function quantize(imageData, palette) {
  const { data } = imageData;
  const indices = new Uint8Array(data.length / 4);
  const cache = new Map();
  for (let pixel = 0, offset = 0; pixel < indices.length; pixel++, offset += 4) {
    const key = (data[offset] << 16) | (data[offset + 1] << 8) | data[offset + 2];
    let index = cache.get(key);
    if (index === undefined) {
      let best = Infinity;
      for (let candidate = 0; candidate < palette.length; candidate++) {
        const [r, g, b] = palette[candidate];
        const distance = (r - data[offset]) ** 2 + (g - data[offset + 1]) ** 2 + (b - data[offset + 2]) ** 2;
        if (distance < best) {
          best = distance;
          index = candidate;
        }
      }
      cache.set(key, index);
    }
    indices[pixel] = index;
  }
  return indices;
}

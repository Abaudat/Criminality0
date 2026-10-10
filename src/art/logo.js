const EYE = `
  <g class="eye-lid">
    <path d="M60 14 C104 58 104 142 60 186 C16 142 16 58 60 14 Z" fill="none" stroke="currentColor" stroke-width="12" stroke-linejoin="round"/>
    <circle cx="60" cy="100" r="22" fill="currentColor"/>
    <circle cx="60" cy="100" r="9" fill="#06090a"/>
    <circle cx="52" cy="92" r="4" fill="#06090a"/>
  </g>`;

const PERCENT = `
  <g fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round">
    <circle cx="138" cy="58" r="22"/>
    <circle cx="198" cy="142" r="22"/>
    <path d="M206 30 L130 170"/>
  </g>`;

export function logoSvg({ word = true, className = 'logo', color = '#ff4438' } = {}) {
  const width = word ? 760 : 240;
  const wordmark = word
    ? `<text x="262" y="122" font-family="VT323, monospace" font-size="96" letter-spacing="6" fill="currentColor">CRIMINALITY</text>
       <text x="266" y="168" font-family="IBM Plex Mono, monospace" font-size="20" letter-spacing="7" fill="#8ff5c8" opacity="0.8">MINISTRY OF CIVIC HARMONY</text>
       <path d="M264 58 H740" stroke="currentColor" stroke-width="4"/>`
    : '';
  return `<svg class="${className}" viewBox="0 0 ${width} 200" style="color:${color}" role="img" aria-label="0% Criminality" xmlns="http://www.w3.org/2000/svg">${EYE}${PERCENT}${wordmark}</svg>`;
}

export function markSvg(color = '#ff4438') {
  return `<svg viewBox="0 0 240 200" style="color:${color}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${EYE}${PERCENT}</svg>`;
}

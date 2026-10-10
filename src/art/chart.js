import { PALETTE } from './palette.js';

export const CHART_SIZE = 480;

function eyeZero(context, x, y, scale, color) {
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(0, -12);
  context.bezierCurveTo(11, -5, 11, 5, 0, 12);
  context.bezierCurveTo(-11, 5, -11, -5, 0, -12);
  context.stroke();
  context.fillStyle = color;
  context.beginPath();
  context.arc(0, 0, 4.5, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

export function drawChart(context, data, progress) {
  const size = CHART_SIZE;
  context.imageSmoothingEnabled = false;
  context.fillStyle = PALETTE.void;
  context.fillRect(0, 0, size, size);
  context.textBaseline = 'alphabetic';

  context.fillStyle = PALETTE.red;
  context.font = '34px VT323, monospace';
  context.fillText('0% CRIMINALITY', 20, 38);
  context.fillStyle = PALETTE.dim;
  context.font = '20px VT323, monospace';
  context.textAlign = 'right';
  context.fillText(data.labels.assessment.toUpperCase(), size - 20, 38);
  context.textAlign = 'left';
  context.fillStyle = PALETTE.line;
  context.fillRect(20, 48, size - 40, 2);

  const left = 80;
  const top = 80;
  const span = 320;
  const half = span / 2;
  const quadrants = [
    [left, top, PALETTE.phos],
    [left + half, top, PALETTE.amber],
    [left, top + half, PALETTE.cyan],
    [left + half, top + half, PALETTE.red],
  ];
  for (const [x, y, color] of quadrants) {
    context.fillStyle = PALETTE.ink;
    context.fillRect(x, y, half, half);
    context.fillStyle = color;
    for (let py = y + 3; py < y + half; py += 6) for (let px = x + 3 + ((py / 6) % 2) * 3; px < x + half; px += 6) context.fillRect(px, py, 1, 1);
  }
  context.strokeStyle = PALETTE.line;
  context.lineWidth = 2;
  context.strokeRect(left, top, span, span);
  context.fillStyle = PALETTE.dim;
  context.fillRect(left + half - 1, top, 2, span);
  context.fillRect(left, top + half - 1, span, 2);

  context.font = '22px VT323, monospace';
  context.textAlign = 'center';
  context.fillStyle = PALETTE.bright;
  context.fillText(data.labels.lawful, left + half, top - 8);
  context.fillText(data.labels.chaotic, left + half, top + span + 22);
  context.save();
  context.translate(left - 14, top + half);
  context.rotate(-Math.PI / 2);
  context.fillText(data.labels.good, 0, 0);
  context.restore();
  context.save();
  context.translate(left + span + 14, top + half);
  context.rotate(Math.PI / 2);
  context.fillText(data.labels.evil, 0, 0);
  context.restore();
  context.textAlign = 'left';

  const toPoint = (pin) => [left + half + (pin.ge / data.range.ge) * -half, top + half + (pin.lc / data.range.lc) * -half];
  const path = data.path;
  const travel = Math.min(1, progress / 0.75) * (path.length - 1);
  const reached = Math.floor(travel);
  context.strokeStyle = PALETTE.bright;
  context.lineWidth = 2;
  context.setLineDash([4, 4]);
  context.beginPath();
  const points = path.map(toPoint);
  context.moveTo(...points[0]);
  for (let index = 1; index <= reached; index++) context.lineTo(...points[index]);
  let current = points[reached];
  if (reached < path.length - 1) {
    const fraction = travel - reached;
    const next = points[reached + 1];
    current = [current[0] + (next[0] - current[0]) * fraction, current[1] + (next[1] - current[1]) * fraction];
    context.lineTo(...current);
  }
  context.stroke();
  context.setLineDash([]);
  context.font = '16px VT323, monospace';
  for (let index = 1; index <= reached; index++) {
    context.fillStyle = PALETTE.bright;
    context.fillRect(points[index][0] - 2, points[index][1] - 2, 4, 4);
    if (path[index].month) {
      context.fillStyle = PALETTE.dim;
      context.fillText(String(path[index].month), points[index][0] + 4, points[index][1] - 4);
    }
  }
  const pulse = 1 + 0.15 * Math.sin(progress * 40);
  context.fillStyle = PALETTE.void;
  context.beginPath();
  context.arc(current[0], current[1], 15 * pulse, 0, Math.PI * 2);
  context.fill();
  eyeZero(context, current[0], current[1], 1.1 * pulse, PALETTE.red);

  context.fillStyle = PALETTE.phos;
  context.font = '24px VT323, monospace';
  context.fillText(data.name.toUpperCase(), 20, size - 34);
  context.fillStyle = PALETTE.dim;
  context.font = '18px VT323, monospace';
  context.fillText(data.statsLine, 20, size - 14);

  if (progress > 0.8) {
    const appear = Math.min(1, (progress - 0.8) / 0.08);
    const scale = 1 + (1 - appear) * 1.5;
    context.save();
    context.translate(left + half, top + half);
    context.rotate(-0.18);
    context.scale(scale, scale);
    let fontSize = 40;
    context.font = `${fontSize}px VT323, monospace`;
    while (context.measureText(data.title).width > 300 && fontSize > 20) {
      fontSize -= 2;
      context.font = `${fontSize}px VT323, monospace`;
    }
    const width = context.measureText(data.title).width + 28;
    context.fillStyle = PALETTE.void;
    context.fillRect(-width / 2, -fontSize * 0.65, width, fontSize * 1.15);
    context.strokeStyle = PALETTE.red;
    context.lineWidth = 4;
    context.strokeRect(-width / 2, -fontSize * 0.65, width, fontSize * 1.15);
    context.fillStyle = PALETTE.red;
    context.textAlign = 'center';
    context.fillText(data.title, 0, fontSize * 0.25);
    context.restore();
    context.textAlign = 'left';
  }
}

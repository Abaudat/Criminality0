import { h, icon } from './dom.js';
import { t, s, fill, formatNumber } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { alignmentPin, criminalityPercent } from '../core/game.js';
import { FORCED_RANGE } from '../core/campaign.js';
import { drawChart, CHART_SIZE } from '../art/chart.js';
import { encodeGif, quantize } from '../art/gif.js';
import { PALETTE_RGB } from '../art/palette.js';
import { toast } from './overlay.js';
import { sfx } from '../audio/sound.js';

const EPILOGUE_ROLES = ['shopkeeper', 'son', 'coworker', 'courier', 'hacker', 'nephew'];

function chartData(current) {
  const profile = store.getSave().profile;
  const totalDetained = current.history.reduce((sum, entry) => sum + entry.detained.length, 0);
  const innocents = current.history.reduce((sum, entry) => sum + entry.innocentsDetained, 0);
  const last = current.history.at(-1);
  return {
    path: [{ lc: 0, ge: 0 }, ...current.history.map((entry) => ({ ...alignmentPin(entry.alignment), month: entry.month }))],
    range: { lc: FORCED_RANGE.lc + 1, ge: FORCED_RANGE.ge + 1 },
    labels: { assessment: t('ending.assessment'), lawful: t('ending.lawful'), chaotic: t('ending.chaotic'), good: t('ending.good'), evil: t('ending.evil') },
    name: `${profile.first} ${profile.last}`,
    title: s(`endings.${current.outcome.quadrant}.title`),
    statsLine: `${t('ending.detainedTotal')} ${formatNumber(totalDetained)} · ${t('ending.innocentsTotal')} ${formatNumber(innocents)} · ${criminalityPercent(last.atLarge)}%`,
  };
}

async function shareGif(data, button) {
  button.disabled = true;
  const label = button.textContent;
  button.textContent = t('ending.rendering');
  await new Promise((resolve) => setTimeout(resolve, 30));
  const canvas = document.createElement('canvas');
  canvas.width = CHART_SIZE;
  canvas.height = CHART_SIZE;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const frames = [];
  const delays = [];
  const count = 44;
  for (let index = 0; index < count; index++) {
    drawChart(context, data, index / (count - 1));
    frames.push(quantize(context.getImageData(0, 0, CHART_SIZE, CHART_SIZE), PALETTE_RGB));
    delays.push(index === count - 1 ? 400 : 7);
    if (index % 6 === 0) await new Promise((resolve) => setTimeout(resolve, 0));
  }
  const bytes = encodeGif(CHART_SIZE, CHART_SIZE, frames, PALETTE_RGB, delays);
  const file = new File([bytes], '0-percent-criminality.gif', { type: 'image/gif' });
  button.disabled = false;
  button.textContent = label;
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: '0% Criminality', text: `${data.title} — 0% Criminality`, url: location.href });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  const link = h('a', { href: URL.createObjectURL(file), download: file.name });
  document.body.append(link);
  link.click();
  link.remove();
  toast(t('ending.downloaded'));
}

export function createEnding(app) {
  const current = store.state();
  const outcome = current.outcome;
  const profile = store.getSave().profile;
  const vars = { first: profile.first, last: profile.last };

  if (outcome.kind === 'failure') {
    const last = current.history.at(-1);
    const text = s(`failures.${outcome.reason}`);
    const failureVars = { ...vars, unrest: Math.round(current.unrest), atLarge: formatNumber(outcome.atLarge ?? 0), pct: criminalityPercent(last.atLarge) };
    return {
      element: h('section.ending.failure', null,
        h('div', null,
          h('h1', null, text.title),
          h('div.body', null, text.body.map((line) => h('p', null, fill(line, failureVars))), outcome.reason === 'selfFlagged' ? h('p.red', null, text[outcome.verdict === 'watch' ? 'watch' : 'detain']) : null),
          h('div.actions', null,
            h('button.btn.primary', { onclick: () => store.restartFrom(outcome.month) || app.play() }, t('failure.restartMonth', { month: outcome.month })),
            h('button.btn', { onclick: () => app.show('title') }, t('failure.toTitle'))))),
      mounted: () => sfx.alarm(),
    };
  }

  const data = chartData(current);
  const canvas = h('canvas.chart', { width: CHART_SIZE, height: CHART_SIZE });
  const ending = s(`endings.${outcome.quadrant}`);
  const sisterJailed = current.jailed[world.roles.sister] > 0;
  const epilogue = [
    h('p', null, s(`epilogue.sister.${outcome.quadrant}`)[sisterJailed ? 1 : 0]),
    ...EPILOGUE_ROLES.map((role) => h('p', null, s(`epilogue.${role}`)[current.jailed[world.roles[role]] ? 1 : 0])),
  ];
  const shareButton = h('button.btn.primary', { onclick: () => shareGif(data, shareButton) }, icon('share'), t('ending.share'));
  let frame = 0;
  let handle = 0;

  const element = h('section.ending', null,
    h('div', null, canvas, h('div.actions', null, shareButton)),
    h('div', null,
      h('h1', null, ending.title),
      h('div.body', null, ending.body.map((line) => h('p', null, fill(line, vars)))),
      h('h2.section', null, t('ending.epilogue')),
      h('div.epilogue', null, epilogue),
      h('div.actions', null,
        h('button.btn', { onclick: () => { store.abandonCareer(); app.show('idcard'); } }, t('ending.newCareer')),
        h('button.btn', { onclick: () => app.show('title') }, t('ending.toTitle')))));

  return {
    element,
    mounted() {
      const context = canvas.getContext('2d');
      const total = 150;
      let stamped = false;
      const step = () => {
        frame = Math.min(total, frame + 1);
        drawChart(context, data, frame / total);
        if (!stamped && frame / total > 0.8) {
          stamped = true;
          sfx.stamp();
        }
        if (frame < total) handle = requestAnimationFrame(step);
      };
      step();
      sfx.chime();
    },
    destroy() {
      cancelAnimationFrame(handle);
    },
  };
}

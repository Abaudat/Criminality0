import { h, replace } from './dom.js';
import { t } from './i18n.js';
import * as store from './store.js';
import { sfx } from '../audio/sound.js';

const firstRule = () => store.draft().rules[0];
const fits = () => {
  const result = store.monthResult();
  const rule = firstRule();
  return Boolean(rule) && rule.blocks.length > 1 && rule.blocks.every((block) => block.type !== 'field' || block.values.length) && result.watched > 0 && !result.overCap;
};
const districtBlock = () => firstRule()?.blocks.find((block) => block.field === 'district');

const STEPS = [
  { key: 'welcome' },
  { key: 'criminality', target: '[data-tour="criminality"]' },
  { key: 'unrest', target: '[data-tour="unrest"]' },
  { key: 'watch', target: '[data-tour="watch"]' },
  { key: 'you', target: '[data-tour="you"]' },
  { key: 'phases', target: '.nav' },
  { key: 'openShift', target: '[data-tour="nav-shift"]', done: () => store.draft().phase === 'shift' },
  { key: 'openReports', target: '[data-tour="tab-blotter"]', done: () => visible('.blotter-wrap') },
  { key: 'reports', target: '.blotter-wrap' },
  { key: 'database', target: '[data-tour="tab-database"]' },
  { key: 'openRules', target: '[data-tour="tab-rules"]', done: () => visible('.rules-pane') },
  { key: 'newRule', target: '.rule-card.empty .btn', done: () => Boolean(firstRule()) },
  { key: 'addDistrict', target: '[data-tour="add-district"]', done: () => Boolean(districtBlock()) },
  { key: 'pickStack9', target: '[data-tour="value-district-stack9"]', done: () => districtBlock()?.values.includes('stack9') },
  { key: 'verdicts', target: '.rule-card header' },
  { key: 'narrow', target: '.rule-card:not(.empty)', done: () => fits() },
  { key: 'validate', target: '.btn.validate', done: () => store.draft().validated },
  { key: 'home', target: '[data-tour="nav-home"]' },
];

function visible(selector) {
  return [...document.querySelectorAll(selector)].some((element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

function findTarget(selector) {
  if (!selector) return null;
  for (const element of document.querySelectorAll(selector)) {
    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) return rect;
  }
  return null;
}

export function shouldRunTutorial() {
  const save = store.getSave();
  return !save.tutorial && store.state().month === 1 && !store.draft().validated;
}

export function runTutorial() {
  let index = 0;
  let frame = 0;
  let shownIndex = -1;
  const spot = h('div.tour-spot');
  const text = h('p.tour-text');
  const progress = h('span.tour-progress');
  const next = h('button.btn.primary.small', { onclick: () => advance() }, t('tutorial.next'));
  const waiting = h('span.tour-waiting', null, t('tutorial.yourTurn'));
  const skip = h('button.btn.ghost.small', { onclick: () => finish() }, t('tutorial.skip'));
  const bubble = h('div.tour-bubble', { role: 'dialog', 'aria-live': 'polite' }, h('div.tour-head', null, h('b', null, t('tutorial.title')), progress), text, h('div.tour-actions', null, skip, h('span.grow'), waiting, next));
  const root = h('div.tour', null, spot, bubble);
  document.body.append(root);

  function finish() {
    cancelAnimationFrame(frame);
    root.remove();
    store.setTransient((data) => (data.tutorial = true), 'ui');
  }

  function advance() {
    sfx.click();
    index++;
    if (index >= STEPS.length) finish();
  }

  function render(step) {
    shownIndex = index;
    replace(text, t(`tutorial.steps.${step.key}`));
    progress.textContent = `${index + 1}/${STEPS.length}`;
    next.hidden = Boolean(step.done);
    waiting.hidden = !step.done;
    next.textContent = index === STEPS.length - 1 ? t('tutorial.finish') : t('tutorial.next');
    bubble.classList.remove('pop');
    void bubble.offsetWidth;
    bubble.classList.add('pop');
    if (!step.done) next.focus({ preventScroll: true });
  }

  function place(rect) {
    const margin = 10;
    const width = bubble.offsetWidth;
    const height = bubble.offsetHeight;
    if (!rect) {
      spot.style.opacity = '0';
      root.classList.add('dim');
      bubble.style.left = `${(window.innerWidth - width) / 2}px`;
      bubble.style.top = `${(window.innerHeight - height) / 2}px`;
      return;
    }
    root.classList.remove('dim');
    spot.style.opacity = '1';
    spot.style.left = `${rect.left - 4}px`;
    spot.style.top = `${rect.top - 4}px`;
    spot.style.width = `${rect.width + 8}px`;
    spot.style.height = `${rect.height + 8}px`;
    const fitsX = (left) => left >= margin && left + width <= window.innerWidth - margin;
    const fitsY = (top) => top >= margin && top + height <= window.innerHeight - margin;
    const clampX = (left) => Math.min(window.innerWidth - width - margin, Math.max(margin, left));
    const clampY = (top) => Math.min(window.innerHeight - height - margin, Math.max(margin, top));
    const middleY = clampY(rect.top + rect.height / 2 - height / 2);
    const middleX = clampX(rect.left + rect.width / 2 - width / 2);
    const options = [
      [rect.right + margin, middleY, fitsX(rect.right + margin)],
      [middleX, rect.bottom + margin, fitsY(rect.bottom + margin)],
      [middleX, rect.top - height - margin, fitsY(rect.top - height - margin)],
      [rect.left - width - margin, middleY, fitsX(rect.left - width - margin)],
    ];
    const [left, top] = options.find((option) => option[2]) ?? [clampX(rect.left), clampY(rect.bottom + margin)];
    bubble.style.left = `${left}px`;
    bubble.style.top = `${top}px`;
  }

  function loop() {
    if (!root.isConnected) return;
    if (store.state().month !== 1 || store.getSave().tutorial) {
      finish();
      return;
    }
    let step = STEPS[index];
    while (step?.done && step.done()) {
      index++;
      sfx.toggle();
      step = STEPS[index];
    }
    if (!step) {
      finish();
      return;
    }
    if (shownIndex !== index) render(step);
    root.classList.toggle('light', Boolean(step.done));
    const blocked = document.querySelector('.overlay, .scene-overlay, .transition');
    root.hidden = Boolean(blocked);
    if (!blocked) place(findTarget(step.target));
    frame = requestAnimationFrame(loop);
  }
  frame = requestAnimationFrame(loop);
  return finish;
}

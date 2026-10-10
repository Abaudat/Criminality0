import { h } from './dom.js';
import { t, formatNumber } from './i18n.js';
import { createCityFeed } from '../art/city.js';
import { sfx } from '../audio/sound.js';

function counter(labelText, from, to, className, max) {
  const value = h('b', null, formatNumber(from));
  const delta = h('span.delta', null, '');
  const fill = h('i', { style: { width: `${Math.min(100, (from / max) * 100)}%` } });
  const root = h(`div.counter.${className}`, null, h('span.label', null, labelText), h('div.counter-value', null, value, delta), h('div.track', null, fill));
  return {
    root,
    run(duration) {
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * eased);
        value.textContent = formatNumber(current);
        fill.style.width = `${Math.min(100, (current / max) * 100)}%`;
        if (progress < 1 && root.isConnected) requestAnimationFrame(step);
        else {
          const change = Math.round(to) - Math.round(from);
          delta.textContent = change ? ` ${change > 0 ? '+' : '−'}${formatNumber(Math.abs(change))}` : '';
          root.classList.add('settled');
        }
      };
      requestAnimationFrame(step);
    },
  };
}

export function playTransition({ month, last, outcome, before }) {
  return new Promise((resolve) => {
    const canvas = h('canvas');
    const feed = createCityFeed(canvas, { seed: month * 13, label: `CAM ${String(month).padStart(2, '0')} · CALDER` });
    const tally = h('div.tally', null,
      h('span.amber', null, t('transition.caught', { n: formatNumber(last.caught.length) })),
      h('span.red', null, t('transition.detained', { n: formatNumber(last.detained.length) })));
    const stamp = h('div.stamp', { style: { display: 'inline-block', marginTop: '1.4rem', opacity: 0 } }, t('transition.verdicts'));
    const atLarge = counter(t('transition.atLarge'), before.atLarge, last.atLarge, 'large', Math.max(before.atLarge, 1));
    const unrest = counter(t('transition.unrest'), Math.round(before.unrest), Math.round(last.unrest), 'unrest', 100);
    const counters = h('div.counters', null, atLarge.root, unrest.root);
    const label = outcome ? '—' : t('transition.month', { month });
    const overlay = h('div.transition', { style: { position: 'fixed', inset: 0, zIndex: 80 } },
      canvas,
      h('div.calendar', null,
        h('div.big', null, label),
        h('div.sub', null, outcome ? '' : t('transition.of')),
        tally,
        counters,
        stamp,
      ),
    );
    document.body.append(overlay);
    feed.start();
    setTimeout(() => {
      atLarge.run(1500);
      unrest.run(1500);
      sfx.chime();
    }, 450);
    setTimeout(() => {
      stamp.classList.add('slam');
      stamp.style.opacity = '';
      sfx.stamp();
    }, 2100);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      feed.stop();
      overlay.remove();
      resolve();
    };
    setTimeout(finish, 3900);
    overlay.addEventListener('click', finish);
  });
}

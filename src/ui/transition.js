import { h } from './dom.js';
import { t, formatNumber } from './i18n.js';
import { createCityFeed } from '../art/city.js';
import { sfx } from '../audio/sound.js';

export function playTransition({ month, last, outcome }) {
  return new Promise((resolve) => {
    const canvas = h('canvas');
    const feed = createCityFeed(canvas, { seed: month * 13, label: `CAM ${String(month).padStart(2, '0')} · CALDER` });
    const tally = h('div.tally', null,
      h('span.amber', null, t('transition.caught', { n: formatNumber(last.caught.length) })),
      h('span.red', null, t('transition.detained', { n: formatNumber(last.detained.length) })));
    const stamp = h('div.stamp', { style: { display: 'inline-block', marginTop: '1rem', opacity: 0 } }, t('transition.verdicts'));
    const label = outcome ? '—' : t('transition.month', { month });
    const overlay = h('div.transition', { style: { position: 'fixed', inset: 0, zIndex: 80 } },
      canvas,
      h('div.calendar', null,
        h('div.big', null, label),
        h('div.sub', null, outcome ? '' : t('transition.of')),
        tally,
        stamp,
      ),
    );
    document.body.append(overlay);
    feed.start();
    setTimeout(() => {
      stamp.classList.add('slam');
      stamp.style.opacity = '';
      sfx.stamp();
    }, 500);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      feed.stop();
      overlay.remove();
      resolve();
    };
    setTimeout(finish, 2600);
    overlay.addEventListener('click', finish);
  });
}

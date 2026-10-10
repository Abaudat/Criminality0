import { h } from './dom.js';
import { t } from './i18n.js';
import { newCareer } from './store.js';
import { CAST_BY_ROLE } from '../core/cast.js';
import { portraitUrl } from '../art/portrait.js';
import { hashSeed } from '../core/random.js';
import { sfx } from '../audio/sound.js';

export function createIdCard(app) {
  const player = CAST_BY_ROLE.player;
  const first = h('input', { value: player.first, maxLength: 18, autocomplete: 'off', spellcheck: false, 'aria-label': t('idcard.first') });
  const last = h('input', { value: player.last, maxLength: 18, autocomplete: 'off', spellcheck: false, 'aria-label': t('idcard.last') });
  const photo = h('img.portrait', { alt: '' });
  const refreshPhoto = () => {
    photo.src = portraitUrl({ seed: hashSeed('player', first.value.trim()), sex: 'm', age: 1, medical: 'none', occupation: 'state' }, 'paper');
  };
  refreshPhoto();
  first.addEventListener('input', () => {
    sfx.key();
    refreshPhoto();
  });
  last.addEventListener('input', () => sfx.key());

  const card = h('form.idcard', {
    onsubmit: (event) => {
      event.preventDefault();
      const profile = { first: first.value.trim() || player.first, last: last.value.trim() || player.last };
      card.append(h('div.stamp.slam', null, t('idcard.approved')));
      sfx.stamp();
      newCareer(profile);
      setTimeout(() => app.play(), 700);
    },
  },
    h('header', null, h('strong', null, t('brand.ministry')), h('span', null, t('idcard.heading'))),
    photo,
    h('div', null,
      h('label', null, t('idcard.first')), first,
      h('label', null, t('idcard.last')), last,
      h('label', null, t('idcard.role')),
      h('div', null, t('idcard.clearance')),
    ),
    h('p.fineprint', null, t('idcard.note')),
    h('div', { style: { gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' } }, h('button.btn.primary', { type: 'submit' }, t('idcard.sign'))),
  );

  return {
    element: h('section.idcard-screen', null, card),
    mounted() {
      first.focus();
      first.select();
    },
    onEscape() {
      app.show('title');
    },
  };
}

import { h, icon } from './dom.js';
import { t } from './i18n.js';
import { getSave, setTransient } from './store.js';
import { modal } from './overlay.js';
import { setSoundEnabled, setVolume, setMusicVolume, initAudio, sfx } from '../audio/sound.js';

export function applySoundSettings() {
  const save = getSave();
  setVolume(save.volume);
  setMusicVolume(save.music);
  setSoundEnabled(save.sound);
}

function slider(labelKey, key, apply) {
  const value = h('b', null, `${Math.round(getSave()[key] * 100)}%`);
  const input = h('input', { type: 'range', min: 0, max: 100, step: 5, value: Math.round(getSave()[key] * 100), 'aria-label': t(labelKey) });
  input.addEventListener('input', () => {
    const level = Number(input.value) / 100;
    value.textContent = `${input.value}%`;
    setTransient((data) => (data[key] = level), 'sound');
    apply(level);
  });
  input.addEventListener('change', () => sfx.chime());
  return h('label.slider-row', null, h('span', null, t(labelKey)), input, value);
}

export function openSoundSettings(onChange) {
  initAudio();
  modal((box) => {
    const mute = h('button.btn', {
      onclick: () => {
        const next = !getSave().sound;
        setTransient((data) => (data.sound = next), 'sound');
        setSoundEnabled(next);
        render();
        onChange?.();
      },
    });
    const render = () => {
      mute.replaceChildren(icon(getSave().sound ? 'sound' : 'mute'), ' ', t(getSave().sound ? 'sound.mute' : 'sound.unmute'));
    };
    render();
    box.append(
      h('h2', null, t('sound.title')),
      h('div.sound-settings', null,
        slider('sound.volume', 'volume', setVolume),
        slider('sound.music', 'music', setMusicVolume),
        mute),
    );
  });
}

import { h, icon, append } from './dom.js';
import { t, LANGUAGES, loadLanguage, language } from './i18n.js';
import { getSave, hasCareer, setTransient, state as gameState, abandonCareer } from './store.js';
import { createCityFeed } from '../art/city.js';
import { logoSvg } from '../art/logo.js';
import { modal, confirmModal } from './overlay.js';
import { sfx } from '../audio/sound.js';
import { openSoundSettings } from './soundSettings.js';

let booted = false;

export function createTitle(app, options) {
  const canvas = h('canvas.feed');
  const feed = createCityFeed(canvas, { label: 'CAM 01 · CIVIC PLAZA', seed: 11 });
  const save = getSave();
  const boot = h('div.boot');
  const menu = h('nav.title-menu');

  if (hasCareer()) {
    const current = gameState();
    append(menu, [
      h('button.btn.primary', { onclick: () => { sfx.click(); app.play(); } },
        h('span', null, t('title.continue')),
        h('span.small', { style: { opacity: 0.75, textTransform: 'none' } }, current.outcome ? t('ending.assessment') : t('title.continueDetail', { month: current.month, name: `${save.profile.first} ${save.profile.last}` }))),
    ]);
  }
  append(menu, [
    h('button.btn' + (hasCareer() ? '' : '.primary'), {
      onclick: async () => {
        sfx.click();
        if (hasCareer() && !(await confirmModal(t('title.confirmNew'), t('title.confirm'), t('title.cancel')))) return;
        if (hasCareer()) abandonCareer();
        app.show('idcard');
      },
    }, t('title.newGame')),
    h('div.title-row', null,
      h('button.btn', { onclick: () => openLanguages(app) }, t('title.language'), ' · ', LANGUAGES.find((entry) => entry.code === language()).name),
      h('button.btn', { onclick: () => openSoundSettings(() => app.show('title')) }, icon(save.sound ? 'sound' : 'mute'), t('title.sound'), ' · ', save.sound ? `${Math.round(save.volume * 100)}%` : t('title.off')),
      h('button.btn', { onclick: () => openCredits() }, t('title.credits')),
    ),
    save.endings.length ? h('p.small.dim', { style: { textAlign: 'center', margin: 0 } }, t('title.endingsFound', { n: save.endings.length })) : null,
  ]);

  const element = h('section.title-screen', null,
    canvas,
    h('div.title-card', null,
      h('div', { html: logoSvg() }),
      h('p.title-tagline', null, t('brand.tagline')),
      boot,
      menu,
    ),
  );

  return {
    element,
    mounted() {
      feed.start();
      const lines = t('boot');
      if (booted || !options.boot) {
        boot.textContent = lines.join('\n');
        return;
      }
      booted = true;
      let line = 0;
      let character = 0;
      let text = '';
      const type = () => {
        if (!element.isConnected || line >= lines.length) {
          boot.textContent = lines.join('\n');
          return;
        }
        text += lines[line][character] ?? '';
        character++;
        if (character > lines[line].length) {
          line++;
          character = 0;
          text += '\n';
        }
        boot.textContent = text;
        boot.append(h('span.cursor', null, '█'));
        setTimeout(type, character === 0 ? 120 : 14);
      };
      type();
    },
    destroy() {
      feed.stop();
    },
  };
}

function openLanguages(app) {
  modal((box, close) => {
    box.append(
      h('h2', null, t('title.language')),
      h('div.lang-grid', null, LANGUAGES.map((entry) =>
        h('button.btn' + (entry.code === language() ? '.primary' : ''), {
          lang: entry.code,
          onclick: async () => {
            await loadLanguage(entry.code);
            setTransient((data) => (data.lang = entry.code), 'lang');
            close();
            app.show('title');
          },
        }, entry.name))),
    );
  });
}

function openCredits() {
  modal((box) => {
    box.append(h('h2', null, t('credits.title')), ...t('credits.lines').map((line) => h('p', null, line)));
  });
}

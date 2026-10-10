import { loadLanguage, detectLanguage } from './ui/i18n.js';
import { getSave, setTransient, flush } from './ui/store.js';
import { startApp } from './ui/app.js';
import { setSoundEnabled } from './audio/sound.js';

async function boot() {
  const save = getSave();
  const code = await loadLanguage(save.lang ?? detectLanguage());
  if (save.lang !== code) setTransient((data) => (data.lang = code), 'lang');
  setSoundEnabled(save.sound);
  await document.fonts?.ready;
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => document.hidden && flush());
  startApp(document.getElementById('app'));
}

boot();

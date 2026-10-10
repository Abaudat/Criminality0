import { clear } from './dom.js';
import { state as gameState, undo, redo } from './store.js';
import { closeTopModal, hasModal } from './overlay.js';
import { initAudio } from '../audio/sound.js';
import { createTitle } from './title.js';
import { createIdCard } from './idcard.js';
import { createDesk } from './desk.js';
import { createEnding } from './ending.js';

export function startApp(root) {
  let current = null;

  const app = {
    show(name, options = {}) {
      current?.destroy?.();
      clear(root);
      const factories = { title: createTitle, idcard: createIdCard, desk: createDesk, ending: createEnding };
      current = factories[name](app, options);
      current.name = name;
      root.append(current.element);
      current.mounted?.();
    },
    play() {
      app.show(gameState().outcome ? 'ending' : 'desk');
    },
    current: () => current,
  };

  window.addEventListener('pointerdown', initAudio, { capture: true });
  window.addEventListener('keydown', (event) => {
    initAudio();
    const typing = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
    if (event.key === 'Escape') {
      if (closeTopModal()) return;
      current?.onEscape?.();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && !typing && current?.name === 'desk' && !hasModal()) {
      const key = event.key.toLowerCase();
      if (key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (key === 'y' || (key === 'z' && event.shiftKey)) {
        event.preventDefault();
        redo();
      }
      return;
    }
    if (!typing && !hasModal()) current?.onKey?.(event);
  });

  app.show('title', { boot: true });
  return app;
}


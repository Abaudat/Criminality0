import { h, icon } from './dom.js';
import { sfx } from '../audio/sound.js';

const openModals = [];

export function toast(text) {
  const element = h('div.toast', { role: 'status' }, text);
  document.body.append(element);
  setTimeout(() => element.remove(), 2700);
}

export function modal(build, { className = '', onClose } = {}) {
  const overlay = h('div.overlay');
  const box = h(`div.modal${className ? '.' + className : ''}`, { role: 'dialog', 'aria-modal': 'true' });
  const close = () => {
    if (!overlay.isConnected) return;
    overlay.remove();
    openModals.splice(openModals.indexOf(close), 1);
    sfx.close();
    onClose?.();
  };
  box.append(h('button.btn.ghost.icon-only.close', { onclick: close, 'aria-label': 'Close' }, icon('close')));
  build(box, close);
  overlay.append(box);
  overlay.addEventListener('pointerdown', (event) => {
    if (event.target === overlay) close();
  });
  document.body.append(overlay);
  openModals.push(close);
  sfx.open();
  box.querySelector('button:not(.close), input')?.focus();
  return close;
}

export function closeTopModal() {
  const close = openModals.at(-1);
  if (close) {
    close();
    return true;
  }
  return false;
}

export function hasModal() {
  return openModals.length > 0 || Boolean(document.querySelector('.scene-overlay'));
}

export function confirmModal(text, confirmLabel, cancelLabel) {
  return new Promise((resolve) => {
    let answered = false;
    modal(
      (box, close) => {
        box.append(
          h('p', null, text),
          h(
            'div.title-row',
            null,
            h('button.btn.danger', { onclick: () => { answered = true; resolve(true); close(); } }, confirmLabel),
            h('button.btn', { onclick: () => close() }, cancelLabel),
          ),
        );
      },
      { onClose: () => !answered && resolve(false) },
    );
  });
}

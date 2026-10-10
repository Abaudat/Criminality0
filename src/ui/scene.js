import { h, replace } from './dom.js';
import { s, t, fill } from './i18n.js';
import { world, getSave } from './store.js';
import { portraitOf } from './citizen.js';
import { portraitUrl } from '../art/portrait.js';
import { hashSeed } from '../core/random.js';
import { markSvg } from '../art/logo.js';
import { sfx } from '../audio/sound.js';

const PHONE_SPEAKERS = new Set(['sister']);

function speakerPortrait(speaker) {
  const roles = world.roles;
  if (speaker === 'crane') return h('img', { src: portraitUrl({ seed: hashSeed('crane'), sex: 'f', age: 2, medical: 'none', occupation: 'state' }), alt: '' });
  if (speaker === 'moth') return h('img', { src: portraitOf(roles.hacker, 'alert'), alt: '' });
  if (speaker === 'system') return h('div', { html: markSvg(), style: { width: '9rem' } });
  return h('img', { src: portraitOf(roles[speaker]), alt: '' });
}

function playScene(id, vars, onSeen) {
  return new Promise((resolve) => {
    const scene = s(`scenes.${id}`);
    const lines = scene.lines;
    const overlay = h('div.scene-overlay' + (scene.glitch ? '.glitch' : ''), { role: 'dialog', 'aria-modal': 'true' });
    const portrait = h('div');
    const speakerName = h('div.speaker');
    const callTag = h('div.call');
    const text = h('div.text', { 'aria-live': 'polite' });
    const controls = h('div.controls');
    const box = h('div.scene-box', null, portrait, h('div', null, callTag, speakerName, text, controls));
    overlay.append(box);
    document.body.append(overlay);
    if (scene.glitch) {
      const flash = h('div.glitch-flash');
      document.body.append(flash);
      setTimeout(() => flash.remove(), 1300);
      sfx.glitch();
    } else if (PHONE_SPEAKERS.has(lines[0][0])) sfx.ring();
    else sfx.open();

    let index = -1;
    let typing = null;
    let full = '';
    let currentSpeaker = null;

    const finish = (reply) => {
      overlay.remove();
      window.removeEventListener('keydown', onKey, true);
      onSeen(id, reply);
      resolve();
    };

    const type = (content, done) => {
      full = content;
      let position = 0;
      text.textContent = '';
      clearInterval(typing);
      typing = setInterval(() => {
        position += 2;
        text.textContent = full.slice(0, position);
        if (position % 6 === 0) sfx.key();
        if (position >= full.length) {
          clearInterval(typing);
          typing = null;
          done?.();
        }
      }, 22);
    };

    const showSpeaker = (speaker) => {
      if (speaker === currentSpeaker) return;
      currentSpeaker = speaker;
      replace(portrait, speakerPortrait(speaker));
      speakerName.textContent = s(`speakers.${speaker}`);
      callTag.textContent = PHONE_SPEAKERS.has(speaker) ? '☎ ' + t('scene.reply').toUpperCase() : '';
    };

    const showReplies = () => {
      replace(controls, scene.replies.map(([label, answer], replyIndex) =>
        h('button.btn', {
          onclick: () => {
            sfx.click();
            showSpeaker(lines.at(-1)[0]);
            type(fill(answer, vars));
            replace(controls, h('button.btn.primary', { onclick: () => finish(replyIndex) }, t('scene.next')));
            controls.querySelector('button').focus();
          },
        }, fill(label, vars))));
      controls.querySelector('button')?.focus();
    };

    const advance = () => {
      if (typing) {
        clearInterval(typing);
        typing = null;
        text.textContent = full;
        if (index === lines.length - 1 && scene.replies) showReplies();
        return;
      }
      if (index === lines.length - 1) {
        if (!scene.replies) finish();
        return;
      }
      index++;
      const [speaker, line] = lines[index];
      showSpeaker(speaker);
      const last = index === lines.length - 1;
      type(fill(line, vars), () => last && scene.replies && showReplies());
      replace(controls,
        h('button.btn.ghost.small', { onclick: (event) => { event.stopPropagation(); finish(); } }, t('scene.skip')),
        h('button.btn.primary', { onclick: (event) => { event.stopPropagation(); advance(); } }, t('scene.next')));
      controls.lastChild.focus();
    };

    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (document.activeElement?.closest('.controls') && !typing) return;
        event.preventDefault();
        event.stopPropagation();
        advance();
      }
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (!scene.replies) finish();
      }
    };
    window.addEventListener('keydown', onKey, true);
    box.addEventListener('click', (event) => {
      if (!event.target.closest('button')) advance();
    });
    advance();
  });
}

export async function playScenes(ids, { vars = {}, onSeen }) {
  const profile = getSave().profile ?? {};
  const merged = { first: profile.first, last: profile.last, ...vars };
  for (const id of ids) await playScene(id, merged, onSeen);
}

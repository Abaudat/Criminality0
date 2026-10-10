import { h, icon, replace } from './dom.js';
import { t, s, formatNumber } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { modal, toast, confirmModal } from './overlay.js';
import { markSvg } from '../art/logo.js';
import { createCityFeed } from '../art/city.js';
import { VERDICTS } from '../core/rules.js';
import { criminalsAtLarge, criminalityPercent } from '../core/game.js';
import { scenesFor, newsFor, inboxFor } from '../core/story.js';
import { slotsFor } from '../core/campaign.js';
import { setSoundEnabled, sfx } from '../audio/sound.js';
import { createBriefing } from './briefing.js';
import { createInbox } from './inbox.js';
import { createShift } from './shift.js';
import { createHome } from './home.js';
import { openDossier } from './dossier.js';
import { playScenes } from './scene.js';
import { playTransition } from './transition.js';

const PHASES = ['briefing', 'inbox', 'shift', 'home'];
const PANELS = { briefing: createBriefing, inbox: createInbox, shift: createShift, home: createHome };

export function atLargeNow(state) {
  return state.history.at(-1)?.atLarge ?? criminalsAtLarge(world, state, 1);
}

export function createDesk(app) {
  const metrics = {
    month: metric('top.month'),
    criminality: metric('top.criminality', true),
    unrest: metric('top.unrest', true),
    watch: metric('top.watch', true),
    you: metric('top.you'),
  };
  metrics.criminality.root.title = t('top.goal');
  const undoButton = h('button.btn.ghost.icon-only', { title: t('top.undo'), 'aria-label': t('top.undo'), onclick: () => store.undo() }, icon('undo'));
  const redoButton = h('button.btn.ghost.icon-only', { title: t('top.redo'), 'aria-label': t('top.redo'), onclick: () => store.redo() }, icon('redo'));
  const soundButton = h('button.btn.ghost.icon-only', {
    title: t('top.sound'),
    'aria-label': t('top.sound'),
    onclick: () => {
      const next = !store.getSave().sound;
      store.setTransient((data) => (data.sound = next), 'sound');
      setSoundEnabled(next);
    },
  });
  const menuButton = h('button.btn.ghost.icon-only', { title: t('top.menu'), 'aria-label': t('top.menu'), onclick: () => openMenu() }, icon('menu'));
  const topbar = h('header.topbar', null,
    h('div.brand', { html: markSvg() }),
    metrics.month.root, metrics.criminality.root, metrics.unrest.root, metrics.watch.root, metrics.you.root,
    h('div.spacer'),
    h('div.tools', null, undoButton, redoButton, soundButton, menuButton),
  );
  metrics.you.root.classList.add('optional');

  const navButtons = Object.fromEntries(PHASES.map((phase, index) => [phase, h('button', { onclick: () => go(phase), 'aria-label': t(`phases.${phase}`) }, h('span.step', null, String(index + 1)), icon(phase), h('span', null, t(`phases.${phase}`)))]));
  const feedCanvas = h('canvas.feed-mini');
  const feed = createCityFeed(feedCanvas, { seed: 3, label: 'CAM 12' });
  const nav = h('nav.nav', null, ...Object.values(navButtons), feedCanvas);
  const main = h('main.main');
  const ticker = h('div.ticker', null, h('span.tag', null, t('ticker')), h('div', { style: { overflow: 'hidden', flex: 1 } }, h('div.crawl')));
  const element = h('section.desk', null, topbar, nav, main, ticker);

  let panel = null;
  let panelPhase = null;
  let tickerMonth = null;

  const ctx = {
    app,
    go,
    toast,
    openDossier: (id) => openDossier(ctx, id),
    addRule(rule) {
      const current = store.state();
      const rules = store.draft().rules;
      if (rules.length >= slotsFor(current.month)) {
        sfx.error();
        toast(t('inbox.noSlot'));
        return false;
      }
      store.edit((draft) => {
        draft.rules.push(rule);
        draft.validated = false;
      });
      sfx.toggle();
      toast(t('inbox.drafted', { n: store.draft().rules.length }));
      go('shift');
      return true;
    },
  };

  function metric(labelKey, withBar = false) {
    const value = h('span.value');
    const bar = withBar ? h('i') : null;
    const root = h('div.metric', null, h('span.label', null, t(labelKey)), value, withBar ? h('div.bar', null, bar) : null);
    return { root, value, bar };
  }

  function phaseAllowed(phase) {
    return phase !== 'home' || store.draft().validated;
  }

  function go(phase) {
    if (!phaseAllowed(phase)) {
      sfx.error();
      return;
    }
    if (store.draft().phase !== phase) store.setTransient((data) => (data.draft.phase = phase), 'phase');
    else showPanel();
  }

  function showPanel() {
    const phase = store.draft().phase;
    if (panelPhase === phase && panel) return;
    panel?.destroy?.();
    panelPhase = phase;
    panel = PANELS[phase](ctx);
    replace(main, panel.element);
    panel.mounted?.();
    sfx.click();
  }

  function refreshTop() {
    const current = store.state();
    const result = store.monthResult();
    const atLarge = atLargeNow(current);
    const percent = criminalityPercent(atLarge);
    metrics.month.value.textContent = `${current.month}/12`;
    metrics.criminality.value.textContent = `${percent}%`;
    metrics.criminality.bar.style.width = `${Math.min(100, (atLarge / 900) * 100)}%`;
    metrics.criminality.root.classList.toggle('warn', percent > 0);
    metrics.unrest.value.textContent = formatNumber(Math.round(current.unrest));
    metrics.unrest.bar.style.width = `${Math.min(100, current.unrest)}%`;
    metrics.unrest.root.classList.toggle('alert', current.unrest >= 60);
    metrics.unrest.root.classList.toggle('warn', current.unrest >= 30 && current.unrest < 60);
    if (result) {
      metrics.watch.value.textContent = `${formatNumber(result.watched)}/${formatNumber(result.watchCap)}`;
      metrics.watch.bar.style.width = `${Math.min(100, (result.watched / result.watchCap) * 100)}%`;
      metrics.watch.root.classList.toggle('alert', result.overCap);
      const verdict = VERDICTS[result.playerVerdict];
      replace(metrics.you.value, h(`span.verdict.${verdict}`, null, t(`verdicts.${verdict}`)));
      feed.setMood({ watch: Math.min(0.5, (result.watched / 10000) * 6), detain: Math.min(0.4, (result.detained / 10000) * 6), unrest: current.unrest / 100 });
    }
    undoButton.disabled = !store.canUndo();
    redoButton.disabled = !store.canRedo();
    replace(soundButton, icon(store.getSave().sound ? 'sound' : 'mute'));
    if (tickerMonth !== current.month) {
      tickerMonth = current.month;
      const items = newsFor(current, current.month, criminalityPercent(atLarge)).map((item) => {
        const entry = typeof item.key === 'number' ? s(`news.${item.key}`)[item.index] : s(`news.${item.key}`);
        return h('span', null, `▲ ${entry[0].replace('{pct}', item.vars?.pct ?? '')}`);
      });
      replace(ticker.querySelector('.crawl'), items, items.map((item) => item.cloneNode(true)));
    }
  }

  function refreshNav() {
    const phase = store.draft().phase;
    for (const name of PHASES) {
      navButtons[name].classList.toggle('active', name === phase);
      navButtons[name].disabled = !phaseAllowed(name);
    }
    const current = store.state();
    const read = store.draft().read;
    const unread = inboxFor(world, current, current.month).filter((item) => !read.includes(item.id)).length;
    navButtons.inbox.querySelector('.badge')?.remove();
    if (unread) navButtons.inbox.append(h('span.badge', null, String(unread)));
  }

  function refreshAll(reason) {
    if (store.state().outcome) return;
    refreshTop();
    refreshNav();
    showPanel();
    panel?.refresh?.(reason);
  }

  async function startMonth() {
    const current = store.state();
    const seen = store.draft().seenScenes;
    const pending = scenesFor(world, current, current.month).filter((id) => !seen.includes(id));
    if (pending.length) {
      await playScenes(pending, {
        vars: { unrest: Math.round(current.unrest) },
        onSeen: (id, reply) =>
          store.setTransient((data) => {
            data.draft.seenScenes.push(id);
            if (reply !== undefined) data.draft.replies[id] = reply;
          }, 'scene'),
      });
    }
  }

  async function onStore(reason) {
    if (reason === 'commit') {
      const current = store.state();
      const last = current.history.at(-1);
      await playTransition({ month: current.outcome ? last.month : current.month, last, outcome: current.outcome });
      if (current.outcome) {
        app.show('ending');
        return;
      }
      tickerMonth = null;
      refreshAll(reason);
      startMonth();
      return;
    }
    if (reason === 'restart') {
      app.play();
      return;
    }
    refreshAll(reason);
  }

  function openMenu() {
    modal((box, close) => {
      const current = store.state();
      box.append(
        h('h2', null, t('menu.title')),
        h('div.menu-list', null,
          h('button.btn.primary', { onclick: close }, t('menu.resume')),
          h('button.btn', { onclick: () => { close(); openHelp(); } }, t('menu.help')),
          h('h3.small.dim', null, t('menu.timeline')),
          h('p.small.dim', { style: { margin: 0 } }, t('menu.timelineNote')),
          h('div.timeline', null, Array.from({ length: current.month }, (_, index) => index + 1).map((month) =>
            h('button.btn.small' + (month === current.month ? '.primary' : ''), {
              onclick: async () => {
                close();
                if (month !== current.month && !(await confirmModal(t('menu.timelineNote'), t('menu.restartMonth', { month }), t('title.cancel')))) return;
                store.restartFrom(month);
              },
            }, t('menu.restartMonth', { month }), month === current.month ? ` (${t('menu.current')})` : ''))),
          h('button.btn', { onclick: () => { close(); store.flush(); app.show('title'); } }, t('menu.toTitle')),
          h('p.small.dim', null, t('menu.saved')),
        ),
      );
    });
  }

  let unsubscribe = null;
  return {
    element,
    mounted() {
      unsubscribe = store.subscribe(onStore);
      feed.start();
      refreshAll('mount');
      startMonth();
    },
    destroy() {
      unsubscribe?.();
      feed.stop();
      panel?.destroy?.();
    },
    onEscape: openMenu,
    onKey(event) {
      const index = Number(event.key) - 1;
      if (index >= 0 && index < PHASES.length) go(PHASES[index]);
      if (event.key === '/') {
        const search = element.querySelector('.vt-search input');
        if (search) {
          event.preventDefault();
          search.focus();
        }
      }
      panel?.onKey?.(event);
    },
  };
}

export function openHelp() {
  modal((box) => {
    box.append(h('h2', null, t('help.title')), ...t('help.lines').map((line) => h('p', null, line)));
  });
}

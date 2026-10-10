import { h, replace } from './dom.js';
import { t } from './i18n.js';
import * as store from './store.js';
import { createRulesEditor } from './rulesEditor.js';
import { createDatabase } from './database.js';
import { createBlotter } from './blotterView.js';

const WORKSPACES = { database: createDatabase, blotter: createBlotter };

export function createShift(ctx) {
  const editor = createRulesEditor(ctx);
  const host = h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 } });
  const workspaceTabs = h('div.workspace-tabs');
  const shiftTabs = h('div.shift-tabs');
  const workspace = h('section.workspace', null, workspaceTabs, host);
  const root = h('div.shift', { 'data-view': 'rules' }, editor.element, workspace);
  const element = h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 } }, shiftTabs, root);
  let active = null;
  let activeName = null;
  let view = 'rules';

  function openWorkspace(name) {
    if (activeName === name && active) return;
    active?.destroy?.();
    activeName = name;
    active = WORKSPACES[name](ctx);
    replace(host, active.element);
    active.mounted?.();
    store.setTransient((data) => (data.ui.workspace = name), 'ui');
  }

  function renderTabs() {
    replace(workspaceTabs, Object.keys(WORKSPACES).map((name) => h('button' + (activeName === name ? '.active' : ''), { onclick: () => { openWorkspace(name); renderTabs(); } }, t(`shift.${name}`))));
    replace(shiftTabs, ['rules', ...Object.keys(WORKSPACES)].map((name) => h('button' + (view === name ? '.active' : ''), {
      onclick: () => {
        view = name;
        root.dataset.view = name;
        if (name !== 'rules') openWorkspace(name);
        renderTabs();
        active?.table?.redraw();
      },
    }, t(`shift.${name}`))));
  }

  return {
    element,
    mounted() {
      openWorkspace(store.getSave().ui.workspace ?? 'database');
      renderTabs();
      editor.refresh();
    },
    refresh(reason) {
      if (reason === 'ui' || reason === 'read' || reason === 'scene') return;
      editor.refresh();
      active?.refresh?.(reason);
    },
    destroy() {
      active?.destroy?.();
    },
  };
}

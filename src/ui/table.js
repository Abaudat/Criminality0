import { h, icon, replace } from './dom.js';
import { t, formatNumber } from './i18n.js';
import { sfx } from '../audio/sound.js';

const BUFFER_ROWS = 8;

export function createTable(options) {
  const { columns, rows, pinned, searchText, onClick, rowClass, onChange, footer } = options;
  const template = columns.map((column) => column.width).join(' ');
  const state = { sort: options.sort ?? null, filters: {}, query: '' };
  let visible = [];
  let searchCache = new Map();
  let rowHeight = 0;

  const input = h('input', { type: 'search', placeholder: t('table.search'), 'aria-label': t('table.search') });
  const count = h('span.vt-count');
  const resetButton = h('button.btn.small.ghost', { onclick: () => reset() }, t('table.reset'));
  const head = h('div.vt-head', { style: { gridTemplateColumns: template } });
  const pinnedRow = h('div.vt-row.pinned', { style: { gridTemplateColumns: template, position: 'sticky' } });
  const body = h('div', { style: { position: 'relative' } });
  const inner = h('div.vt-inner', null, head, pinned ? pinnedRow : null, body);
  const scroll = h('div.vt-scroll', null, inner);
  const empty = h('div.vt-empty', null, t('table.noResults'));
  const element = h('div.vt', null,
    h('div.vt-tools', null, h('label.vt-search', null, icon('search'), input), count, resetButton, options.tools ?? null),
    scroll,
    footer ? h('div.exempt', null, footer) : null);

  let searchTimer = 0;
  input.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = input.value.trim().toLowerCase();
      recompute();
    }, 30);
  });

  function textOf(id) {
    let text = searchCache.get(id);
    if (text === undefined) {
      text = searchText(id).toLowerCase();
      searchCache.set(id, text);
    }
    return text;
  }

  function recompute() {
    const tokens = state.query.split(/\s+/).filter(Boolean);
    const filterEntries = Object.entries(state.filters).filter(([, allowed]) => allowed);
    const filterColumns = filterEntries.map(([key, allowed]) => [columns.find((column) => column.key === key), allowed]);
    const result = [];
    for (const id of rows()) {
      let keep = true;
      for (const [column, allowed] of filterColumns) {
        if (!allowed.has(column.filterOf(id))) {
          keep = false;
          break;
        }
      }
      if (!keep) continue;
      if (tokens.length) {
        const text = textOf(id);
        for (const token of tokens) {
          if (!text.includes(token)) {
            keep = false;
            break;
          }
        }
      }
      if (keep) result.push(id);
    }
    if (state.sort) {
      const column = columns.find((entry) => entry.key === state.sort.key);
      const direction = state.sort.dir;
      const keys = new Map(result.map((id) => [id, column.sortValue(id)]));
      result.sort((a, b) => {
        const left = keys.get(a);
        const right = keys.get(b);
        return (left < right ? -1 : left > right ? 1 : a - b) * direction;
      });
    }
    visible = result;
    count.textContent = t('table.showing', { shown: formatNumber(visible.length), total: formatNumber(rows().length) });
    body.style.height = `${visible.length * measure()}px`;
    resetButton.disabled = !state.query && !filterEntries.length && !state.sort;
    renderHead();
    renderRows(true);
    onChange?.(visible);
  }

  function measure() {
    if (!rowHeight) {
      const probe = h('div.vt-row', null, h('div.cell', null, 'x'));
      body.append(probe);
      rowHeight = probe.getBoundingClientRect().height || 36;
      probe.remove();
    }
    return rowHeight;
  }

  function cellsFor(id) {
    return columns.map((column) => h('div.cell', { title: column.title?.(id) }, column.render(id)));
  }

  let lastRange = '';
  function renderRows(force) {
    const height = measure();
    const offset = pinned ? height : 0;
    const top = Math.max(0, scroll.scrollTop - head.offsetHeight - offset);
    const first = Math.max(0, Math.floor(top / height) - BUFFER_ROWS);
    const last = Math.min(visible.length, Math.ceil((top + scroll.clientHeight) / height) + BUFFER_ROWS);
    const range = `${first}:${last}`;
    if (!force && range === lastRange) return;
    lastRange = range;
    const fragment = [];
    for (let index = first; index < last; index++) {
      const id = visible[index];
      fragment.push(h('div.vt-row', {
        class: rowClass?.(id) ?? '',
        style: { top: `${index * height}px`, gridTemplateColumns: template },
        onclick: () => onClick?.(id),
      }, cellsFor(id)));
    }
    replace(body, fragment);
    if (!visible.length) body.append(empty);
    if (pinned) {
      const id = pinned();
      replace(pinnedRow, cellsFor(id));
      pinnedRow.className = `vt-row pinned ${rowClass?.(id) ?? ''}`;
      pinnedRow.onclick = () => onClick?.(id);
    }
  }

  function renderHead() {
    replace(head, columns.map((column) => {
      const sorted = state.sort?.key === column.key;
      const filtered = Boolean(state.filters[column.key]);
      return h('div.cell', null,
        column.sortValue ? h('button' + (sorted ? '.sorted' : ''), { onclick: () => toggleSort(column.key), title: t('table.sort') }, column.label, sorted ? (state.sort.dir > 0 ? ' ▲' : ' ▼') : '') : column.label,
        column.filterValues ? h('button.filter-btn' + (filtered ? '.active' : ''), { onclick: (event) => openFilter(column, event.currentTarget), title: t('table.filter'), 'aria-label': `${t('table.filter')} ${column.label}` }, icon('filter')) : null);
    }));
  }

  function toggleSort(key) {
    sfx.click();
    if (state.sort?.key !== key) state.sort = { key, dir: 1 };
    else if (state.sort.dir === 1) state.sort = { key, dir: -1 };
    else state.sort = null;
    recompute();
  }

  function openFilter(column, anchor) {
    document.querySelector('.filter-pop')?.remove();
    const values = column.filterValues();
    const allowed = state.filters[column.key] ?? new Set(values.map((entry) => entry.value));
    const boxes = values.map((entry) => {
      const box = h('input', { type: 'checkbox', checked: allowed.has(entry.value) });
      box.addEventListener('change', () => {
        if (box.checked) allowed.add(entry.value);
        else allowed.delete(entry.value);
        apply();
      });
      return { entry, box, label: h('label', null, box, entry.label) };
    });
    const apply = () => {
      state.filters[column.key] = allowed.size === values.length ? null : allowed;
      recompute();
    };
    const pop = h('div.filter-pop', { role: 'dialog' },
      h('div.row', null,
        h('button.btn.small', { onclick: () => { values.forEach((entry) => allowed.add(entry.value)); boxes.forEach(({ box }) => (box.checked = true)); apply(); } }, t('table.all')),
        h('button.btn.small', { onclick: () => { allowed.clear(); boxes.forEach(({ box }) => (box.checked = false)); apply(); } }, t('table.none'))),
      boxes.map(({ entry, box, label }) => h('div.row', null, label, h('button.btn.small.ghost', {
        style: { marginLeft: 'auto' },
        onclick: () => {
          allowed.clear();
          allowed.add(entry.value);
          boxes.forEach((other) => (other.box.checked = other.box === box));
          apply();
        },
      }, t('table.only')))));
    document.body.append(pop);
    const rect = anchor.getBoundingClientRect();
    pop.style.top = `${Math.min(rect.bottom + 4, window.innerHeight - pop.offsetHeight - 8)}px`;
    pop.style.left = `${Math.min(rect.left, window.innerWidth - pop.offsetWidth - 8)}px`;
    const closer = (event) => {
      if (!pop.contains(event.target) && event.target !== anchor) {
        pop.remove();
        window.removeEventListener('pointerdown', closer, true);
      }
    };
    setTimeout(() => window.addEventListener('pointerdown', closer, true));
  }

  function reset() {
    document.querySelector('.filter-pop')?.remove();
    state.query = '';
    state.filters = {};
    state.sort = options.sort ?? null;
    input.value = '';
    recompute();
  }

  scroll.addEventListener('scroll', () => renderRows(false), { passive: true });
  const resizer = new ResizeObserver(() => renderRows(true));
  resizer.observe(scroll);

  return {
    element,
    refresh({ data = false } = {}) {
      if (data) {
        searchCache = new Map();
        const warm = () => {
          for (const id of rows()) textOf(id);
        };
        (window.requestIdleCallback ?? setTimeout)(warm);
      }
      recompute();
    },
    redraw() {
      renderRows(true);
    },
    setFilter(key, values) {
      state.filters[key] = values ? new Set(values) : null;
      recompute();
    },
    setQuery(query) {
      input.value = query;
      state.query = query.toLowerCase();
      recompute();
    },
    visibleRows: () => visible,
    destroy() {
      resizer.disconnect();
      document.querySelector('.filter-pop')?.remove();
    },
  };
}

import { h, replace } from './dom.js';
import { t, fieldLabel, valueLabel, formatNumber, listJoin } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { FIELDS } from '../core/fields.js';
import { blotterFor } from '../core/blotter.js';
import { createTable } from './table.js';
import { modal } from './overlay.js';

const UNSEEN = '—';
let cache = { key: null, reports: [] };

function allReports() {
  const current = store.state();
  const key = store.getSave().log.length;
  if (cache.key !== key) {
    const reports = [];
    for (let month = 0; month < current.month; month++) reports.push(...blotterFor(world, current, month));
    cache = { key, reports };
  }
  return cache.reports;
}

export function witnessLine(report) {
  const parts = [];
  for (const field of ['sex', 'age', 'worth', 'occupation', 'record', 'citizenship', 'medical']) {
    if (report.fields[field]) parts.push(t(`witness.${field}.${report.fields[field]}`));
  }
  const place = report.fields.district ? t(`witness.district.${report.fields.district}`) : t('blotter.unknownPlace');
  return `${t(`crimes.${report.crime}`)} — ${place}. ${t('blotter.witness')}: ${listJoin(parts)}.${report.associate ? ' ' + t('blotter.associate') + '.' : ''}`;
}

export function createBlotter() {
  const reports = allReports();
  const indexes = reports.map((_, index) => index);
  const month = store.state().month;
  const fields = FIELDS.filter((field) => field.unlock <= month);
  const crimes = [...new Set(reports.map((report) => report.crime))].sort((a, b) => t(`crimes.${a}`).localeCompare(t(`crimes.${b}`)));
  const monthLabel = (value) => (value === 0 ? t('blotter.previous') : String(value));
  const analysis = h('aside.analysis');

  const columns = [
    { key: 'case', label: t('blotter.case'), width: '4.6rem', render: (index) => `#${reports[index].caseNumber}`, sortValue: (index) => reports[index].caseNumber },
    {
      key: 'month', label: t('blotter.month'), width: '6.6rem', render: (index) => monthLabel(reports[index].month), sortValue: (index) => reports[index].month,
      filterOf: (index) => reports[index].month, filterValues: () => Array.from({ length: month }, (_, value) => ({ value, label: monthLabel(value) })),
    },
    {
      key: 'crime', label: t('blotter.crime'), width: 'minmax(10rem, 1.3fr)', render: (index) => [t(`crimes.${reports[index].crime}`), reports[index].associate ? h('span.red', { title: t('blotter.associate') }, ' ⛓') : ''],
      title: (index) => witnessLine(reports[index]),
      sortValue: (index) => t(`crimes.${reports[index].crime}`), filterOf: (index) => reports[index].crime, filterValues: () => crimes.map((value) => ({ value, label: t(`crimes.${value}`) })),
    },
    ...fields.map((field) => ({
      key: field.key,
      label: fieldLabel(field.key),
      width: field.key === 'sex' || field.key === 'record' ? '4.8rem' : field.key === 'medical' || field.key === 'occupation' || field.key === 'citizenship' ? 'minmax(7rem, 1fr)' : '6rem',
      render: (index) => {
        const value = reports[index].fields[field.key];
        return value ? valueLabel(field.key, value) : h('span.dim', null, UNSEEN);
      },
      sortValue: (index) => {
        const value = reports[index].fields[field.key];
        return value ? field.values.indexOf(value) : 99;
      },
      filterOf: (index) => reports[index].fields[field.key] ?? UNSEEN,
      filterValues: () => [...field.values.map((value) => ({ value, label: valueLabel(field.key, value) })), { value: UNSEEN, label: t('blotter.unseen') }],
    })),
  ];

  const table = createTable({
    columns,
    rows: () => indexes,
    sort: { key: 'month', dir: -1 },
    searchText: (index) => witnessLine(reports[index]) + ' ' + Object.entries(reports[index].fields).map(([key, value]) => valueLabel(key, value)).join(' '),
    onClick: (index) => modal((box) => {
      const report = reports[index];
      box.append(h('h2', null, `#${report.caseNumber} · ${t(`crimes.${report.crime}`)}`), h('p', null, witnessLine(report)), h('p.small.dim', null, t('blotter.month'), ': ', monthLabel(report.month)));
    }),
    onChange: (visible) => renderAnalysis(visible),
    tools: h('button.btn.small', { onclick: () => table.setFilter('month', [month - 1]) }, t('blotter.lastMonthOnly')),
  });

  function renderAnalysis(visible) {
    const blocks = [h('h4', null, t('blotter.analysis'), ' · ', t('blotter.analysisOf', { n: formatNumber(visible.length) }))];
    const crimeCounts = new Map();
    for (const index of visible) crimeCounts.set(reports[index].crime, (crimeCounts.get(reports[index].crime) ?? 0) + 1);
    if (crimeCounts.size > 1) {
      blocks.push(h('h4', null, t('blotter.crime')));
      const sorted = [...crimeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
      for (const [crime, count] of sorted) blocks.push(barRow(t(`crimes.${crime}`), count, visible.length, false, () => table.setFilter('crime', [crime])));
    }
    for (const field of fields) {
      const counts = new Map();
      let seen = 0;
      for (const index of visible) {
        const value = reports[index].fields[field.key];
        if (value) {
          seen++;
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }
      if (!seen) continue;
      const best = Math.max(...counts.values());
      blocks.push(h('h4', null, fieldLabel(field.key), ' ', h('span.seen', null, `(${formatNumber(seen)})`)));
      for (const value of field.values) {
        const count = counts.get(value) ?? 0;
        if (!count) continue;
        blocks.push(barRow(valueLabel(field.key, value), count, seen, count === best, () => table.setFilter(field.key, [value])));
      }
    }
    replace(analysis, blocks);
  }

  function barRow(label, count, total, top, onclick) {
    return h('div.bar-row' + (top ? '.top' : ''), { onclick, title: label }, h('span', null, label), h('div.bar', null, h('i', { style: { width: `${(count / total) * 100}%` } })), h('span', null, `${Math.round((count / total) * 100)}%`));
  }

  return {
    element: h('div.blotter-wrap', null, table.element, analysis),
    mounted: () => table.refresh({ data: true }),
    refresh: () => {},
    destroy: () => table.destroy(),
  };
}

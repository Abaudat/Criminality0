import { h } from './dom.js';
import { t, fieldLabel, valueLabel, listJoin } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { FIELDS } from '../core/fields.js';
import { blotterFor } from '../core/blotter.js';
import { createTable, fitWidth } from './table.js';
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

  const columns = [
    { key: 'case', label: t('blotter.case'), width: fitWidth(t('blotter.case'), 4.6), render: (index) => `#${reports[index].caseNumber}`, sortValue: (index) => reports[index].caseNumber },
    {
      key: 'month', label: t('blotter.month'), width: fitWidth(t('blotter.month'), 6.6), render: (index) => monthLabel(reports[index].month), sortValue: (index) => reports[index].month,
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
      width: field.key === 'medical' || field.key === 'occupation' || field.key === 'citizenship' ? fitWidth(fieldLabel(field.key), 7, true) : fitWidth(fieldLabel(field.key), field.key === 'sex' || field.key === 'record' ? 4.8 : 6),
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
    tools: h('button.btn.small', { onclick: () => table.setFilter('month', [month - 1]) }, t('blotter.lastMonthOnly')),
  });

  return {
    element: h('div.blotter-wrap', null, h('p.blotter-intro', null, t('blotter.intro')), table.element),
    mounted: () => table.refresh({ data: true }),
    refresh: () => {},
    destroy: () => table.destroy(),
  };
}

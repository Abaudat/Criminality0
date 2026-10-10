import { h } from './dom.js';
import { t, fieldLabel, valueLabel } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { FIELDS, contactsUnlockedAt } from '../core/fields.js';
import { VERDICTS } from '../core/rules.js';
import { createTable } from './table.js';
import { nameOf, registryOf, portraitOf, viewValue } from './citizen.js';

export function createDatabase(ctx) {
  const population = world.population;
  const player = world.roles.player;
  const month = store.state().month;
  let ids = [];

  const result = () => store.monthResult();
  const current = () => store.state();
  const verdictKey = (id) => (current().jailed[id] ? 'jailed' : VERDICTS[result().verdicts[id]]);

  const fieldColumns = FIELDS.filter((field) => field.unlock <= month).map((field) => ({
    key: field.key,
    label: fieldLabel(field.key),
    width: field.key === 'medical' || field.key === 'occupation' || field.key === 'citizenship' ? 'minmax(7.5rem, 1fr)' : field.key === 'sex' || field.key === 'record' ? '4.6rem' : '6.2rem',
    render: (id) => valueLabel(field.key, viewValue(result().view, field.key, id)),
    sortValue: (id) => result().view.columns[field.key][id],
    filterOf: (id) => viewValue(result().view, field.key, id),
    filterValues: () => field.values.map((value) => ({ value, label: valueLabel(field.key, value) })),
  }));

  const columns = [
    { key: 'photo', label: '', width: '2.6rem', render: (id) => h('img', { src: portraitOf(id, current().jailed[id] ? 'paper' : 'terminal'), alt: '', loading: 'lazy' }) },
    { key: 'name', label: t('table.name'), width: 'minmax(10rem, 1.4fr)', render: (id) => (id === player ? [h('b.cyan', null, t('table.you')), ' ', nameOf(id)] : nameOf(id)), sortValue: (id) => nameOf(id) },
    { key: 'registry', label: t('table.registry'), width: '5.4rem', render: (id) => registryOf(id), sortValue: (id) => population.registry[id] },
    ...fieldColumns,
    ...(contactsUnlockedAt(month)
      ? [{
        key: 'contacts',
        label: fieldLabel('contacts'),
        width: '6rem',
        render: (id) => {
          const view = result().view;
          const criminal = view.criminalContacts[id];
          return [String(view.criminalContacts[id] + view.innocentContacts[id]), criminal ? h('span.red', null, ` · ${criminal}✖`) : ''];
        },
        title: () => t('shift.criminalHint'),
        sortValue: (id) => result().view.criminalContacts[id] * 100 + result().view.innocentContacts[id],
        filterOf: (id) => Math.min(3, result().view.criminalContacts[id]),
        filterValues: () => [0, 1, 2, 3].map((value) => ({ value, label: `${value === 3 ? '≥3' : value} ${t('shift.criminal')}` })),
      }]
      : []),
    {
      key: 'verdict',
      label: t('table.verdict'),
      width: '6.4rem',
      render: (id) => {
        const key = verdictKey(id);
        return h(`span.verdict.${key}`, null, key === 'jailed' ? `${t('table.jailed')} ${current().jailed[id]}` : t(`verdicts.${key}`));
      },
      sortValue: (id) => (current().jailed[id] ? -1 : result().verdicts[id]),
      filterOf: verdictKey,
      filterValues: () => ['clear', 'watch', 'detain', 'jailed'].map((value) => ({ value, label: value === 'jailed' ? t('table.jailed') : t(`verdicts.${value}`) })),
    },
  ];

  function rebuildIds() {
    const month = current().month;
    ids = [];
    for (let id = 0; id < population.size; id++) if (id !== player && population.arrival[id] <= month) ids.push(id);
  }
  rebuildIds();

  const table = createTable({
    columns,
    rows: () => ids,
    pinned: () => player,
    searchText: (id) => {
      const view = result().view;
      return [nameOf(id), registryOf(id), ...FIELDS.filter((field) => field.unlock <= month).map((field) => valueLabel(field.key, viewValue(view, field.key, id)))].join(' ');
    },
    onClick: (id) => ctx.openDossier(id),
    rowClass: (id) => (current().jailed[id] ? 'jailed' : ''),
    footer: t('table.exempt'),
  });

  return {
    element: table.element,
    table,
    mounted: () => table.refresh({ data: true }),
    refresh: (reason) => table.refresh({ data: reason === 'undo' || reason === 'redo' || reason === 'draft' ? false : true }),
    destroy: () => table.destroy(),
  };
}

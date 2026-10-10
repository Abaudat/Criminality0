import { h, icon, replace } from './dom.js';
import { t, formatNumber } from './i18n.js';
import * as store from './store.js';
import { world } from './store.js';
import { CHOICES, choiceAvailable, normalizeChoices, BASE_SALARY, DETAIN_BONUS } from '../core/economy.js';
import { isSisterFree } from '../core/game.js';
import { VERDICTS } from '../core/rules.js';
import { createCityFeed } from '../art/city.js';
import { profileText } from './citizen.js';
import { sfx } from '../audio/sound.js';

export function createHome(ctx) {
  const choicesHost = h('div');
  const ledger = h('div.ledger');
  const risk = h('div');
  const sleep = h('button.btn.primary', { onclick: () => endMonth() });
  const windowCanvas = h('canvas.window-view');
  const feed = createCityFeed(windowCanvas, { seed: 21, label: 'HOME' });
  const panel = h('div.panel', null,
    h('div.panel-head', null, h('h1', null, t('home.title')), h('span.dim', null, t('home.lockedRules'))),
    h('div.home', null,
      h('div', null, h('h2.section', null, t('home.choices')), choicesHost),
      h('div', null, windowCanvas, h('h2.section', null, t('home.budget')), ledger, h('h2.section', null, t('home.profile')), risk)));

  function endMonth() {
    sfx.stamp();
    store.commitMonth();
  }

  function render() {
    const current = store.state();
    const result = store.monthResult();
    const sisterFree = isSisterFree(world, current);
    const chosen = normalizeChoices(current, store.draft().choices, sisterFree);
    feed.setMood({ label: `HOME · ${chosen.housing === 'stack9' ? 'STACK 9' : 'OLD TOWN'}`, unrest: current.unrest / 100 });

    replace(choicesHost, CHOICES.filter((choice) => choiceAvailable(choice, current, sisterFree)).map((choice) =>
      h('div.choice-group', null,
        h('h3', null, t(`home.choice.${choice.key}.label`), choice.once ? ` · ${t('home.once')}` : ''),
        h('div.choice-options', null, choice.options.map((option) => {
          const illegal = choice.illegal?.includes(option);
          return h('button.choice' + (chosen[choice.key] === option ? '.on' : '') + (illegal ? '.illegal' : ''), {
            onclick: () => {
              sfx.toggle();
              store.edit((draft) => (draft.choices[choice.key] = option));
            },
          },
            illegal ? h('span.tag', null, t('home.illegal')) : null,
            h('strong', null, t(`home.choice.${choice.key}.${option}`)),
            h('small', null, t(`home.choice.${choice.key}.${option}Note`)));
        })))));

    const detained = result.detained - (result.playerVerdict === 2 ? 1 : 0);
    replace(ledger,
      h('div.line', null, h('span', null, t('home.savings')), h('span', null, formatNumber(current.savings))),
      h('div.line', null, h('span', null, t('home.salary'), h('br'), h('small', null, t('home.salaryNote', { base: formatNumber(BASE_SALARY), bonus: DETAIN_BONUS, n: formatNumber(detained) }))), h('span', null, `+${formatNumber(result.salary)}`)),
      result.expenses.map((line) => h('div.line', null, h('span', null, t('home.expense')[line.key]), h('span', null, `−${formatNumber(line.amount)}`))),
      h('div.line.total', null, h('span', null, t('home.after')), h(`span${result.savingsAfter < 0 ? '.neg' : ''}`, null, formatNumber(result.savingsAfter))));

    const verdict = VERDICTS[result.playerVerdict];
    const key = result.playerCaught ? (verdict === 'detain' ? 'home.verdictDetain' : 'home.verdictWatchIllegal') : verdict === 'watch' ? 'home.verdictWatch' : 'home.verdictClear';
    replace(risk,
      h('p.small', null, profileText(result.view, world.roles.player, current.month)),
      h(`div.risk.${result.playerCaught ? 'caught' : verdict}`, null, h(`span.verdict.${verdict}`, null, t(`verdicts.${verdict}`)), ' ', t(key)));
    replace(sleep, icon('clock'), t('home.sleep', { month: current.month }));
  }

  const element = h('div', { style: { display: 'contents' } }, panel, h('div.panel-foot', null, sleep));
  return {
    element,
    mounted() {
      feed.start();
      render();
    },
    refresh: render,
    destroy: () => feed.stop(),
  };
}

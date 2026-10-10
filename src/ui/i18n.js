export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
];

let bundle = { ui: {}, story: {} };
let current = 'en';
let numberFormat = new Intl.NumberFormat('en');

export async function loadLanguage(code) {
  const known = LANGUAGES.some((language) => language.code === code) ? code : 'en';
  const [ui, story] = await Promise.all([import(`../i18n/${known}/ui.js`), import(`../i18n/${known}/story.js`)]);
  bundle = { ui: ui.default, story: story.default };
  current = known;
  numberFormat = new Intl.NumberFormat(known);
  document.documentElement.lang = known;
  return known;
}

export function language() {
  return current;
}

export function detectLanguage() {
  const preferred = (navigator.language || 'en').slice(0, 2);
  return LANGUAGES.some((entry) => entry.code === preferred) ? preferred : 'en';
}

function lookup(root, path) {
  let node = root;
  for (const part of path.split('.')) {
    if (node === undefined || node === null) return undefined;
    node = node[part];
  }
  return node;
}

export function fill(text, vars) {
  if (!vars || typeof text !== 'string') return text;
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? (typeof vars[key] === 'number' ? formatNumber(vars[key]) : vars[key]) : match));
}

export function t(path, vars) {
  const value = lookup(bundle.ui, path);
  if (value === undefined) return path;
  return fill(value, vars);
}

export function s(path, vars) {
  const value = lookup(bundle.story, path);
  if (value === undefined) return undefined;
  return typeof value === 'string' ? fill(value, vars) : value;
}

export function formatNumber(value) {
  return numberFormat.format(value);
}

export function fieldLabel(fieldKey) {
  return t(`fields.${fieldKey}.label`);
}

export function valueLabel(fieldKey, value) {
  return t(`fields.${fieldKey}.values.${value}`);
}

export function listJoin(items) {
  return items.join(t('listSeparator'));
}

import { test } from 'node:test';
import assert from 'node:assert/strict';

const shape = (value) => (Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, shape(entry)])) : typeof value);

for (const language of ['fr', 'es', 'ja']) {
  for (const file of ['ui', 'story']) {
    test(`${language}/${file} offers every line the English version does`, async () => {
      const english = (await import(`../src/i18n/en/${file}.js`)).default;
      const other = (await import(`../src/i18n/${language}/${file}.js`)).default;
      assert.deepEqual(shape(other), shape(english));
    });
  }
}

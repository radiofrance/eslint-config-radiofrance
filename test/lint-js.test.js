import {expect, test} from 'vitest';
import {assertError, runEslint} from './helper/utils.js';

const filePath = 'test/helper/js-placeholder.js';

test('success', async () => {
  const errors = await runEslint('const x = true;\n\nif (x) {\n  // Not empty\n}\n', filePath);
  expect(errors).toEqual([]);
});

test('throw error no-console', async () => {
  const errors = await runEslint('const x = true;\n\nif (x) {\n  console.log();\n}\n', filePath);
  assertError(errors, ['no-console']);
});

test('throw error camelcase', async () => {
  const errors = await runEslint('const not_in_camelcase = true;\n\nif (not_in_camelcase) {\n  // not empty\n}\n', filePath);
  assertError(errors, ['camelcase', 'camelcase']);
});

import test from 'ava';
import {assertError, runEslint} from './helper/utils.js';

const filePath = 'test/helper/js-placeholder.js';

test('success', async t => {
  const errors = await runEslint('const x = true;\n\nif (x) {\n  // Not empty\n}\n', filePath);
  t.deepEqual(errors, []);
});

test('throw error no-console', async t => {
  const errors = await runEslint('const x = true;\n\nif (x) {\n  console.log();\n}\n', filePath);
  assertError(t, errors, ['no-console']);
});

test('throw error camelcase', async t => {
  const errors = await runEslint('const not_in_camelcase = true;\n\nif (not_in_camelcase) {\n  // not empty\n}\n', filePath);
  assertError(t, errors, ['camelcase', 'camelcase']);
});

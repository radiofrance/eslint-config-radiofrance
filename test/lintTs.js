import test from 'ava';
import {assertError, runEslint} from './helper/utils.js';

const filePath = 'test/helper/ts-placeholder.ts';

test('success', async t => {
  const errors = await runEslint('type OneType = string; const t: OneType = \'randomString\';\n', filePath);
  t.deepEqual(errors, []);
});

test('throw error no-console', async t => {
  const errors = await runEslint('const x = true;\n\nif (x) {\n  console.log();\n}\n', filePath);
  assertError(t, errors, ['no-console']);
});

test('throw error naming-convention', async t => {
  const errors = await runEslint('const not_in_camelcase = true;\n\nif (not_in_camelcase) {\n  // not empty\n}\n', filePath);
  assertError(t, errors, ['@typescript-eslint/naming-convention']);
});

test('throw error no-inferrable-types', async t => {
  const errors = await runEslint('const foo: number = 5;\n', filePath);
  assertError(t, errors, ['@typescript-eslint/no-inferrable-types']);
});

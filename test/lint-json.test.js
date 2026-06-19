import {expect, test} from 'vitest';
import {assertError, runEslint} from './helper/utils.js';

test('success', async () => {
  const errors = await runEslint(
    '{\n  "a": 1\n}\n',
    'test/helper/placeholder.json',
  );
  expect(errors).toEqual([]);
});

test('throw error json/no-duplicate-keys', async () => {
  const errors = await runEslint(
    '{\n  "a": 1,\n  "a": 2\n}\n',
    'test/helper/placeholder.json',
  );
  assertError(errors, ['json/no-duplicate-keys']);
});

test('allow trailing commas in tsconfig.json (jsonc)', async () => {
  const errors = await runEslint(
    '{\n  "compilerOptions": {},\n}\n',
    'tsconfig.json',
  );
  expect(errors).toEqual([]);
});

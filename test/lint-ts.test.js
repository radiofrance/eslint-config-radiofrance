import {expect, test} from 'vitest';
import {assertError, runEslint} from './helper/utils.js';

const filePath = 'test/helper/ts-placeholder.ts';

test('success', async () => {
  const errors = await runEslint(
    "type OneType = string;\nconst t: OneType = 'randomString';\n",
    filePath,
  );
  expect(errors).toEqual([]);
});

test('throw error no-console', async () => {
  const errors = await runEslint(
    'const x = true;\n\nif (x) {\n  console.log();\n}\n',
    filePath,
  );
  assertError(errors, ['no-console']);
});

test('throw error naming-convention', async () => {
  const errors = await runEslint(
    'const not_in_camelcase = true;\n\nif (not_in_camelcase) {\n  // not empty\n}\n',
    filePath,
  );
  assertError(errors, ['@typescript-eslint/naming-convention']);
});

test('throw error no-inferrable-types', async () => {
  const errors = await runEslint('const foo: number = 5;\n', filePath);
  assertError(errors, ['@typescript-eslint/no-inferrable-types']);
});

test('throw error import-x/extensions on a .js relative import', async () => {
  const errors = await runEslint(
    "import foo from './bar.js';\n\nvoid foo;\n",
    filePath,
  );
  assertError(errors, ['import-x/extensions']);
});

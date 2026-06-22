import {expect, test} from 'vitest';
import {assertError, runEslint} from './helper/utils.js';

const filePath = 'test/helper/placeholder.md';

test('success', async () => {
  const errors = await runEslint('# Title\n\nSome text.\n', filePath);
  expect(errors).toEqual([]);
});

test('throw error markdown/fenced-code-language', async () => {
  const errors = await runEslint('```\ncode\n```\n', filePath);
  assertError(errors, ['markdown/fenced-code-language']);
});

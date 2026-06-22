import {ESLint} from 'eslint';
import {expect} from 'vitest';
import eslintConfigRadiofrance from '../../source/config.js';
/** @import {Linter} from 'eslint' */

/**
 Assert that the lint messages match the expected rule ids, in order and count.
 @param {Linter.LintMessage[]} errors The lint messages returned by ESLint.
 @param {string[]} ruleIds The expected rule ids, in the expected order.
 */
export function assertError(errors, ruleIds) {
  expect(errors).toMatchObject(ruleIds.map((ruleId) => ({ruleId})));
  expect(errors).toHaveLength(ruleIds.length);
}

/**
 Lint a string of source code through the Radio France config and return its messages.
 @param {string} string The source code to lint.
 @param {string} filePath The virtual file path used to pick the matching config.
 */
export async function runEslint(string, filePath) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: eslintConfigRadiofrance,
  });

  const [firstResult] = await eslint.lintText(string, {filePath});

  return firstResult.messages;
}

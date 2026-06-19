import {ESLint} from 'eslint';
import {expect} from 'vitest';
import eslintConfigRadiofrance from '../../source/config.js';
/** @import {Linter} from 'eslint' */

/**
 * @param {Linter.LintMessage[]} errors
 * @param {string[]} ruleIds
 */
export function assertError(errors, ruleIds) {
  expect(errors).toMatchObject(ruleIds.map(ruleId => ({ruleId})));
  expect(errors).toHaveLength(ruleIds.length);
}

/**
 * @param {string} string
 * @param {string} filePath
 */
export async function runEslint(string, filePath) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: eslintConfigRadiofrance,
  });

  const [firstResult] = await eslint.lintText(string, {filePath});

  return firstResult.messages;
}

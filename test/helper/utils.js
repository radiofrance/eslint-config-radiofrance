import {ESLint} from 'eslint';
import eslintConfigRadiofrance from '../../source/config.js';
/** @import {ExecutionContext} from 'ava' */
/** @import {Linter} from 'eslint' */

/**
 * @param {ExecutionContext} t
 * @param {Linter.LintMessage[]} errors
 * @param {string[]} ruleIds
 */
export function assertError(t, errors, ruleIds) {
  const message = JSON.stringify(errors);
  t.like(errors, ruleIds.map(ruleId => ({ruleId})), message);
  t.is(errors.length, ruleIds.length, message);
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

import assert from 'node:assert/strict';
/** @import {Linter} from 'eslint' */

/**
 * @param {Linter.Config[]} configList
 */
export function allowNullType(configList) {
  // Alter this rule to allow usage of the null type.
  const noRestrictedTypes = findRule(configList, '@typescript-eslint/no-restricted-types');
  // @ts-ignore
  delete noRestrictedTypes[1].types.null;
}

/**
 * @param {Linter.Config[]} configList
 */
export function allowSnakeCase(configList) {
  const namingConvention = findRule(configList, '@typescript-eslint/naming-convention');
  // @ts-ignore
  namingConvention[1].format.push('snake_case');
}

/**
 * @param {Linter.Config[]} configList
 * @param {string} ruleName
 */
export function findRule(configList, ruleName) {
  const rule = configList.find(config => config.rules?.[ruleName])?.rules?.[ruleName];
  assert(rule);
  return rule;
}

/**
 * @param {string[]} fileSelectors
 * @returns {Linter.Config}
 */
export function getCommonJsConfig(...fileSelectors) {
  return {
    files: fileSelectors,
    languageOptions: {
      sourceType: 'commonjs',
      parserOptions: {
        sourceType: 'commonjs',
      },
      globals: {
        __dirname: false,
        __filename: false,
      },
    },
  };
}

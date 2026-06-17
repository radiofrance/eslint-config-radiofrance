import assert from 'node:assert/strict';

export function allowNullType(configList) {
  // Alter this rule to allow usage of the null type.
  const noRestrictedTypes = findRule(configList, '@typescript-eslint/no-restricted-types');
  // @ts-ignore
  delete noRestrictedTypes[1].types.null;
}

export function allowSnakeCase(configList) {
  const namingConvention = findRule(configList, '@typescript-eslint/naming-convention');
  // @ts-ignore
  namingConvention[1].format.push('snake_case');
}

export function findRule(configList, ruleName) {
  const rule = configList.find(config => config.rules?.[ruleName])?.rules?.[ruleName];
  assert.ok(rule);
  return rule;
}

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

import assert from 'node:assert/strict';

export function allowNullType(configList) {
  // Alter this rule to allow usage of the null type.
  const noRestrictedTypes = /** @type {[unknown, {types: Record<string, unknown>}]} */ (
    findRule(configList, '@typescript-eslint/no-restricted-types')
  );
  delete noRestrictedTypes[1].types.null;
}

export function allowSnakeCase(configList) {
  const namingConvention = /** @type {[unknown, {format: string[]}]} */ (
    findRule(configList, '@typescript-eslint/naming-convention')
  );
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

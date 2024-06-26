const eslintConfigXoTypescript = require('eslint-config-xo-typescript');

const ruleBanTypeOverride = eslintConfigXoTypescript.rules['@typescript-eslint/ban-types'];
delete ruleBanTypeOverride[1].types.null;

const ruleNamingConventionOverride = eslintConfigXoTypescript.rules['@typescript-eslint/naming-convention'];
ruleNamingConventionOverride[1].format = [
  'strictCamelCase',
  'snake_case',
];

module.exports = {
  overrides: [
    {
      files: ['*.{js,ts}'],
      plugins: ['import', 'promise'],
      extends: ['xo', 'plugin:promise/recommended'],
      rules: {
        // Disable because sometimes we need to comment some code.
        'capitalized-comments': 'off',
        // Console should not be used in project. Instead use our internal logger.
        'no-console': 'error',
        // Override from eslint-config-xo to avoid unnecessary newline in file.
        'object-curly-newline': [
          'error',
          {
            consistent: true,
          },
        ],
        // For each require/import, we should a explicit file extension.
        'import/extensions': [
          'error',
          'ignorePackages',
        ],
        // No duplicate in import
        'import/no-duplicates': 'error',
        // Order import by alphabet and groups ('builtin', 'external', 'internal', etc)
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
            },
          },
        ],
        // Override from eslint-config-xo to allow Typebox usage.
        'new-cap': [
          'error',
          {
            newIsCap: true,
            capIsNew: true,
            capIsNewExceptionPattern: '^Type\\..',
          },
        ],
      },
    },
    {
      files: ['*.js'],
      rules: {
        // Use space indent instead of tab.
        indent: [2, 2, {SwitchCase: 1}],
        // Avoid error on legacy but keep warning.
        camelcase: 'warn',
        'prefer-promise-reject-errors': 'warn',
        'promise/no-return-wrap': 'warn',
        // Expressjs have a unused params "next" in middleware.
        'no-unused-vars': [
          'error',
          {
            argsIgnorePattern: 'next',
          },
        ],
      },
    },
    {
      files: ['*.ts'],
      extends: ['xo-typescript/space'],
      rules: {
        // Override naming convention rule to allow `snake_case`.
        '@typescript-eslint/naming-convention': ruleNamingConventionOverride,
        // Override this rule to allow usage of null and undefined.
        '@typescript-eslint/ban-types': ruleBanTypeOverride,
        // Disable this rule because we need interface and type.
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
  ],
};

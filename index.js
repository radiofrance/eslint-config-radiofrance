'use strict';

module.exports = {
  plugins: ['promise'],
  extends: ['xo', 'plugin:promise/recommended'],
  rules: {
    indent: [2, 2, {SwitchCase: 1}],
    'capitalized-comments': 'off',
    camelcase: 'warn',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'next'
      }
    ],
    'prefer-promise-reject-errors': 'warn',
    
    'promise/no-return-wrap': 'off',
    
    // disable rules in prettier scope
    'no-mixed-operators': 'off',
    'operator-linebreak': 'off',
  }
};

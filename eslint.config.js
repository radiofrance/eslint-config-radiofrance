import config from './source/config.js';

const eslintConfig = [
  ...config,
  {
    // Ignore the committed TypeScript declaration files generated from JSDoc.
    ignores: ['source/*.d.ts'],
  },
];

export default eslintConfig;

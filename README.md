# eslint-config-radiofrance

> ESLint [shareable config](https://eslint.org/docs/latest/extend/shareable-configs.html) extend from [eslint-config-xo](https://github.com/xojs/eslint-config-xo)

## Features

- Lint JavaScript and TypeScript files.
- Lint JSON, JSONC and JSON5 files (`@eslint/json`).
- Lint Markdown files in GitHub-Flavored Markdown (`@eslint/markdown`).
- Format all code with Prettier through the `prettier/prettier` rule, so `eslint --fix` formats your files. Prettier is bundled, no extra install needed.

## Install

```sh
npm install --save-dev eslint-config-radiofrance
```

## Usage

Add ESLint config to your `eslint.config.js`:

```js
import eslintConfigRadiofrance, {allowNullType, allowSnakeCase} from 'eslint-config-radiofrance';

allowNullType(eslintConfigRadiofrance);
allowSnakeCase(eslintConfigRadiofrance);

const config = [
  ...eslintConfigRadiofrance,
];

export default config;
```

## Related

- [eslint-config-xo](https://github.com/xojs/eslint-config-xo) - ESLint shareable config for XO

## License

[CECILL-B](https://spdx.org/licenses/CECILL-B.html)

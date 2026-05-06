# eslint-config-radiofrance

> ESLint [shareable config](https://eslint.org/docs/latest/extend/shareable-configs.html) extend from [eslint-config-xo](https://github.com/xojs/eslint-config-xo)

## Install

```
$ npm install --save-dev eslint-config-radiofrance
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

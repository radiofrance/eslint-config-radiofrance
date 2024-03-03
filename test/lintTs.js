const test = require('ava');
const {ESLint} = require('eslint');

const config = require('../index.js');

const hasRule = (errors, ruleId) => errors.some(x => x.ruleId === ruleId);

async function runEslint(string, config) {
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: config,
  });

  const [firstResult] = await eslint.lintText(string, {filePath: 'test/_x.ts'});

  return firstResult.messages;
}

test('success', async t => {
  const errors = await runEslint('type OneType = string;const t: OneType = \'randomString\';\n', config);
  t.is(errors.length, 0);
});

test('throw error no-console', async t => {
  const errors = await runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  console.log();\n}\n', config);
  t.true(hasRule(errors, 'no-console'), JSON.stringify(errors));
  t.is(errors.length, 1);
});

test('throw error no-inferrable-types', async t => {
  const errors = await runEslint('const foo: number = 5;\n', config);
  t.true(hasRule(errors, '@typescript-eslint/no-inferrable-types'), JSON.stringify(errors));
  t.is(errors.length, 1);
});

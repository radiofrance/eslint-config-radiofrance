const test = require('ava');
const {ESLint} = require('eslint');

const config = require('../index.js');

const hasRule = (errors, ruleId) => errors.some(x => x.ruleId === ruleId);

async function runEslint(string, config) {
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: config,
  });

  const [firstResult] = await eslint.lintText(string);

  return firstResult.messages;
}

test('main', async t => {
  const errors = await runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  // not empty\n}\n', config);
  t.is(errors.length, 0);
});

test('should throw error no-console', async t => {
  const errors = await runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  console.log();\n}\n', config);
  t.true(hasRule(errors, 'no-console'), JSON.stringify(errors));
  t.is(errors.length, 1);
});

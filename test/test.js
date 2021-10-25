const path = require('path');
const test = require('ava');
const isPlainObj = require('is-plain-obj');
const {ESLint} = require('eslint');

async function runEslint(str, conf) {
  const linter = new ESLint({
    useEslintrc: false,
    overrideConfigFile: path.join(__dirname, conf)
  });

  return (await linter.lintText(str))[0].messages;
}

test('main', async t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));
  t.is((await runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  // not empty\n}\n', '../index.js')).length, 0);
});

test('main error no-console', async t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));

  const errors = await runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  console.log();\n}\n', '../index.js');
  t.is(errors[0].ruleId, 'no-console');
});

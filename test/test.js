const path = require('path');
const test = require('ava');
const isPlainObj = require('is-plain-obj');
const eslint = require('eslint');

function runEslint(str, conf) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: path.join(__dirname, conf)
  });

  return linter.executeOnText(str).results[0].messages;
}

test('main', t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));
  t.is(runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  // not empty\n}\n', '../index.js').length, 0);
});

test('main error no-console', t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));

  const errors = runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  console.log();\n}\n', '../index.js');
  t.is(errors[0].ruleId, 'no-console');
});

const test = require('ava');
const isPlainObj = require('is-plain-obj');
const eslint = require('eslint');
const tempWrite = require('temp-write');

function runEslint(str, conf) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(conf))
  });

  return linter.executeOnText(str).results[0].messages;
}

test.only('main', t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));
  t.is(runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  // not empty\n}\n', conf).length, 0);
});

test('main error no-console', t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));

  const errors = runEslint('\'use strict\';\nconst x = true;\n\nif (x) {\n  console.log();\n}\n', conf);
  t.is(errors[0].ruleId, 'no-console');
});

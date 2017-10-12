import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tempWrite from 'temp-write';

function runEslint(str, conf) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(conf))
  });

  return linter.executeOnText(str).results[0].messages;
}

test('main', t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));
  t.is(runEslint(`'use strict';\nconst x = true;\n\nif (x) {\n  // not empty\n}\n`, conf).length, 0);
});

test('main error no-console', t => {
  const conf = require('../');
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));

  const errors = runEslint(`'use strict';\nconst x = true;\n\nif (x) {\n  console.log();\n}\n`, conf);
  t.is(errors[0].ruleId, 'no-console');
});

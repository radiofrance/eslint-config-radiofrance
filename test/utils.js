import test from 'ava';
import {findRule} from '../source/utils.js';
/** @import { Linter } from 'eslint' */

test('Finds the rule by it\'s name', t => {
  /** @type {Linter.Config[]} */
  const config = [
    {rules: {rule1: ['off', 'rule1']}},
    {rules: {rule2: ['error', 'rule2']}},
    {rules: {rule3: ['error', 'rule3']}},
  ];

  const rule = findRule(config, 'rule2');
  t.deepEqual(rule, ['error', 'rule2']);
});

test('Finds the last occurence of a rule', t => {
  /** @type {Linter.Config[]} */
  const config = [
    {rules: {rule1: ['off', 'rule1']}},
    {rules: {rule2: ['error', 'rule2']}},
    {rules: {rule1: ['error', 'rule1']}},
  ];

  const rule = findRule(config, 'rule1');
  t.deepEqual(rule, ['error', 'rule1']);
});

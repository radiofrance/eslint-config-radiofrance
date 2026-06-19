import {expect, test} from 'vitest';
import {findRule} from '../source/utils.js';
/** @import { Linter } from 'eslint' */

test('Finds the rule by it\'s name', () => {
  /** @type {Linter.Config[]} */
  const config = [
    {rules: {rule1: ['off', 'rule1']}},
    {rules: {rule2: ['error', 'rule2']}},
    {rules: {rule3: ['error', 'rule3']}},
  ];

  const rule = findRule(config, 'rule2');
  expect(rule).toEqual(['error', 'rule2']);
});

test('Finds the first occurence of a rule', () => {
  /** @type {Linter.Config[]} */
  const config = [
    {rules: {rule1: ['off', 'rule1']}},
    {rules: {rule2: ['error', 'rule2']}},
    {rules: {rule1: ['error', 'rule1']}},
  ];

  const rule = findRule(config, 'rule1');
  expect(rule).toEqual(['off', 'rule1']);
});

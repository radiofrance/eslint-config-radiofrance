/** @import {Linter} from 'eslint' */
/**
 * @param {Linter.Config[]} configList
 */
export function allowNullType(configList: Linter.Config[]): void;
/**
 * @param {Linter.Config[]} configList
 */
export function allowSnakeCase(configList: Linter.Config[]): void;
/**
 * @param {Linter.Config[]} configList
 * @param {string} ruleName
 */
export function findRule(configList: Linter.Config[], ruleName: string): "off" | "warn" | "error" | 1 | 2 | [import("@eslint/core", { with: { "resolution-mode": "require" } }).Severity, ...unknown[]];
/**
 * @param {string[]} fileSelectors
 * @returns {Linter.Config}
 */
export function getCommonJsConfig(...fileSelectors: string[]): Linter.Config;
import type { Linter } from 'eslint';

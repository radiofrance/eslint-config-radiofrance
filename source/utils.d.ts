import type {Linter} from 'eslint';

/**
 * Allow usage of the `null` type by removing it from the
 * `@typescript-eslint/no-restricted-types` rule. Mutates `configList`.
 */
export function allowNullType(configList: Linter.Config[]): void;

/**
 * Allow `snake_case` identifiers by adding the format to the
 * `@typescript-eslint/naming-convention` rule. Mutates `configList`.
 */
export function allowSnakeCase(configList: Linter.Config[]): void;

/**
 * Find a rule entry by name in a flat config list. Throws if not found.
 */
export function findRule(configList: Linter.Config[], ruleName: string): Linter.RuleEntry;

/**
 * Build a flat config enabling CommonJS parsing for the given file selectors.
 */
export function getCommonJsConfig(...fileSelectors: string[]): Linter.Config;

// @ts-check
const { defineConfig } = require('eslint/config');
const jsdoc = require('eslint-plugin-jsdoc');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const noOnlyTestsPlugin = require('eslint-plugin-no-only-tests'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
const { builtinModules } = require('node:module');

/**
 * @param {string} pathSansExtension
 * @param {readonly string[]} extensions
 * @returns {string}
 */
module.exports = defineConfig(
	{
		ignores: [
			'.changeset',
			'.github',
			'index.d.ts',
			'dist/**/*',
			'grammar.js',
			'bindings/**/*',
			'types/**/*',
		],
	},

	{
		plugins: { jsdoc },
		rules: {
			'jsdoc/no-undefined-types': [
				'error',
				{
					markVariablesAsUsed: true,
					disableReporting: true,
				},
			],
		},
	},

	{
		extends: [
			eslint.configs.recommended,

			// TODO: consider applying just the plugin and parser here, and applying
			// the base rules in a separate config (as was done with the Vue split,
			// also below).
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			eslintConfigPrettier,
		],

		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					modules: true,
				},
				ecmaVersion: 'latest',

				project: ['./tsconfig.json', './tsconfig.tools.json'],
			},

			sourceType: 'module',
		},

		linterOptions: {
			reportUnusedDisableDirectives: true,
		},

		plugins: {
			'no-only-tests': noOnlyTestsPlugin, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
		},

		// Base rules, applied across project and throughout all packages (unless
		// overridden in subsequent configs)
		rules: {
			// This override is recommended by typescript-eslint, because TypeScript
			// does a much better job of it, and gives us better control over which
			// globals are present in a given context. This also obviates any need
			// for specifying other globals in this config.
			'no-undef': 'off',

			'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', ignoreRestSiblings: true },
			],
			'no-only-tests/no-only-tests': 'error',
			'@typescript-eslint/no-shadow': 'error',
			'no-console': 'error',

			'@typescript-eslint/class-literal-property-style': 'error',
			'@typescript-eslint/consistent-indexed-object-style': 'error',
			'@typescript-eslint/consistent-type-definitions': 'error',
			'@typescript-eslint/dot-notation': [
				'error',
				{
					allowIndexSignaturePropertyAccess: true,
				},
			],
			'@typescript-eslint/no-base-to-string': 'error',
			'@typescript-eslint/no-empty-function': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/no-redundant-type-constituents': 'error',
			'@typescript-eslint/no-this-alias': 'error',
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			'@typescript-eslint/only-throw-error': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/prefer-string-starts-ends-with': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/restrict-plus-operands': 'error',
			'@typescript-eslint/restrict-template-expressions': 'error',
			'@typescript-eslint/sort-type-constituents': 'warn',
			'@typescript-eslint/unbound-method': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/no-empty-interface': [
				'error',
				{
					allowSingleExtends: true,
				},
			],
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{
					allowInterfaces: 'with-single-extends',
				},
			],
			'prefer-const': 'error',

			// Ensure Node built-ins aren't used by default
			'no-restricted-imports': [
				'error',
				{
					paths: [...builtinModules],
					patterns: ['node:*'],
				},
			],
		},
	},

	{
		files: ['eslint.config.js', 'vite.config.mts', 'scripts/build/*.mjs'],
		rules: {
			'no-restricted-imports': 'off',
		},
	},

	{
		files: ['eslint.config.js'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	}
);

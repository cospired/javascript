/**
 * typescript-eslint, on top of `recommendedTypeChecked` and `stylisticTypeChecked` (added in ../typescript.js).
 * Every non-deprecated rule is configured: here or by a preset (see test/completeness).
 */
export const typescriptRules = {
  // --- on
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/no-dynamic-delete': 'error',
  '@typescript-eslint/no-generated-empty-object-type': 'error',
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-invalid-this': 'error',
  '@typescript-eslint/no-invalid-void-type': 'error',
  '@typescript-eslint/no-misused-promises': ['error', { checksConditionals: { flagUnions: 'strict' } }],
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
  '@typescript-eslint/no-unused-private-class-members': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/no-useless-constructor': 'error',
  '@typescript-eslint/no-useless-empty-export': 'error',
  '@typescript-eslint/prefer-literal-enum-member': 'error',
  '@typescript-eslint/unified-signatures': 'error',

  // --- core rules replaced by the typescript-eslint versions above (or covered by the compiler)
  'consistent-return': 'off',
  'default-param-last': 'off',
  'no-invalid-this': 'off',
  'no-shadow': 'off',
  'no-unused-private-class-members': 'off',
  'no-use-before-define': 'off',
  'no-useless-constructor': 'off',

  // --- off: opinion, thresholds, or the compiler already reports it
  '@typescript-eslint/class-methods-use-this': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/init-declarations': 'off',
  '@typescript-eslint/max-params': 'off',
  '@typescript-eslint/member-ordering': 'off',
  '@typescript-eslint/method-signature-style': 'off',
  '@typescript-eslint/no-dupe-class-members': 'off',
  '@typescript-eslint/no-extraneous-class': 'off',
  '@typescript-eslint/no-magic-numbers': 'off',
  '@typescript-eslint/no-redeclare': 'off',
  '@typescript-eslint/no-restricted-types': 'off',
  '@typescript-eslint/parameter-properties': 'off',
  '@typescript-eslint/prefer-enum-initializers': 'off',
};

/** Rules for source files only; tests are exempt. */
export const sourceOnlyRules = {
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
};

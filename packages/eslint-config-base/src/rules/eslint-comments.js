import { recommended } from '@eslint-community/eslint-plugin-eslint-comments/configs';

/** Directive comments stay narrow, named and explained. */
export default {
  name: 'cospired/eslint-comments',
  plugins: recommended.plugins,
  linterOptions: { reportUnusedDisableDirectives: 'error' },
  rules: {
    ...recommended.rules,
    '@eslint-community/eslint-comments/require-description': 'error',
    '@eslint-community/eslint-comments/no-restricted-disable': 'off',
    '@eslint-community/eslint-comments/no-use': 'off',
  },
};

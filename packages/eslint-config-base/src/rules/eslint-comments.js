import { recommended } from '@eslint-community/eslint-plugin-eslint-comments/configs';

/** Directive comments stay narrow, named and explained. */
export default {
  name: 'cospired/eslint-comments',
  plugins: recommended.plugins,
  linterOptions: { reportUnusedDisableDirectives: 'error' },
  rules: {
    ...recommended.rules,
    /*
      Require include descriptions in ESLint directive-comments.
      Every disable comment explains itself (`-- reason`), so reviewers know why a rule was
      bypassed.
      https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
    */
    '@eslint-community/eslint-comments/require-description': 'error',

    /*
      Disallow `eslint-disable` comments about specific rules.
      Off: the shared config restricts no particular rules from being disabled.
      https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-restricted-disable.html
    */
    '@eslint-community/eslint-comments/no-restricted-disable': 'off',

    /*
      Disallow ESLint directive-comments.
      Off: directive comments are allowed, as long as they carry a description.
      https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-use.html
    */
    '@eslint-community/eslint-comments/no-use': 'off',

  },
};

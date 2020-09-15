module.exports = {
  extends: [
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    /*
      disallow `eslint-disable` comments about specific rules
      https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-restricted-disable.html
    */
    'eslint-comments/no-restricted-disable': 0,

    /*
      disallow unused `eslint-disable` comments
      (missing in recommended config, https://github.com/mysticatea/eslint-plugin-eslint-comments/issues/22)
      https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html
    */
    'eslint-comments/no-unused-disable': 'error',

    /*
      disallow ESLint directive-comments
      https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-use.html
    */
    'eslint-comments/no-use': 0,

    /*
      enforce description for disable comments
      https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
    */
    'eslint-comments/require-description': 'error',
  },
};

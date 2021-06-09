// import to extend rule instead of overwriting it
const airbnbRules = require('eslint-config-airbnb-base/rules/imports');

module.exports = {
  plugins: [
    'import',
  ],
  rules: {
    /*
      visually group all exports
      https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    */
    'import/newline-after-import': 'error',

    /*
      based on the default airbnb configuration
      in addition to that we allow peer dependency imports
      https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    */
    'import/no-extraneous-dependencies': [
      'error',
      Object.assign(airbnbRules.rules['import/no-extraneous-dependencies'][1], { peerDependencies: true }),
    ],

    /*
      Reports the use of import declarations with CommonJS exports in any module except for the
      main module.
      https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md
      TODO: not yet part of airbnb-base@14.2.1
        revisit when published
    */
    'import/no-import-module-exports': 'error',

    /*
      prevent importing packages through relative paths.
      https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-relative-packages.md
      TODO: not yet part of airbnb-base@14.2.1
        revisit when published
    */
    'import/no-relative-packages': 'error',

    /*
      group imports depending on source and visually group them
      https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    */
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
  },
};

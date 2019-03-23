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
      Prohibit named exports. this is a terrible rule, do not use it.
      https://github.com/benmosher/eslint-plugin-import/blob/1ec80fa35fa1819e2d35a70e68fb6a149fb57c5e/docs/rules/no-named-export.md
      TODO: part of airbnb-base but not published yet as of 2019-03-23,
       remove when published
    */
    'import/no-named-export': 'off',

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

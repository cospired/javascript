module.exports = {
  rules: {
    /*
      Enforce spaces inside of curly braces in JSX attributes for better readability
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    */
    'react/jsx-curly-spacing': [
      'error',
      'always',
    ],

    /*
      overriding airbnb rule that allows .jsx extension
    */
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.js',
        ],
      },
    ],

    /*
      Enforce shorthand form for React fragments
      https://github.com/yannickcr/eslint-plugin-react/blob/bc976b837abeab1dffd90ac6168b746a83fc83cc/docs/rules/jsx-fragments.md
    */
    'react/jsx-fragments': ['warn', 'element'],

    /*
      Prevent usage of JSX strings in general
      strings should always be translatables, hence simple strings are not allowed
      We keep this a 'warn' to allow strings during dev
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
    */
    'react/jsx-no-literals': [
      'warn',
      {
        noStrings: true,
        // TODO: add all literals required for a11y and other rules
        allowedStrings: ['button', 'submit'],
      },
    ],

    /*
      Disallow unnecessary fragments
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
      TODO: remove when enabled in next major airbnb release
    */
    'react/jsx-no-useless-fragment': ['warn'],

    /*
      Disallow JSX props spreading
      we allow react-intl component here as the only exception
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    */
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'enforce',
      explicitSpread: 'ignore',
      exceptions: ['FormattedMessage'],
    }],
  },
};

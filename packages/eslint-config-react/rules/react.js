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
      Enforce a new line after jsx elements and expressions
      https://github.com/yannickcr/eslint-plugin-react/blob/e2eaadae316f9506d163812a09424eb42698470a/docs/rules/jsx-newline.md
      TODO: not released as of airbnb@18.2.1, remove when released
    */
    'react/jsx-newline': 'off',

    /*
      Prevent react contexts from taking non-stable values
      https://github.com/yannickcr/eslint-plugin-react/blob/e2eaadae316f9506d163812a09424eb42698470a/docs/rules/jsx-no-constructed-context-values.md
      TODO: not released as of airbnb@18.2.1, recheck when released
    */
    'react/jsx-no-constructed-context-values': 'warn',

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
      Enforce that namespaces are not used in React elements
      https://github.com/yannickcr/eslint-plugin-react/blob/8785c169c25b09b33c95655bf508cf46263bc53f/docs/rules/no-namespace.md
      TODO: part of but not enabled yet as of airbnb@18.2.1, remove when enabled
    */
    'react/no-namespace': 'warn',

    /*
      Prevent creating unstable components inside components
      https://github.com/yannickcr/eslint-plugin-react/blob/c2a790a3472eea0f6de984bdc3ee2a62197417fb/docs/rules/no-unstable-nested-components.md
      TODO: not released as of airbnb@18.2.1, recheck when released
    */
    'react/no-unstable-nested-components': 'warn',

    /*
      Prefer exact proptype definitions
      https://github.com/yannickcr/eslint-plugin-react/blob/8785c169c25b09b33c95655bf508cf46263bc53f/docs/rules/prefer-exact-props.md
      TODO: part of but not enabled yet as of airbnb@18.2.1, remove when enabled
    */
    'react/prefer-exact-props': 'off',

    /*
      Disallow unnecessary fragments
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
      TODO: part of but not enabled yet as of airbnb@18.2.1, remove when enabled
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

module.exports = {
  plugins: [
    'formatjs',
  ],
  rules: {
    /*
    This blacklists usage of specific elements in ICU message.
    https://formatjs.io/docs/tooling/linter#blocklist-elements
    */
    'formatjs/blocklist-elements': ['off'],

    /*
      Enforce description in messages descriptors
      https://formatjs.io/docs/tooling/linter#enforce-description
    */
    'formatjs/enforce-description': ['error', 'literal'],

    /*
      Enforce default message in messages descriptors
      https://formatjs.io/docs/tooling/linter#enforce-default-message
    */
    'formatjs/enforce-default-message': ['error', 'literal'],

    /*
      Makes sure all values are passed in if message has placeholders
      (number/date/time/plural/select/selectordinal).
      This requires values to be passed in as literal object (not a variable).
      https://formatjs.io/docs/tooling/linter#enforce-placeholders
    */
    'formatjs/enforce-placeholders': ['error'],

    /*
    Enforce certain plural rules to always be specified/forbidden in a message.
    https://formatjs.io/docs/tooling/linter#enforce-plural-rules
    */
    'formatjs/enforce-plural-rules': [
      'warn',
      {
        one: true,
        other: true,
        zero: false,
      },
    ],

    /*
      This make sure placeholders are not camel-case.
      https://formatjs.io/docs/tooling/linter#no-camel-case
    */
    'formatjs/no-camel-case': ['off'],

    /*
      Make sure a sentence is not too complex. Complexity is determined by how many strings are
      produced when we try to flatten the sentence given its selectors.
      https://formatjs.io/docs/tooling/linter/#no-complex-selectors
    */
    'formatjs/no-complex-selectors': ['error'],

    /*
      This prevents usage of emoji in message.
      https://formatjs.io/docs/tooling/linter#no-emoji
    */
    'formatjs/no-emoji': ['off'],

    /*
      This prevents specifying multiple plurals in your message.
      https://formatjs.io/docs/tooling/linter#no-multiple-plurals
    */
    'formatjs/no-multiple-plurals': ['error'],

    /*
      This prevents specifying multiple whitespaces in your message.
      https://formatjs.io/docs/tooling/linter#no-multiple-whitespaces
    */
    'formatjs/no-multiple-whitespaces': ['error'],

    /*
      This prevents specifying offset in plural rules in your message.
      https://formatjs.io/docs/tooling/linter#no-offset
    */
    'formatjs/no-offset': ['error'],

    /*
      Some pipelines enforce automatic ID generation during transpilation using
      babel-plugin-react-intl or @formatjs/ts-transformer so manual IDs cause issues of
      mismatching during runtime.
      https://formatjs.io/docs/tooling/linter#no-id
    */
    'formatjs/no-id': ['off'],

    /*
      This enforces generated ID to be set in MessageDescriptor.
      https://formatjs.io/docs/tooling/linter#enforce-id
    */
    'formatjs/enforce-id': ['off'],
  },
};

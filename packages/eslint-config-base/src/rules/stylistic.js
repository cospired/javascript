import stylistic from '@stylistic/eslint-plugin';

/**
 * Prettier owns formatting; eslint-config-prettier switches the formatting rules off. Only readability
 * rules Prettier does not touch are on (blank lines, comment spacing); everything else is off.
 */
export default {
  name: 'cospired/stylistic',
  plugins: { '@stylistic': stylistic },
  rules: {
    /*
      Disallow extra closing tags for components without children.
      `<div />` instead of `<div></div>`.
      https://eslint.style/rules/jsx-self-closing-comp
    */
    '@stylistic/jsx-self-closing-comp': 'error',

    /*
      Require or disallow an empty line between class members.
      A blank line between class members, except between single-line ones.
      https://eslint.style/rules/lines-between-class-members
    */
    '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    /*
      Require or disallow padding lines between statements.
      A blank line before every `return` and after declaration blocks makes early returns and the
      end of setup visible. Prettier leaves these lines alone.
      https://eslint.style/rules/padding-line-between-statements
    */
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],

    /*
      Enforce consistent spacing after the `//` or `/*` in a comment.
      `// comment` with a space; `///` stays allowed for TypeScript directives.
      https://eslint.style/rules/spaced-comment
    */
    '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }],

    /*
      Enforce consistent line breaks after opening and before closing braces.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/curly-newline
    */
    '@stylistic/curly-newline': 'off',

    /*
      Enforce consistent line break styles for JSX props.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/jsx-props-style
    */
    '@stylistic/exp-jsx-props-style': 'off',

    /*
      Enforce consistent spacing and line break styles inside brackets.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/list-style
    */
    '@stylistic/exp-list-style': 'off',

    /*
      Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX
      expressions on literals in JSX children or attributes.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/jsx-curly-brace-presence
    */
    '@stylistic/jsx-curly-brace-presence': 'off',

    /*
      Enforce line breaks before and after JSX elements when they are used as arguments to a
      function.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/jsx-function-call-newline
    */
    '@stylistic/jsx-function-call-newline': 'off',

    /*
      Enforce PascalCase for user-defined JSX components.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/jsx-pascal-case
    */
    '@stylistic/jsx-pascal-case': 'off',

    /*
      Enforce position of line comments.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/line-comment-position
    */
    '@stylistic/line-comment-position': 'off',

    /*
      Enforce a particular style for multiline comments.
      Off: formatting is Prettier's job.
      https://eslint.style/rules/multiline-comment-style
    */
    '@stylistic/multiline-comment-style': 'off',

  },
};

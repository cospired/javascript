import stylistic from '@stylistic/eslint-plugin';

/**
 * Prettier owns formatting; eslint-config-prettier switches the formatting rules off. Only readability
 * rules Prettier does not touch are on (blank lines, comment spacing); everything else is off.
 */
export default {
  name: 'cospired/stylistic',
  plugins: { '@stylistic': stylistic },
  rules: {
    '@stylistic/jsx-self-closing-comp': 'error',
    '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }],

    '@stylistic/curly-newline': 'off',
    '@stylistic/exp-jsx-props-style': 'off',
    '@stylistic/exp-list-style': 'off',
    '@stylistic/jsx-curly-brace-presence': 'off',
    '@stylistic/jsx-function-call-newline': 'off',
    '@stylistic/jsx-pascal-case': 'off',
    '@stylistic/line-comment-position': 'off',
    '@stylistic/multiline-comment-style': 'off',
  },
};

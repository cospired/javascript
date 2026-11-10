import stylistic from '@stylistic/eslint-plugin';

/** Readability: blank lines around returns and declarations. Prettier does not touch these. */
export default {
  plugins: { '@stylistic': stylistic },
  rules: {
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
  },
};

module.exports = {
  extends: [
    '@cospired/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
  ].concat([
  ].map(require.resolve)),
  rules: {},
};

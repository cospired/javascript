module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb',
  ].concat([
    '@cospired/eslint-config-base/rules/airbnb',
    '@cospired/eslint-config-base/rules/eslint-comment',
    '@cospired/eslint-config-base/rules/hapi',
    '@cospired/eslint-config-base/rules/import',
    './rules/react',
    './rules/react-intl',
  ].map(require.resolve)),
};

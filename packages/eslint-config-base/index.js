module.exports = {
  extends: [
    'airbnb-base',
  ].concat([
    './rules/airbnb',
    './rules/eslint-comment',
    './rules/hapi',
    './rules/import',
  ].map(require.resolve)),
  rules: {},
};

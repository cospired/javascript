import nodeJs from '@cospired/eslint-config-base/node';

// The repo lints itself with the config it ships.
export default [
  ...nodeJs,
  { ignores: ['**/fixtures/**', '.superpowers/**'] },
  {
    // Test helpers import the plugins they check; they are devDependencies of the repo.
    files: ['test-utils/**'],
    rules: { 'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }] },
  },
  {
    // Tests and scripts import the shared helpers through relative paths across package boundaries.
    files: ['**/test/**', 'test-utils/**', 'scripts/**'],
    rules: { 'import-x/no-relative-packages': 'off', 'no-await-in-loop': 'off' },
  },
];

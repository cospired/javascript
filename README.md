# @cospired/javascript

Slightly opinionated ESLint flat configs (ESLint 10) for JavaScript and TypeScript.

| Package | Entries | For |
|---|---|---|
| [`@cospired/eslint-config-base`](packages/eslint-config-base) | `.`, `./node` | JavaScript, Node.js JavaScript |
| [`@cospired/eslint-config-typescript`](packages/eslint-config-typescript) | `.`, `./node` | TypeScript (type-aware), Node.js TypeScript |
| [`@cospired/eslint-config-react`](packages/eslint-config-react) | `.` | React JavaScript |
| [`@cospired/eslint-config-react-typescript`](packages/eslint-config-react-typescript) | `.` | React TypeScript |

Every entry works with no options: `export { default } from '@cospired/eslint-config-typescript/node';` is a complete `eslint.config.js`.

Every rule is documented in the rule files under `packages/*/src/rules/`: a comment block with the description, the reasoning and a link.

## Development

```sh
npm install
npm test        # node:test over every package and the test helpers
npm run lint    # the repo lints itself with its own config
npm run smoke   # pack the packages, install them in a clean project, lint with one-line configs
npx changeset   # describe a change for the next release
```

Releases are cut by the changesets GitHub Action on `main`.

CI runs the tests on Node 22.13, 24 and 26, again with every peer dependency at its minimum version, and the pack smoke test.

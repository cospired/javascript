# @cospired/javascript

Slightly opinionated ESLint flat configs (ESLint 10) for JavaScript and TypeScript.

| Package | Entry | For |
|---|---|---|
| [`@cospired/eslint-config-base`](packages/eslint-config-base) | `.` | JavaScript |
| | `./typescript` | TypeScript (type-aware) |
| | `./node` | Node/backend TypeScript |
| [`@cospired/eslint-config-react`](packages/eslint-config-react) | `.` | React, JavaScript |
| | `./typescript` | React, TypeScript |

Every rule that differs from ESLint/typescript-eslint recommended, with its source and the decision taken, is listed in [docs/rules.md](docs/rules.md). Upgrading from 7.x: [MIGRATION.md](MIGRATION.md).

## Development

```sh
npm install
npm test        # node:test over every package, the test helpers and the rule-table script
npm run lint
npm run rules   # regenerate docs/rules.md
npx changeset   # describe a change for the next release
```

Releases are cut by the changesets GitHub Action on `main`.

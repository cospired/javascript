# Releasing

Releases are cut by the `Release` workflow (`.github/workflows/release.yml`) with changesets. It publishes to npm through **trusted publishing** (GitHub OIDC): no npm token is stored anywhere, and every version carries provenance.

## Setup (already done, for reference)

- Each of the four packages has a trusted publisher on npmjs.com (package Settings, Trusted Publisher): GitHub Actions, organization `cospired`, repository `javascript`, workflow `release.yml`, no environment, permission to publish.
- **Staged publishing is on:** a version published by CI is not live until a maintainer approves it on npmjs.com (login and 2FA).
- GitHub Actions may create pull requests (Settings, Actions, General, Workflow permissions).

A trusted publisher can only be added to a package that already exists. A **new package** therefore needs one manual first publish from a maintainer's machine, then the trusted publisher:

```sh
cd packages/<new-package>
npm pkg delete publishConfig.provenance   # a local publish cannot generate provenance
npm publish --access public
git checkout package.json
```

## Each release

1. Describe the change with `npx changeset`. The migration notes of a major release belong in the changeset text, because they end up in each package's changelog.
2. Merge to `main`. The workflow opens a "chore: version packages" PR with the new versions and changelogs.
3. Merge that PR. The workflow publishes (stages) every package whose version is not on npm yet, then pushes the git tags and creates the GitHub releases.
4. **Approve the staged versions on npmjs.com**, one per package. Until you do, a further push to `main` may try to stage the same version again, so approve promptly.

## Checks

CI (`.github/workflows/ci.yml`) runs the tests and the self-lint on Node 22.13, 24, 26 and the latest release, the tests again with every peer dependency at its minimum version, a smoke test that installs the packed tarballs into a clean project, and a publish dry run with the pending changesets applied. `npm run smoke` runs the smoke test locally.

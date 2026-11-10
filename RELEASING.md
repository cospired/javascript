# Releasing

Releases are cut by the `Release` workflow (`.github/workflows/release.yml`) with changesets.

## One-time setup

1. Give the repo an npm credential that can publish to the `@cospired` scope, either:
   - a repo secret `NPM_TOKEN` (npm automation token), or
   - npm trusted publishing: on npmjs.com add this repo and the `release.yml` workflow as a trusted publisher for both packages (then no token is needed).
2. Allow GitHub Actions to create pull requests (Settings, Actions, General, Workflow permissions).

## Each release

1. Describe the change with `npx changeset` (CI's "publish dry run" job applies pending changesets and dry-runs the publish on every push).
2. Merge to `main`. The workflow opens a "chore: version packages" PR that bumps versions and changelogs.
3. Merge that PR. The workflow publishes to npm with provenance and tags the release.

`npm run smoke` packs both packages and lints a clean project with every entry; CI runs it too.

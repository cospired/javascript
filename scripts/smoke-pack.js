// Packs both packages, installs the tarballs into a clean project and lints with one-line configs.
// Proves what gets published works: exports, `files`, peer dependencies, zero-option defaults.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cospired-smoke-'));
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' });

const tarballs = ['eslint-config-base', 'eslint-config-react'].map((dir) => {
  const [{ filename }] = JSON.parse(run('npm', ['pack', '--json', '--pack-destination', tmp], path.join(root, 'packages', dir)));

  return path.join(tmp, filename);
});

const peers = {};

for (const dir of ['eslint-config-base', 'eslint-config-react']) {
  Object.assign(peers, JSON.parse(fs.readFileSync(path.join(root, 'packages', dir, 'package.json'), 'utf8')).peerDependencies);
}
const project = path.join(tmp, 'project');

fs.mkdirSync(project);
fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify({ name: 'smoke', private: true, type: 'module', dependencies: peers }));
run('npm', ['install', '--no-audit', '--no-fund', ...tarballs], project);

const clean = 'export function add(a: number, b: number): number {\n  return a + b;\n}\n';
const cases = [
  ['js', '@cospired/eslint-config-base', 'src/index.js', 'export const answer = 42;\n'],
  ['node-js', '@cospired/eslint-config-base/node-js', 'src/index.js', "import { cwd } from 'node:process';\n\nexport const here = cwd();\n"],
  ['typescript', '@cospired/eslint-config-base/typescript', 'src/index.ts', clean],
  ['node', '@cospired/eslint-config-base/node', 'src/index.ts', clean],
  ['react', '@cospired/eslint-config-react', 'src/index.jsx', 'export const App = () => <div />;\n'],
  ['react-typescript', '@cospired/eslint-config-react/typescript', 'src/index.tsx', 'export const App = (): null => null;\n'],
];
let failed = false;

for (const [name, entry, file, code] of cases) {
  const dir = path.join(project, name);

  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'eslint.config.js'), `export { default } from '${entry}';\n`);
  fs.writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, noEmit: true, skipLibCheck: true }, include: ['src'] }));
  fs.writeFileSync(path.join(dir, file), code);
  try {
    run(path.join(project, 'node_modules/.bin/eslint'), ['.', '--max-warnings', '0'], dir);
    console.log(`ok   ${name}`);
  } catch (error) {
    failed = true;
    console.log(`FAIL ${name}\n${error.stdout ?? ''}`);
  }
}

fs.rmSync(tmp, { recursive: true, force: true });
process.exit(failed ? 1 : 0);

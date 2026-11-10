// CI only: rewrites the root devDependencies to the lowest version each package's peerDependencies allow and
// reinstalls, so the test run proves the floors are real. Leaves package.json modified; run on a throwaway checkout.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const floor = (range) => range.match(/\d+(\.\d+){0,2}/)[0].split('.').concat(['0', '0']).slice(0, 3).join('.');
const peers = {};

for (const dir of fs.readdirSync('packages')) {
  const { peerDependencies = {} } = JSON.parse(fs.readFileSync(`packages/${dir}/package.json`, 'utf8'));

  Object.assign(peers, peerDependencies);
}
const sets = Object.entries(peers).map(([name, range]) => `devDependencies.${name}=${floor(range)}`);

console.log('peer floors:', sets.join(' '));
execFileSync('npm', ['pkg', 'set', ...sets], { stdio: 'inherit' });
execFileSync('npm', ['install', '--no-package-lock', '--no-audit', '--no-fund'], { stdio: 'inherit' });

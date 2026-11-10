import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';

const here = path.dirname(fileURLToPath(import.meta.url));

export const fixtureProject = path.join(here, 'fixtures', 'ts-project');

/** Lint `code` with a flat config array; returns the flattened messages. */
export async function lintText(config, code, { filePath = 'src/sample.ts', cwd } = {}) {
  filePath = path.resolve(fixtureProject, filePath);
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config,
    cwd: cwd ?? path.dirname(filePath),
  });
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages;
}

export const ruleIds = (messages) => [...new Set(messages.map((m) => m.ruleId).filter(Boolean))].sort();

const isOn = (entry) => {
  const level = Array.isArray(entry) ? entry[0] : entry;
  return level !== 'off' && level !== 0;
};

/** Every rule id in a config array whose severity is not off. */
export function loadedRules(config) {
  const rules = new Set();
  for (const item of config) {
    for (const [id, entry] of Object.entries(item.rules ?? {})) {
      if (isOn(entry)) rules.add(id);
      else rules.delete(id);
    }
  }
  return rules;
}

/** Rule ids in a config whose rule (or whose plugin) is not installed. */
export function missingRules(config) {
  const plugins = Object.assign({}, ...config.map((item) => item.plugins ?? {}));
  const ids = loadedRules(config);

  return [...ids].filter((id) => {
    const slash = id.lastIndexOf('/');
    if (slash === -1) return !builtinRules.has(id);
    const plugin = plugins[id.slice(0, slash)];

    return !plugin?.rules?.[id.slice(slash + 1)];
  });
}

/** The severity (0|1|2) a rule has for `filePath` once all config objects are merged. */
export async function ruleSeverity(config, ruleId, filePath = 'src/sample.ts') {
  filePath = path.resolve(fixtureProject, filePath);
  const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config, cwd: path.dirname(filePath) });
  const entry = (await eslint.calculateConfigForFile(filePath)).rules?.[ruleId];

  return Array.isArray(entry) ? entry[0] : entry;
}

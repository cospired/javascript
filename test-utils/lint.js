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
export async function ruleSeverity(config, ruleId, filePath = 'src/sample.ts', cwd) {
  filePath = path.resolve(fixtureProject, filePath);
  const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config, cwd: cwd ?? path.dirname(filePath) });
  const entry = (await eslint.calculateConfigForFile(filePath)).rules?.[ruleId];

  return Array.isArray(entry) ? entry[0] : entry;
}

/** Rule ids that resolve to severity "warn" for `filePath`. The shipped configs must have none. */
export async function warnRules(config, filePath = 'src/sample.ts', cwd) {
  filePath = path.resolve(fixtureProject, filePath);
  const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config, cwd: cwd ?? path.dirname(filePath) });
  const { rules = {} } = await eslint.calculateConfigForFile(filePath);

  return Object.entries(rules).filter(([, entry]) => (Array.isArray(entry) ? entry[0] : entry) === 1).map(([id]) => id).sort();
}

/** Non-deprecated rules of `namespaces` that no config item sets, whether on or off. */
export function unconfiguredRules(config, namespaces, pluginRules) {
  const configured = new Set(config.flatMap((item) => Object.keys(item.rules ?? {})));

  return namespaces.flatMap((ns) =>
    Object.entries(pluginRules[ns])
      .filter(([, rule]) => !rule.meta?.deprecated)
      .map(([name]) => (ns ? `${ns}/${name}` : name))
      .filter((id) => !configured.has(id)),
  );
}

const normalize = (entry) => {
  const [level, ...options] = Array.isArray(entry) ? entry : [entry];
  const severity = { off: 0, warn: 1, error: 2 }[level] ?? level;

  return JSON.stringify([severity, ...options]);
};

/** Rules set by a config item named `cospired/*` to the value that was already in effect (an override that changes nothing). */
export function redundantRules(config) {
  const effective = {};
  const redundant = new Set();

  for (const item of config) {
    for (const [id, entry] of Object.entries(item.rules ?? {})) {
      if (item.name?.startsWith('cospired/') && id in effective && normalize(effective[id]) === normalize(entry)) redundant.add(id);
      effective[id] = entry;
    }
  }

  return [...redundant].sort();
}

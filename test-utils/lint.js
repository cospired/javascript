import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';

const here = path.dirname(fileURLToPath(import.meta.url));

export const fixtureProject = path.join(here, 'fixtures', 'ts-project');

/** Lint `code` with a flat config array; returns the flattened messages. */
export async function lintText(config, code, { filePath = 'src/sample.ts' } = {}) {
  filePath = path.resolve(fixtureProject, filePath);
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config,
    cwd: path.dirname(filePath),
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

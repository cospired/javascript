/** The shipped configs never use `warn`: upgrade every warn in a preset's rules to error. */
export function errorOnly(rules) {
  return Object.fromEntries(
    Object.entries(rules).map(([id, entry]) => {
      if (entry === 'warn' || entry === 1) return [id, 'error'];
      if (Array.isArray(entry) && (entry[0] === 'warn' || entry[0] === 1)) return [id, ['error', ...entry.slice(1)]];

      return [id, entry];
    }),
  );
}

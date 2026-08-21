/**
 * Extract custom properties from the `@theme` block of a CSS token file.
 *
 * The token file is the single source of truth for values. Tests parse it
 * directly rather than duplicating the numbers in TypeScript, so the two
 * cannot drift apart.
 *
 * Only the `@theme` block is read. The `@media` blocks below it redefine some
 * of the same properties for platform preferences — `--a11y-color-text` becomes
 * `CanvasText` under forced colours, for instance — and those values are not
 * comparable to the base palette. Parsing the whole file would silently mix
 * them together and make contrast checks meaningless.
 */
export function parseTokens(css: string): Map<string, string> {
  // Matches `@theme {` and `@theme static {`.
  const themeBlock = css.match(/@theme[^{]*\{([\s\S]*?)\n\}/);
  if (!themeBlock?.[1]) {
    throw new Error(
      'No @theme block found. Token parsing would be unreliable, so refusing to guess.',
    );
  }

  const tokens = new Map<string, string>();
  const declaration = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null;
  while ((match = declaration.exec(themeBlock[1])) !== null) {
    const name = match[1];
    const value = match[2];
    if (name && value) tokens.set(name, value.trim());
  }
  return tokens;
}

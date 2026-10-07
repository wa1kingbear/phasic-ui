import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { lightTheme, tokens, tokenValues } from './index';

const stylesheet = readFileSync(
  fileURLToPath(new URL('../styles.css', import.meta.url)),
  'utf8',
);

describe('design tokens', () => {
  it('keeps the published CSS synchronized with the token source', () => {
    for (const [name, value] of Object.entries({
      ...tokenValues,
      ...lightTheme,
    })) {
      const declaration = stylesheet.match(
        new RegExp(`${name.replaceAll('-', '\\-')}:\\s*([^;]+);`),
      );

      expect(declaration?.[1]?.replaceAll(/\s/g, '')).toBe(
        value.replaceAll(/\s/g, ''),
      );
    }
  });

  it('exposes semantic references for component styles', () => {
    expect(tokens.color.bgCanvas).toBe('var(--ph-color-bg-canvas)');
    expect(tokens.color.phasePending).toBe('var(--ph-color-phase-pending)');
    expect(tokens.motion.durationFast).toBe('var(--ph-duration-fast)');
  });

  it('keeps theme aliases anchored to known token names', () => {
    const knownNames = new Set([
      ...Object.keys(tokenValues),
      ...Object.keys(lightTheme),
    ]);

    for (const value of Object.values(lightTheme)) {
      for (const [, referenceName] of value.matchAll(/var\((--ph-[^)]+)\)/g)) {
        expect(knownNames.has(referenceName ?? '')).toBe(true);
      }
    }
  });
});

import type { CSSProperties } from 'react';
import type { SpacingScale } from '../types/foundation';

type FoundationStyle = CSSProperties & Record<`--ph-${string}`, string>;

export function spaceValue(value: SpacingScale) {
  return `var(--ph-space-${value})`;
}

export function withStyleVariables(
  style: CSSProperties | undefined,
  variables: Record<`--ph-${string}`, string | undefined>,
) {
  const resolvedStyle: FoundationStyle = { ...style };

  for (const [name, value] of Object.entries(variables)) {
    if (value !== undefined) {
      resolvedStyle[name as `--ph-${string}`] = value;
    }
  }

  return resolvedStyle;
}

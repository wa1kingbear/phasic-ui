# Design system — Phasic UI

## 1. Visual direction

Phasic UI should look like an engineering-oriented product system rather than a generic blue SaaS kit.

Internal visual references inform the mood, hierarchy and differentiation, but
are intentionally kept outside the public repository. The principles below are
the public source of truth for the visual direction.

## 2. Brand characteristics

- warm off-white backgrounds;
- graphite text and primary controls;
- electric lime as a signature signal color;
- cool blue for pending/info;
- semantic red for destructive/error;
- restrained radii;
- thin technical separators;
- optional subtle grid/measurement motifs in docs;
- state markers and rails as a recognizable documentation device;
- compact technical metadata next to larger product typography.

## 3. Token philosophy

Components must consume semantic tokens.

Do not expose the UI as a collection of fixed hex codes.

Token layers:

```text
raw palette
    ↓
semantic tokens
    ↓
component tokens (only when needed)
```

### Example raw palette

These values are starting points, not immutable brand law:

```css
--ph-palette-lime-500: #a3ff12;
--ph-palette-blue-500: #3b82f6;
--ph-palette-red-500: #ef4444;
--ph-palette-graphite-950: #0f172a;
--ph-palette-slate-400: #94a3b8;
--ph-palette-surface: #f6f7f4;
--ph-palette-white: #ffffff;
```

### Semantic color tokens

```css
--ph-color-bg-canvas;
--ph-color-bg-surface;
--ph-color-bg-elevated;
--ph-color-text-primary;
--ph-color-text-secondary;
--ph-color-text-muted;
--ph-color-border-default;
--ph-color-border-strong;
--ph-color-accent;
--ph-color-accent-contrast;
--ph-color-info;
--ph-color-success;
--ph-color-warning;
--ph-color-danger;
--ph-color-focus-ring;
```

State-specific tokens may alias semantic colors:

```css
--ph-color-phase-pending;
--ph-color-phase-success;
--ph-color-phase-error;
```

## 4. Typography

The library should not require a proprietary font.

Default stack should use a high-quality system sans-serif stack. Documentation may optionally use a bundled/open font as a presentation choice, but component packages should remain font-agnostic.

Suggested semantic scale:

```text
Display      56/64
Heading 1    40/48
Heading 2    32/40
Heading 3    24/32
Body         16/24
Body small   14/20
Caption      12/16
Code         13/20
```

Use rem-based implementation.

## 5. Spacing

Base spacing should remain predictable and composable.

Suggested scale:

```text
1: 4px
2: 8px
3: 12px
4: 16px
5: 24px
6: 32px
7: 48px
8: 64px
```

The public token API should use semantic or numeric scale names consistently.

## 6. Radius

Avoid the fully-pill-shaped-everything aesthetic.

Suggested:

```text
xs     4px
sm     6px
md     8px
lg     12px
xl     16px
round  999px
```

Pills are appropriate for status chips and compact controls, not every card.

## 7. Shadows

Use shadows sparingly.

Surfaces should often be separated by borders and background contrast first.

Suggested semantic levels:

```text
shadow-sm
shadow-md
shadow-overlay
```

## 8. Focus

Focus is part of the brand system.

Default focus treatment:

- clearly visible on light and dark surfaces;
- not dependent on component background color;
- offset enough to remain visible around borders;
- consistent across primitives.

Never globally remove browser outlines without replacing them.

## 9. Motion

Tokens:

```text
duration-instant  80ms
duration-fast     140ms
duration-normal   220ms
duration-slow     320ms
```

Suggested easing:

```text
ease-standard
ease-enter
ease-exit
```

Avoid decorative bounce by default.

State changes should feel quick and dependable.

## 10. Breakpoints

Breakpoints are implementation defaults, not product semantics.

Suggested starting points:

```text
mobile     < 768px
tablet     768px - 1023px
desktop    >= 1024px
wide       >= 1440px
```

Adaptive components should allow consumers to override breakpoints at provider/theme level.

## 11. Density

Plan the token architecture so future density modes are possible:

```text
comfortable
compact
```

Do not ship density switching in the first milestone unless it falls out naturally from token architecture.

## 12. Dark theme

Token naming must support dark theme from day one even if visual polish lands later.

Do not encode tokens as `grayOnWhite` or similar theme-specific names.

## 13. Component anatomy

When components expose slots, keep names semantic:

```text
root
label
icon
content
description
error
trigger
viewport
```

Avoid presentation-based names such as `leftBlueArea`.

## 14. Documentation-specific visual language

The docs/showcase may use additional brand elements:

- state rail;
- numbered phases;
- small arrows/callouts;
- subtle grid background;
- engineering annotations;
- side-by-side device states;
- realistic product screens.

These are **documentation identity**, not mandatory decoration inside consumer components.

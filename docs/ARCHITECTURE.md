# Architecture — Phasic UI

## 1. Goals

The architecture must support:

- small tree-shakeable React components;
- framework-agnostic state utilities where useful;
- SSR-safe rendering;
- design token customization via CSS variables;
- accessible overlay/focus behavior;
- docs that can exercise every meaningful state;
- independent package releases later if needed.

## 2. Monorepo

Recommended structure:

```text
apps/
  docs/
  playground/
packages/
  core/
  react/
  tokens/
  icons/
```

Use pnpm workspaces and Turborepo.

## 3. Package responsibilities

### `@phasic-ui/core`

Allowed:

- state types;
- controllable-state helpers that are framework agnostic;
- state normalization utilities;
- pure finite-state helpers;
- shared public TypeScript contracts without DOM/React dependency.

Not allowed:

- React imports;
- JSX;
- browser global usage at module initialization;
- CSS.

### `@phasic-ui/tokens`

Contains:

- token source data;
- generated CSS variables;
- theme contracts;
- optional TypeScript token names.

It must be usable without React.

### `@phasic-ui/react`

Contains:

- components;
- React hooks;
- slot/compound APIs;
- adapters around core state utilities;
- component CSS.

It may depend on `core` and `tokens`.

### `@phasic-ui/icons`

Contains tree-shakeable React icons or icon metadata.

Do not make the React package import the complete icon set automatically.

### `apps/docs`

Contains:

- docs pages;
- live examples;
- State Rail demos;
- component API docs;
- design-system explanation;
- realistic product showcase.

### `apps/playground`

Used for manual scenarios that are awkward in Storybook, including:

- nested overlays;
- full-page keyboard navigation;
- long scrolling pages;
- responsive/adaptive interaction;
- SSR/hydration checks if needed.

## 4. Component source structure

Suggested per-component layout:

```text
packages/react/src/components/Button/
  Button.tsx
  Button.types.ts
  Button.module.css
  Button.test.tsx
  Button.stories.tsx
  index.ts
```

For tiny primitives, colocating types in the implementation file is acceptable. Do not create files only to satisfy a template.

## 5. Public exports

Use explicit package entrypoints.

Example:

```ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
```

Avoid wildcard barrels across deep internal trees when they create circular dependency risk.

## 6. Styling architecture

Use:

- global token CSS variables;
- CSS Modules for components;
- `data-*` attributes for semantic component states;
- native pseudo-classes where possible.

Example:

```tsx
<button
  data-phase={phase}
  data-variant={variant}
  data-size={size}
/>
```

Keep state attributes semantic and stable if documented as styling hooks.

## 7. Theming

Proposed runtime model:

```tsx
<PhasicProvider theme="light">
  <App />
</PhasicProvider>
```

The provider should remain thin. Most theming should work through CSS variable inheritance so consumers can theme subtrees or server-render without JavaScript style injection.

Allow advanced consumers to apply theme classes/data attributes manually if they do not need React context.

## 8. SSR

Rules:

- no `window`/`document` access during module evaluation;
- browser capability checks inside effects or guarded functions;
- deterministic IDs using React-supported APIs;
- no initial render that depends on measured viewport width unless there is a hydration-safe fallback.

Adaptive components must define SSR behavior explicitly.

Recommended default for `AdaptiveOverlay`:

- render one semantic trigger;
- defer form-factor-specific open content until client capability is known, or use CSS/media techniques where semantics permit;
- avoid server markup that guarantees hydration mismatch.

## 9. Overlay infrastructure

Dialog, Popover, Tooltip, Menu and AdaptiveOverlay share difficult primitives:

- portal;
- dismiss behavior;
- Escape handling;
- outside interaction;
- focus management;
- positioning;
- scroll lock where appropriate;
- layering.

Centralize these behaviors in internal hooks/primitives rather than reimplementing them per component.

Floating UI may be used for anchored positioning.

## 10. State-aware async behavior

`AsyncButton` must not swallow application errors.

Suggested contract:

```ts
onAction?: () => void | Promise<unknown>
```

Uncontrolled behavior:

```text
invoke
-> pending
-> success for configured feedback duration
-> idle
```

On rejected promise:

```text
pending
-> error
-> optional retry or return-to-idle policy
```

Also support controlled `phase` for integrations where the application owns mutation state.

Do not hard-code toast behavior into `AsyncButton`.

## 11. DataView

`DataView` should be a rendering coordinator, not a data-fetching library.

It must not fetch URLs itself.

Responsibilities:

- select loading/empty/error/offline/stale/success presentation;
- expose retry callback when provided;
- keep stale data visible;
- support render-prop or child content for successful data.

## 12. AdaptiveOverlay

Goal:

One semantic overlay API with different presentation by context.

Initial modes:

```text
desktop -> dialog
tablet  -> drawer
mobile  -> bottom-sheet
```

Behavior requirements:

- consistent open state;
- consistent trigger semantics;
- focus restoration;
- Escape dismissal where platform pattern allows;
- mobile touch-friendly drag affordance may be added later;
- consumer can override mapping.

## 13. Forms

The base package should not depend on React Hook Form.

Inputs must work as normal controlled/uncontrolled React inputs.

Optional integration adapters can be separate in the future.

`FormField` should own presentation relationships:

- label;
- description;
- required/optional marker;
- error message;
- `aria-describedby` wiring.

## 14. Build outputs

Packages should emit:

- ESM;
- type declarations;
- CSS assets where applicable;
- source maps for development.

Only add CommonJS if real consumer requirements justify it.

Mark packages side-effect-free carefully. CSS imports may require explicit side-effect configuration.

## 15. Release strategy

Before first public release:

- choose final license;
- reserve npm scope;
- add Changesets;
- add CI release workflow;
- add package provenance/signing if supported by the chosen registry setup;
- define alpha/beta stability policy.

## 16. Architecture decisions

Record meaningful decisions in `docs/DECISIONS.md`.

Examples that deserve an entry:

- switching styling strategy;
- adding a large runtime dependency;
- changing canonical state vocabulary;
- changing package boundaries;
- adopting a headless primitive dependency.

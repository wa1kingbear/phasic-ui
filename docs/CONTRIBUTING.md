# Contributing to Phasic UI

Thanks for contributing.

Phasic UI is early-stage, so architectural consistency matters more than maximizing the number of components.

## Before you start

Read:

- `PRODUCT.md`
- `STATE_MODEL.md`
- `DESIGN_SYSTEM.md`
- `ARCHITECTURE.md`

Check `ROADMAP.md` before starting a large component.

## Development setup

```bash
corepack enable
pnpm install
pnpm dev
```

Before opening a pull request, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run E2E tests for changes involving overlays, focus, keyboard interaction, responsive/adaptive behavior or full flows:

```bash
pnpm test:e2e
```

## Pull request expectations

A PR should explain:

- the product problem being solved;
- the public API introduced or changed;
- accessibility behavior;
- meaningful state handling;
- screenshots or Storybook links for visual changes;
- tests added.

Avoid mixing unrelated refactors with a component feature unless the refactor is required to deliver it safely.

## New component checklist

Before proposing a new component, answer:

1. Is this a primitive, state, pattern, flow or adaptive component?
2. Can existing primitives compose the same behavior cleanly?
3. Does the component encode reusable product behavior, or is it application-specific?
4. What are its meaningful states?
5. What keyboard/focus behavior is required?
6. Does it need controlled and uncontrolled modes?
7. Can it be themed entirely through tokens/slots?

## Public API guidelines

Prefer:

```tsx
<Dialog open={open} onOpenChange={setOpen} />
```

Avoid inconsistent aliases such as:

```tsx
<Dialog visible={open} onVisibilityChanged={...} />
```

Use semantic names shared across the library.

## Accessibility

Accessibility bugs are functional bugs.

PR review should reject components that require mouse input for essential behavior or ship without correct accessible names/relationships.

## Styling

- use semantic tokens;
- use component CSS Modules;
- preserve consumer `className`/slot customization where documented;
- do not add arbitrary colors to a component;
- avoid `!important` except for a documented reset-level reason.

## Tests

Test observable behavior.

Use snapshots only when they add value beyond interaction/assertion tests.

## Documentation

Every public component needs at least one realistic example. For state-aware components, show the relevant states explicitly.

## Breaking changes

Before beta, breaking changes are allowed but must be deliberate and documented.

Once a component is marked beta, use Changesets and migration notes for breaking public API changes.

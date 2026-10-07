# Phasic UI

> UI components for real product states.

**Phasic UI** is an open-source React UI kit focused on the states that real product interfaces actually live through: loading, pending, success, error, empty, offline, stale and adaptive layout changes.

Most UI libraries give you visual building blocks. Phasic UI aims to also give you the behavior and product patterns that teams repeatedly rebuild around those blocks.

**Core idea:** every interface has a phase.

## Status

Phasic UI is currently in the **foundation / pre-alpha** stage. The public API is not stable yet and packages are not considered production-ready.

The first milestone is to establish:

- design tokens and theming;
- layout and typography primitives;
- accessible interaction primitives;
- a consistent state model;
- `AsyncButton`;
- `DataView` / `AsyncBoundary`;
- `AdaptiveOverlay`;
- core form controls;
- Storybook documentation and visual state demos.

## Why Phasic UI

A typical product component is rarely just `default`, `hover` and `disabled`.

A save action can be:

```text
idle -> pending -> success
                  \\-> error -> retry
```

A data surface can be:

```text
loading -> success
        -> empty
        -> error
        -> offline
        -> stale
```

A single overlay may need to be a dialog on desktop, a drawer on tablet and a bottom sheet on mobile.

Phasic UI treats these cases as first-class product behavior instead of leaving every application to rebuild them from scratch.

## Principles

1. **State-aware by default**
   Async and resource states are part of component APIs, not afterthoughts.

2. **Adaptive, not merely responsive**
   Components may change interaction model by viewport and capability while keeping one semantic API.

3. **Accessible without extra work**
   Keyboard navigation, focus management, ARIA, reduced motion and readable states are baseline requirements.

4. **Composable before configurable**
   Prefer small primitives and compound components over giant prop surfaces.

5. **Semantic styling**
   Consumers use tokens and intents such as `danger`, `success` and `warning`, not hard-coded colors.

6. **Product patterns included**
   The library documents common flows such as save, upload, delete confirmation, filters and permission states.

7. **Escape hatches exist**
   Consumers can style, compose and control components without forking the library.

## Planned packages

The intended monorepo structure is:

```text
@phasic-ui/react     React components and hooks
@phasic-ui/core      framework-agnostic state and behavior utilities
@phasic-ui/tokens    design tokens and CSS variables
@phasic-ui/icons     optional icon package
```

> Package names are provisional until the npm scope is registered. Do not publish packages without checking namespace availability first.

## Repository layout

```text
phasic-ui/
├─ apps/
│  ├─ docs/                 documentation / showcase app
│  └─ playground/           local manual testing app
├─ packages/
│  ├─ core/
│  ├─ react/
│  ├─ tokens/
│  └─ icons/
├─ docs/
│  ├─ ARCHITECTURE.md
│  ├─ COMPONENTS.md
│  ├─ DESIGN_SYSTEM.md
│  ├─ PRODUCT.md
│  ├─ STATE_MODEL.md
│  └─ ROADMAP.md
└─ README.md
```

## Suggested stack

The implementation should stay lightweight and library-friendly:

- React + TypeScript;
- pnpm workspaces;
- Turborepo for monorepo task orchestration;
- Vite for local development and playground builds;
- Storybook for component documentation;
- CSS variables + CSS Modules for styling;
- Floating UI for positioned overlays where necessary;
- Vitest + Testing Library for unit/component tests;
- Playwright for browser interaction and accessibility smoke tests;
- Changesets for package versioning and releases.

Avoid adding a runtime styling framework or a large component dependency unless an ADR explicitly justifies it.

## Local development

Requirements:

- a current LTS Node.js release;
- Corepack enabled.

```bash
corepack enable
pnpm install
pnpm dev
```

Expected workspace commands:

```bash
pnpm dev            # docs + playground + package watch mode
pnpm build          # build all packages/apps
pnpm test           # unit/component tests
pnpm test:e2e       # Playwright tests
pnpm lint           # lint all workspaces
pnpm typecheck      # TypeScript checks
pnpm storybook      # run Storybook
```

If these scripts do not exist yet, create them as part of repository bootstrap rather than changing the README to hide the intended workflow.

## API direction

### AsyncButton

```tsx
<AsyncButton
  onAction={saveProfile}
  successLabel="Saved"
  errorLabel="Try again"
>
  Save changes
</AsyncButton>
```

The component owns presentation state for the action while still allowing controlled state when the application needs it.

### DataView

```tsx
<DataView
  state={usersState}
  loading={<UsersSkeleton />}
  empty={<EmptyState title="No users yet" />}
  error={({ retry }) => <ErrorState onRetry={retry} />}
>
  {(users) => <UsersTable users={users} />}
</DataView>
```

### AdaptiveOverlay

```tsx
<AdaptiveOverlay
  desktop="dialog"
  tablet="drawer"
  mobile="bottom-sheet"
>
  <EditProjectForm />
</AdaptiveOverlay>
```

The exact API may evolve, but the semantic contract should remain stable: one intent, form factor adapted to context.

## Documentation model

Phasic UI documentation is organized around six concepts:

- **Primitives** - Button, Input, Stack, Text, Dialog primitives;
- **Patterns** - Search + Filters, Save Bar, Delete Confirmation;
- **States** - Loading, Empty, Error, Offline, Success;
- **Flows** - Save, Search, Upload, Delete, Multi-step;
- **Adaptive** - behavior changes across desktop, tablet and mobile;
- **Tokens** - semantic design values shared by every component.

The docs should show components inside realistic product states, not only isolated prop tables.

## Accessibility

No component is complete until it is usable with:

- keyboard only;
- visible focus;
- screen reader semantics;
- reduced motion enabled;
- high zoom / text scaling;
- light and dark themes when supported;
- touch input for adaptive/mobile components.

Interactive components must be built from correct native elements whenever possible.

## Contributing

Start with [CONTRIBUTING.md](./docs/CONTRIBUTING.md) before making architectural changes.

For the current implementation order, see [ROADMAP.md](./docs/ROADMAP.md).

## License

Phasic UI is available under the [MIT License](./LICENSE).

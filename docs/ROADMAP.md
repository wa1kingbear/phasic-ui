# Roadmap

The roadmap prioritizes proving Phasic UI's concept with a small, coherent system.

## Milestone 0 — repository bootstrap

Goal: reproducible workspace with quality gates.

Deliverables:

- pnpm workspace;
- Turborepo pipeline;
- TypeScript base config;
- package skeletons for `core`, `tokens`, `react`, `icons`;
- docs app;
- playground app;
- Storybook;
- Vitest + Testing Library;
- Playwright;
- lint + formatting;
- CI for install, typecheck, lint, test and build;
- Changesets scaffold;
- MIT license;

Exit criteria:

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
```

all succeed from a clean checkout.

## Milestone 1 — design foundation

Goal: establish the visual and API language.

Deliverables:

- token source;
- generated CSS variables;
- light theme;
- provider/theme boundary;
- focus ring;
- spacing, radius, typography, motion tokens;
- `Box`, `Stack`, `Inline`;
- `Text`, `Heading`;
- `Button`, `IconButton`;
- Storybook foundations page.

Exit criteria:

- no hard-coded component colors outside token source;
- keyboard focus is visible;
- primitives tree-shake correctly;
- docs visually match the Phasic direction.

## Milestone 2 — forms and overlays

Goal: own the difficult interaction basics.

Deliverables:

- `FormField`;
- `Input`;
- `Textarea`;
- `Checkbox`;
- `RadioGroup`;
- `Switch`;
- overlay infrastructure;
- `Tooltip`;
- `Popover`;
- `Dialog`;
- portal/focus/dismiss tests.

Exit criteria:

- keyboard interaction tests cover overlays;
- form error wiring is accessible;
- overlays restore focus correctly.

## Milestone 3 — Phasic state layer

Goal: demonstrate the project's unique value.

Deliverables:

- canonical state types in `core`;
- `Spinner`;
- `Skeleton`;
- `EmptyState`;
- `ErrorState`;
- `OfflineState`;
- `AsyncButton`;
- `DataView` or `AsyncBoundary` final public split;
- State Rail docs demo.

Exit criteria:

- action state transitions have test coverage;
- DataView supports loading/empty/error/offline/stale/success;
- docs contain an interactive state demo.

## Milestone 4 — adaptive layer

Goal: prove one semantic API can map to different interaction models.

Deliverables:

- `Drawer`;
- `BottomSheet`;
- `AdaptiveOverlay`;
- hydration-safe viewport strategy;
- mobile/touch interaction tests;
- adaptive docs showcase.

Exit criteria:

- same example behaves as Dialog/Drawer/BottomSheet across configured breakpoints;
- focus and dismissal semantics remain correct;
- SSR does not produce hydration warnings.

## Milestone 5 — product patterns

Goal: provide reusable compositions, not only primitives.

Deliverables:

- Search + Filters;
- Save Bar;
- Delete Confirmation;
- Permission Denied;
- FileUpload;
- Upload Flow;
- pattern documentation with realistic screens.

Patterns may remain documentation recipes until APIs prove stable.

## Milestone 6 — public alpha

Deliverables:

- verify repository license metadata;
- npm scope verified/reserved;
- public packages prepared;
- release CI;
- package README metadata;
- migration/stability policy;
- accessibility review;
- bundle-size reporting;
- contribution templates;
- first complete example application.

Release target:

```text
0.1.0-alpha.x
```

Do not jump to `1.0` based on component count.

## Later exploration

Only after public alpha usage validates demand:

- Select / Combobox expansion;
- DatePicker;
- DataTable;
- CommandPalette;
- Tree;
- advanced uploads;
- charts package;
- compact density;
- dark theme polish;
- React Server Component guidance;
- adapters for popular form/query libraries;
- headless behavior package expansion;
- additional frameworks.

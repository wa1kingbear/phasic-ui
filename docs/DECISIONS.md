# Architecture decisions

Record meaningful decisions here as the project evolves.

Use this lightweight format:

```md
## ADR-001 — Decision title

Status: Proposed | Accepted | Superseded
Date: YYYY-MM-DD

### Context
Why a decision is required.

### Decision
What we will do.

### Consequences
What becomes easier, harder or constrained.
```

---

## ADR-001 — CSS variables + CSS Modules as the default styling model

Status: Accepted
Date: 2026-10-07

### Context

Phasic UI must support runtime theming, SSR, low runtime overhead and consumer overrides without coupling the component package to a CSS-in-JS runtime.

### Decision

Use CSS custom properties for token theming and CSS Modules for component-local styles.

### Consequences

- theming works through CSS inheritance;
- no style runtime is required;
- components remain friendly to SSR;
- build tooling must preserve CSS assets correctly;
- slot/class customization needs explicit documented boundaries.

## ADR-002 — State vocabulary is shared across components

Status: Accepted
Date: 2026-10-07

### Context

The project differentiates itself through consistent state-aware behavior. Allowing every component to invent state names would undermine that model.

### Decision

Use canonical action and resource vocabularies defined in `STATE_MODEL.md`.

### Consequences

- APIs are easier to learn;
- cross-component documentation is coherent;
- edge cases may require orthogonal flags/types instead of adding arbitrary new phases.

## ADR-003 — Patterns start as recipes before public package APIs

Status: Accepted
Date: 2026-10-07

### Context

High-level product patterns are valuable but easy to over-generalize prematurely.

### Decision

Implement initial patterns in docs/examples. Promote them to public package exports only after repeated realistic usage validates the abstraction.

### Consequences

- fewer unstable high-level APIs;
- docs can move faster than package contracts;
- some early consumers will copy recipes instead of importing one component.

## ADR-004 — AsyncButton uses `onAction`

Status: Accepted
Date: 2026-10-07

### Context

`AsyncButton` needs a callback that may return a Promise and drives its action
phase. Naming it `onPress` would suggest a normalized input event and obscure
the async lifecycle contract.

### Decision

Use `onAction` for the Promise-aware callback on `AsyncButton`. Keep native
event conventions such as `onClick` on the base `Button`.

### Consequences

- the async lifecycle is explicit at the call site;
- `AsyncButton` can invoke the same action from keyboard or pointer activation;
- the base button remains aligned with native React button semantics.

# State model

The state model is a core part of Phasic UI's public language.

The goal is consistency: applications should not receive one vocabulary from `AsyncButton`, another from `Upload`, and a third from `DataView` when the underlying concepts are the same.

## 1. Action phases

Used for user-triggered operations such as save, delete, submit, retry and copy.

```ts
export type ActionPhase =
  | 'idle'
  | 'pending'
  | 'success'
  | 'error';
```

### idle

Ready for interaction. No action is currently running.

### pending

The action has started and has not resolved yet.

Rules:

- prevent duplicate activation by default for destructive/network actions;
- expose progress separately when progress is known;
- preserve a stable accessible name where possible;
- optionally announce pending status for longer-running operations.

### success

The latest action completed successfully.

Success is often transient. Components must not assume a permanent success phase unless controlled by the consumer.

### error

The latest action failed.

The error phase may provide retry behavior but must not hide the original error from the application.

## 2. Resource phases

Used for data surfaces.

```ts
export type ResourcePhase =
  | 'loading'
  | 'success'
  | 'empty'
  | 'error'
  | 'offline'
  | 'stale';
```

### loading

No usable resource is available yet and the application is waiting for it.

### success

Usable current data is available.

### empty

The request succeeded but there is no meaningful content to render.

Empty is **not** an error.

### error

The resource cannot currently be presented because loading/processing failed and there is no acceptable fallback.

### offline

The interface knows network connectivity is unavailable or the requested action/resource explicitly cannot proceed without it.

Do not infer offline from every fetch error.

### stale

Usable data exists but is known to be older than the desired freshness threshold or is being revalidated.

Stale should normally keep content visible and add status, rather than replacing content with a blocking error/loading state.

## 3. Progress is orthogonal

Progress is not a phase.

```ts
interface ProgressValue {
  value: number;
  max?: number;
}
```

Examples:

```text
pending + 72%
stale + background refresh
```

## 4. Disabled is not a phase

`disabled`, `readOnly`, `selected`, `open`, `pressed` and `checked` are interaction/control states and must not be mixed into action/resource phases.

Example:

```ts
<AsyncButton disabled phase="error" />
```

The concepts are independent even if certain combinations are uncommon.

## 5. Validation is separate

Form validation uses semantic validity rather than the action phase model.

Suggested field model:

```ts
export type FieldValidity = 'valid' | 'invalid' | 'unknown';
```

Submitting a form can be `pending` while individual fields remain `invalid` or `valid`.

## 6. Suggested core types

```ts
export type ActionPhase = 'idle' | 'pending' | 'success' | 'error';

export type ResourcePhase =
  | 'loading'
  | 'success'
  | 'empty'
  | 'error'
  | 'offline'
  | 'stale';

export interface AsyncActionState<E = unknown> {
  phase: ActionPhase;
  error?: E;
}

export type ResourceState<T, E = unknown> =
  | { phase: 'loading' }
  | { phase: 'success'; data: T }
  | { phase: 'empty' }
  | { phase: 'error'; error: E }
  | { phase: 'offline'; data?: T }
  | { phase: 'stale'; data: T };
```

Do not force every consumer into these exact data containers if it hurts interoperability with query libraries. The important contract is the vocabulary and behavior.

## 7. Interop with async/query libraries

Phasic UI should work with React Query/TanStack Query, SWR, Apollo and plain promises without requiring adapters for basic usage.

`DataView` should accept either:

- a normalized Phasic resource state; or
- simple explicit props that can be derived from common query libraries.

Avoid importing a query library into the runtime package.

## 8. Visual semantics

Suggested default semantic mapping:

```text
idle      -> graphite / neutral
pending   -> cool blue
success   -> electric lime / success green
error     -> red
loading   -> cool blue
empty     -> muted neutral
offline   -> neutral + offline icon/pattern
stale     -> warning/neutral, never destructive by default
```

Color must never be the only signal.

## 9. Motion semantics

State transitions should be subtle and functional:

- pending spinner/progress may animate;
- success feedback can use a short confirmation transition;
- error can appear without shake animations by default;
- all non-essential motion must respect `prefers-reduced-motion`.

## 10. State Rail

`StateRail` is primarily a documentation/showcase pattern that lets users move a demo through representative product states.

It should not become a required dependency for normal components.

Example options:

```text
Idle
Loading
Empty
Error
Offline
Success
```

For demos, a rail can map resource and action states into one understandable preview sequence, but internal types should remain semantically precise.

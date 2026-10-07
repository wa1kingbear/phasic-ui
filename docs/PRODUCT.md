# Product specification — Phasic UI

## 1. Product statement

**Phasic UI** is an open-source React component library for interfaces that have real lifecycle and resource states.

Tagline:

> UI components for real product states.

Brand thought:

> Every interface has a phase.

## 2. Problem

Most UI kits are optimized for visual consistency at rest. They provide Button, Input, Select, Dialog and similar components, but application teams still repeatedly implement the difficult behavior around them:

- pending actions;
- optimistic or successful feedback;
- retry after errors;
- loading skeletons;
- empty results;
- offline behavior;
- stale cached data;
- adaptive desktop/mobile interaction;
- focus management;
- accessible async announcements;
- common product flows such as save bars and delete confirmations.

This duplicated product glue is often inconsistent and poorly tested.

## 3. Product goal

Provide a UI kit in which **state, behavior and adaptation are first-class**, while keeping the components composable enough for different product visual identities.

Phasic UI should feel more complete than a headless primitive library and less prescriptive than a large enterprise UI framework.

## 4. Target users

Primary:

- frontend developers building React product interfaces;
- small and medium product teams without a dedicated design-system team;
- teams that need a reliable foundation for SaaS, dashboards, internal tools and customer-facing web apps.

Secondary:

- design-system engineers evaluating patterns and state models;
- designers who need documented behavior states, not only static Figma components.

## 5. Differentiators

### 5.1 State-aware components

Async actions and resource states are represented directly in component contracts.

### 5.2 Adaptive components

A semantic interaction may render as a dialog, drawer or bottom sheet depending on context without forcing applications to maintain three unrelated implementations.

### 5.3 Product patterns

Phasic UI documents composed solutions such as:

- Save Bar;
- Search + Filters;
- Delete Confirmation;
- Permission Denied;
- Upload Flow;
- Async List / Data View.

### 5.4 State-driven documentation

Documentation should let users switch between interface states and see realistic product screens adapt.

The **State Rail** is both a documentation pattern and part of the brand language.

### 5.5 Accessibility as a default

The library owns difficult interaction details instead of delegating them to every consumer.

## 6. Product taxonomy

### Primitives

Low-level reusable building blocks.

Examples:

- Button;
- IconButton;
- Input;
- Checkbox;
- Radio;
- Switch;
- Stack;
- Inline;
- Grid;
- Text;
- Dialog primitives;
- Popover primitives.

### States

Reusable presentation for application conditions.

Examples:

- Loading;
- Empty;
- Error;
- Offline;
- Success;
- Stale.

### Patterns

Composed solutions that solve common UI problems.

Examples:

- Search + Filters;
- Save Bar;
- Delete Confirmation;
- Permission Denied;
- Editable Field.

### Flows

Multi-phase interactions.

Examples:

- Save;
- Upload;
- Delete;
- Search;
- Multi-step form.

### Adaptive

Components whose interaction model changes by context.

Examples:

- AdaptiveOverlay;
- AdaptiveNavigation;
- responsive layout primitives.

### Tokens

Semantic visual foundation.

Examples:

- color;
- typography;
- spacing;
- radius;
- shadow;
- motion;
- breakpoints;
- z-index.

## 7. MVP

The MVP should prove the concept, not maximize component count.

### Foundation

- tokens;
- themes;
- CSS variable output;
- layout primitives;
- typography;
- focus treatment;
- motion rules;
- Storybook;
- test setup.

### Interaction primitives

- Button;
- IconButton;
- Input;
- Textarea;
- Checkbox;
- RadioGroup;
- Switch;
- Tooltip;
- Dialog;
- Popover.

### Signature components

- AsyncButton;
- DataView / AsyncBoundary;
- AdaptiveOverlay;
- EmptyState;
- ErrorState;
- OfflineState;
- StateRail for docs/demo usage.

### First patterns

- Search + Filters;
- Save Bar;
- Delete Confirmation;
- Upload Flow.

## 8. Out of scope for MVP

Do not prioritize yet:

- enterprise DataGrid;
- charts;
- WYSIWYG editor;
- rich text;
- full date/time suite;
- tree editor;
- drag-and-drop page builder;
- native mobile components;
- framework support outside React.

These can be evaluated after the core state model is proven.

## 9. Success criteria for first public alpha

The alpha is successful when:

- a new consumer can install the React package and theme it without editing component source;
- core components are keyboard accessible;
- signature state-aware components are demonstrably simpler than rebuilding the same behavior manually;
- docs show realistic state transitions;
- packages are tree-shakeable;
- CI enforces build, type, test and lint checks;
- bundle cost for primitives remains reasonable;
- the library has at least one complete example product screen.

## 10. Tone and visual identity

Phasic UI should feel:

- technical;
- deliberate;
- resilient;
- modern;
- product-oriented;
- slightly experimental without becoming decorative or cyberpunk.

Avoid generic gradient-heavy SaaS aesthetics and excessive glassmorphism.

The visual direction is summarized in `DESIGN_SYSTEM.md`. Internal visual
references are intentionally kept outside the public repository.

# Component inventory and API direction

This is the working component map for Phasic UI.

It is intentionally prioritized by product value rather than alphabetical completeness.

## 1. Foundation primitives

### Layout

- `Box`
- `Stack`
- `Inline`
- `Grid`
- `Container`
- `Divider`
- `VisuallyHidden`

Expected capabilities:

- token-based spacing;
- semantic element override where safe;
- responsive values for selected layout props;
- minimal runtime logic.

### Typography

- `Text`
- `Heading`
- `Label`
- `Code`
- `Link`

Capabilities:

- semantic HTML;
- truncation / line clamp where appropriate;
- tokenized variants;
- no proprietary font dependency.

## 2. Actions

### Button

Variants:

```text
primary
secondary
ghost
danger
```

Sizes:

```text
sm
md
lg
```

States:

```text
disabled
pressed (when semantic)
```

Button itself should not own async state.

### IconButton

Requires accessible label.

### AsyncButton — signature component

Action phases:

```text
idle
pending
success
error
```

Capabilities:

- Promise-aware uncontrolled action;
- controlled phase;
- custom phase labels/icons;
- configurable success feedback duration;
- duplicate activation prevention while pending by default;
- no automatic toast side effect.

Possible API:

```tsx
<AsyncButton
  onAction={save}
  successLabel="Saved"
  errorLabel="Retry"
>
  Save changes
</AsyncButton>
```

## 3. Form controls

### FormField

Composition for:

- label;
- description;
- required/optional;
- error;
- correct ARIA relationships.

### Input

Capabilities:

- prefix/suffix slots;
- clear affordance as optional composition;
- invalid/readOnly/disabled;
- native input props.

### Textarea

### Checkbox

### CheckboxGroup

### RadioGroup

### Switch

### SearchInput

May build on Input plus clear/keyboard behavior.

### Select / Combobox

Not first-week scope. Implement after overlay/listbox foundation is stable.

Must include:

- keyboard navigation;
- typeahead/search where relevant;
- async option loading in higher-level pattern, not hidden inside base Select;
- empty state;
- loading state;
- virtualized list only when needed.

## 4. Overlays

### Tooltip

### Popover

### Dialog

### Drawer

### BottomSheet

### AdaptiveOverlay — signature component

One open state, different presentation.

Default conceptual mapping:

```text
Desktop -> Dialog
Tablet  -> Drawer
Mobile  -> BottomSheet
```

Consumer can override mapping.

## 5. Feedback and states

### Spinner

### Progress

### Skeleton

### Alert

### Toast / Toaster

Keep toast infrastructure decoupled from all async components.

### EmptyState

Suggested anatomy:

```text
icon/illustration
heading
description
primary action
secondary action
```

### ErrorState

Supports retry action and optional details.

### OfflineState

Should distinguish unavailable network from generic server error.

### SuccessState

Use sparingly for full-surface confirmations.

## 6. Data coordination

### DataView — signature component

Coordinates resource phases.

Example:

```tsx
<DataView
  state={state}
  loading={<Skeleton />}
  empty={<EmptyState />}
  error={({ retry }) => <ErrorState onRetry={retry} />}
>
  {(data) => <Results data={data} />}
</DataView>
```

Requirements:

- does not fetch data;
- can keep stale data rendered;
- can render offline-with-cache differently from offline-without-cache;
- does not force one query library.

### AsyncBoundary

Potential lower-level primitive below `DataView` if useful.

Do not create both publicly until their responsibility split is clear.

## 7. Navigation

- `Tabs`
- `SegmentedControl`
- `Breadcrumbs`
- `Pagination`
- `Menu`

Later:

- `NavigationMenu`
- `CommandPalette`

## 8. Content

- `Card`
- `Avatar`
- `AvatarGroup`
- `Badge`
- `Tag`
- `Chip`
- `List`
- `Accordion`

## 9. Data display

### Table

Basic semantic table styling and composition first.

### DataTable

Later abstraction around:

- sorting;
- selection;
- pagination;
- filters;
- loading/empty/error integration;
- row actions.

Do not attempt enterprise DataGrid in MVP.

## 10. Upload

### FileUpload

Base file selection/drop behavior.

### UploadFlow — signature pattern

States:

```text
ready -> pending(progress) -> success
                          \\-> error -> retry
```

Capabilities:

- file validation;
- progress display;
- retry/remove;
- accessible status announcement;
- application owns actual upload transport.

## 11. Patterns

Patterns may live in docs first before becoming package exports.

### Search + Filters

Combines search input, filter trigger, active filter chips and result state.

### Save Bar

For forms/pages with unsaved changes.

States:

```text
clean
modified
saving
saved
error
```

Map action semantics to canonical phases internally.

### Delete Confirmation

Composed Dialog/AdaptiveOverlay + destructive AsyncButton.

### Permission Denied

Clear access state with optional request-access action.

### EditableField

Display -> edit -> pending -> success/error.

## 12. Documentation component

### StateRail

Used in docs/showcase to switch a scenario through representative states.

It may be exported from a docs/demo package later, but should not inflate the core React runtime package without demand.

## 13. Priority groups

### P0 — foundation

```text
Tokens
Provider
Box/Stack/Inline
Text/Heading
Button
IconButton
FormField
Input
Checkbox
Switch
Dialog
Tooltip
Skeleton
Spinner
```

### P1 — prove Phasic's differentiator

```text
AsyncButton
DataView
EmptyState
ErrorState
OfflineState
AdaptiveOverlay
StateRail demo
```

### P2 — common product surface

```text
Textarea
RadioGroup
Popover
Drawer
BottomSheet
Tabs
SegmentedControl
Alert
Toast
Card
Badge/Tag/Chip
Accordion
```

### P3 — patterns and richer controls

```text
Select
Combobox
Search + Filters
Save Bar
Delete Confirmation
FileUpload
Upload Flow
Table/DataTable
CommandPalette
```

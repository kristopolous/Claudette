# Effort Command (`effort`)

## Purpose
Sets the effort level (low, medium, high, max, auto) for the model's reasoning and testing depth. Displays current effort, handles environment variable overrides, and persists user settings.

## Imports
### Stdlib
- REACT (including `useState`, `useEffect`)

### Internal
- `useMainLoopModel` from `.././hooks/useMainLoopModel`
- `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` type and `logEvent` from `.././services/analytics/index`
- `useAppState`, `useSetAppState` from `.././state/AppState`
- `LocalJSXCommandOnDone` type from `.././types/command`
- Types and functions: `EffortValue`, `getDisplayedEffortLevel`, `getEffortEnvOverride`, `getEffortValueDescription`, `isEffortLevel`, `toPersistableEffort` from `.././utils/effort`
- `updateSettingsForSource` from `.././utils/settings/settings`

## Logic
The `call` async function:
- Shows help for 'help', '-h', '--help'.
- With no args or 'current'/'status': renders `<ShowCurrentEffort>` which displays the current effort (considering env overrides and model defaults).
- With an effort argument: calls `executeEffort()` and renders `<ApplyEffortAndClose>` which applies the change and shows the result.

Key functions:
- `executeEffort(args)`: Parses the argument; calls `unsetEffortLevel()` for 'auto'/'unset'; validates against `isEffortLevel`; calls `setEffortValue()`.
- `setEffortValue(effortValue)`: Converts to persistable form, updates user settings via `updateSettingsForSource`, logs analytics. Checks for env override (`CLAUDE_CODE_EFFORT_LEVEL`) and warns if it conflicts. Returns result message.
- `unsetEffortLevel()`: Clears `effortLevel` from settings, logs analytics. Warns if env override is active.
- `showCurrentEffort(appStateEffort, model)`: Computes effective effort (env > appState > auto model-based) and returns descriptive message.
- `ApplyEffortAndClose`: UI component that applies `effortUpdate` to app state via `setAppState` on mount, then calls `onDone` with message.
- `ShowCurrentEffort`: UI component that calls `showCurrentEffort()` and immediately invokes `onDone`.

Constants:
- `COMMON_HELP_ARGS`: `['help', '-h', '--help']`

## Exports
- `call` (async function) - Command entry point
- `showCurrentEffort` (function) - Generates current effort message
- `executeEffort` (function) - Argument parser/executor
- `setEffortValue` (function) - Sets and persists an effort level
- `unsetEffortLevel` (function) - Clears persisted effort
- `ShowCurrentEffort` (UI component) - Displays current effort
- `ApplyEffortAndClose` (UI component) - Applies effort change and closes
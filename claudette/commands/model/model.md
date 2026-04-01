# Model Command (`model`)

## Purpose
Allows users to select or set the AI model for Claudette. Supports interactive model picking via ModelPicker, direct model specification via argument, and displays the current model. Handles validation, 1M context access checks, fast mode interactions, and effort display.

## Imports
### External
- `chalk` (for colored terminal output)

### Stdlib
- `react` (including `useState`, `useEffect`)

### Internal
- `CommandResultDisplay` type from `../../commands.js`
- `ModelPicker` component from `../../components/ModelPicker.js`
- `COMMON_HELP_ARGS`, `COMMON_INFO_ARGS` from `../../constants/xml.js`
- `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` type and `logEvent` from `../../services/analytics/index.js`
- `useAppState`, `useSetAppState` from `../../state/AppState.js`
- `LocalJSXCommandCall` type from `../../types/command.js`
- `EffortLevel` type from `../../utils/effort.js`
- `isBilledAsExtraUsage` from `../../utils/extraUsage.js`
- `clearFastModeCooldown`, `isFastModeAvailable`, `isFastModeEnabled`, `isFastModeSupportedByModel` from `../../utils/fastMode.js`
- `MODEL_ALIASES` from `../../utils/model/aliases.js`
- `checkOpus1mAccess`, `checkSonnet1mAccess` from `../../utils/model/check1mAccess.js`
- `getDefaultMainLoopModelSetting`, `isOpus1mMergeEnabled`, `renderDefaultModelSetting` from `../../utils/model/model.js`
- `isModelAllowed` from `../../utils/model/modelAllowlist.js`
- `validateModel` from `../../utils/model/validateModel.js`

## Logic
The `call` async function receives `args` and dispatches:
- If `args` is in `COMMON_INFO_ARGS` (like '?', 'i'): renders `<ShowModelAndClose>` which displays the current model (including any session override) and effort.
- If `args` is in `COMMON_HELP_ARGS` (help flags): shows usage help message.
- If `args` is provided: renders `<SetModelAndClose>` which validates and sets the model, checking for 1M access, model allowlist, aliases, and fast mode implications.
- If no args: renders `<ModelPickerWrapper>` which shows the interactive `ModelPicker` dialog.

Key helpers:
- `renderModelLabel(model)`: Renders model display name, appending "(default)" if null.
- `isKnownAlias(model)`: Checks if model matches a predefined alias.
- `isOpus1mUnavailable(model)`: Returns true if model includes Opus with 1M but account lacks access and merge is disabled.
- `isSonnet1mUnavailable(model)`: Similar for Sonnet 1M.
- `SetModelAndClose`: React component that performs model validation/change in a `useEffect`, then calls `onDone` with result. Bypasses validation for 'default' and known aliases.
- `ModelPickerWrapper`: Memoized component that renders `ModelPicker` with current model, session override, and handles selection/cancellation. Shows fast mode notice if applicable.
- `ShowModelAndClose`: Displays current model (including session override from plan mode) and effort.

## Exports
- `call` (async function) - Main command handler
- `renderModelLabel` (function) - Formats model for display
- `SetModelAndClose` (React component) - Sets model from argument
- `ModelPickerWrapper` (React component) - Interactive model picker
- `ShowModelAndClose` (React component) - Shows current model
- `isKnownAlias` (function) - Alias check
- `isOpus1mUnavailable` (function) - 1M access check for Opus
- `isSonnet1mUnavailable` (function) - 1M access check for Sonnet
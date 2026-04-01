# Tag Command (`tag`)

## Purpose
Toggles a searchable tag on the current session. Tags appear after the branch name in `/resume` and can be searched with `/`. Provides add and remove (with confirmation) functionality. Sanitizes Unicode in tag names.

## Imports
### External
- `chalk` (for colored output)

### Stdlib
- `crypto` (`UUID` type)

### Internal
- `getSessionId` from `../../bootstrap/state.js`
- `CommandResultDisplay` type from `../../commands.js`
- `Select` from `../../components/CustomSelect/select.js`
- `Dialog` from `../../components/design-system/Dialog.js`
- `COMMON_HELP_ARGS`, `COMMON_INFO_ARGS` from `../../constants/xml.js`
- `Box`, `Text` from `../../ink.js`
- `logEvent` from `../../services/analytics/index.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`
- `recursivelySanitizeUnicode` from `../../utils/sanitization.js`
- `getCurrentSessionTag`, `getTranscriptPath`, `saveTag` from `../../utils/sessionStorage.js`

## Logic
The `call` async function receives `onDone`, `_context`, and optional `args`:
1. Normalizes `args`. If `args` is a help/info flag or empty, renders `<ShowHelp>` which displays a usage message (including examples) with `display: 'system'`.
2. Otherwise, renders `<ToggleTagAndClose tagName={args} onDone={onDone} />`.

`ToggleTagAndClose` component:
- State: `showConfirm`, `sessionId`.
- `useEffect` on mount:
  - Gets `sessionId` via `getSessionId()`. If none, reports error.
  - Sanitizes and trims `tagName` to `normalizedTag`. If empty, reports error.
  - Fetches `currentTag` via `getCurrentSessionTag(id)`.
  - If `currentTag === normalizedTag`: sets `showConfirm` to true to prompt removal.
  - Else (new or replacing):
    - Logs `tengu_tag_command_add` with `is_replacing`.
    - Calls `saveTag(id, normalizedTag, getTranscriptPath())` then reports success `Tagged session with #tag`.
- If `showConfirm` and `sessionId`:
  - Renders `<ConfirmRemoveTag>` with "Yes, remove tag" / "No, keep tag" options.
  - "Yes": logs `tengu_tag_command_remove_confirmed`, saves empty tag, reports removal.
  - "No": logs `tengu_tag_command_remove_cancelled`, reports keep.

`ConfirmRemoveTag` component: Memoized; displays current tag and a question; returns a `Select` with yes/no.

`ShowHelp` component: On mount, calls `onDone` with a multiline usage help string.

## Exports
- `call` (async function) - Main handler; shows help or toggles tag UI
- `ToggleTagAndClose` (React component) - Tag toggle logic with confirmation
- `ShowHelp` (React component) - Displays help text
- `ConfirmRemoveTag` (React component) - Removal confirmation dialog
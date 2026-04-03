## Purpose
Registers global and transcript-mode keybinding handlers for UI toggles (todos, transcript, brief, terminal, redraw, etc.).

## Imports
- **External**: `react` (useCallback), BUILDFLAGS (feature)
- **Internal**:
  - `./keybindings/useKeybinding` (useKeybinding)
  - `./screens/REPL` (Screen type)
  - `./services/analytics/growthbook` (getFeatureValue_CACHED_MAY_BE_STALE)
  - `./services/analytics/index` (logEvent, AnalyticsMetadata type)
  - `./state/AppState` (useAppState, useSetAppState)
  - `./utils/array` (count)
  - `./utils/terminalPanel` (getTerminalPanel)

## Logic
Component takes `Props` (screen state, setters, messageCount, optional callbacks, virtualScrollActive, searchBarOpen). Registers handlers via `useKeybinding`:
- `app:toggleTodos` (Ctrl+T): cycles expandedView (none ↔ tasks ↔ teammates ↔ none; considers teammate presence)
- `app:toggleTranscript` (Ctrl+O): toggles between 'prompt' and 'transcript' screens; logs event
- `transcript:toggleShowAll` (Ctrl+E): toggles `showAllInTranscript`; only active in transcript mode and when virtual scroll not active
- `transcript:exit` (Ctrl+C or Escape): exits transcript to prompt; logs
- `app:toggleBrief` (Ctrl+Shift+B): if KAIROS feature andBrief enabled, toggles `isBriefOnly` state
- `app:toggleTerminal` (Meta+J): if TERMINAL_PANEL feature, toggles terminal panel
- `app:redraw` (Ctrl+L): forces Ink redraw (recovery after external clear)
- `app:toggleTeammatePreview`: toggles `showTeammateMessagePreview` in appState
All bindings use appropriate contexts and isActive conditions.

## Exports
- `GlobalKeybindingHandlers` - React component `Props` (returns null)

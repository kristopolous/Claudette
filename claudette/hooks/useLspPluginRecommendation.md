## Purpose
Recommends LSP plugins to users when they edit files with extensions that have matching LSP servers installed on the system, but the corresponding plugin isn't yet installed.

## Imports
- **Stdlib**: `path` (`extname`, `join`)
- **External**: REACT (`c` for compiler runtime, `useRef`, `useEffect`)
- **Internal**:
  - `bootstrap/state` - session state for LSP recommendation visibility
  - `context/notifications` - `useNotifications` for UI notifications
  - `state/AppState` - `useAppState` to access tracked files
  - `utils/config` - `saveGlobalConfig` for persistent settings
  - `utils/debug` - `logForDebugging` for dev diagnostics
  - `utils/log` - `logError` for error reporting
  - `utils/plugins/lspRecommendation` - plugin matching and user preference tracking
  - `utils/plugins/pluginInstallationHelpers` - `cacheAndRegisterPlugin` for installation
  - `utils/settings/settings` - settings getters/updaters
  - `hooks/usePluginRecommendationBase` - base recommendation logic

## Logic
The hook builds on `usePluginRecommendationBase` and focuses on the LSP-specific recommendation flow:

- Tracks which files have been checked using a `checkedFilesRef` (set) to avoid re-scanning.
- When the list of tracked files changes, it processes only new files. For each file, it calls `getMatchingLspPlugins` to find installed LSP servers that support that file extension.
- On the first match, it sets a recommendation with the plugin's metadata and marks the session as having shown an LSP recommendation.
- The hook returns `recommendation` (or `null`) and a `handleResponse` function that manages user interaction:
  - `"yes"`: installs the plugin, enables it in user settings, caches and registers it.
  - `"no"`: if the menu timed out (elapsed >28s) the ignored count is incremented; otherwise it's a simple dismissal.
  - `"never"`: adds the plugin to a "never suggest" list.
  - `"disable"`: disables all LSP recommendations globally via `saveGlobalConfig`.

The REACT_COMPILER optimizes memoization of callbacks; a 30-second menu auto-dismiss threshold informs the timeout detection.

## Exports
- `useLspPluginRecommendation` - main hook returning recommendation state and response handler
- `LspRecommendationState` - type for recommendation details (`pluginId`, `pluginName`, `pluginDescription`, `fileExtension`, `shownAt`)

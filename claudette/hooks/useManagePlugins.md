## Purpose
Bootstraps the plugin system on app mount: discovers, loads, and validates plugins; surfaces flagged or delisted plugin notifications; and prompts user to reload when plugin files change externally.

## Imports
- **Stdlib**: None
- **External**: `react` (`useCallback`, `useEffect`)
- **Internal**:
  - `commands` - `Command` type
  - `context/notifications` - `useNotifications`
  - `services/analytics` - `logEvent` for telemetry
  - `services/lsp/manager` - `reinitializeLspServerManager`
  - `state/AppState` - `useAppState`, `useSetAppState`
  - `tools/AgentTool/loadAgentsDir` - `AgentDefinition` type
  - `utils/array` - `count` helper
  - `utils/debug` - `logForDebugging`
  - `utils/diagLogs` - `logForDiagnosticsNoPII`
  - `utils/errors` - `toError`
  - `utils/log` - `logError`
  - `utils/plugins/*` - loading, LSP/MCP integration, blocklist, flagging

## Logic
The hook runs two primary effects:

1. **Initial plugin load** (on mount if `enabled`):
   - Calls `loadAllPlugins()` to get `enabled`, `disabled`, and `errors` arrays.
   - Enforces delisting: `detectAndUninstallDelistedPlugins()` auto-uninstalls delisted plugins.
   - Checks `getFlaggedPlugins()` and adds a high-priority notification if any.
   - Loads commands, agents, and hooks individually with try/catch, pushing errors to the shared array so they appear in the Doctor UI.
   - Loads MCP servers per plugin to count `mcp_count`.
   - Loads LSP servers per plugin, then calls `reinitializeLspServerManager()` to refresh LSP manager.
   - Merges new plugin load errors with existing LSP errors in AppState to preserve non-plugin-load LSP issues.
   - Computes metrics (counts for enabled/disabled, inline vs marketplace, errors, skills, agents, hooks, mcp, lsp). For Anthropic employees (`USER_TYPE === 'ant'`), includes a sorted comma-separated list of enabled plugin names for correlation diagnostics.
   - Emits telemetry: `tengu_plugins_loaded` with metrics and diagnostics.
   - On failure: logs error, sets empty plugin state but preserves existing LSP errors, returns failure metrics.

2. **Reload reminder** (when `needsRefresh` is true):
   - Shows a low-priority notification instructing the user to run `/reload-plugins`. Does not auto-refresh.

## Exports
- `useManagePlugins` - hook accepting `{ enabled?: boolean }` options; runs loading and reload detection.

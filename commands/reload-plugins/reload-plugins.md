# Reload Plugins Command (`reload-plugins`)

## Purpose
Reloads plugins in the current session, activating pending changes. In remote/CCR modes with feature flag, also re-downloads user settings. Reports counts of loaded components and any errors.

## Imports
### External
- `bun:bundle` (`feature` for feature flags)

### Internal
- `getIsRemoteMode` from `../../bootstrap/state.js`
- `redownloadUserSettings` from `../../services/settingsSync/index.js`
- `LocalCommandCall` type from `../../types/command.js`
- `isEnvTruthy` from `../../utils/envUtils.js`
- `refreshActivePlugins` from `../../utils/plugins/refresh.js`
- `settingsChangeDetector` from `../../utils/settings/changeDetector.js`
- `plural` from `../../utils/stringUtils.js`

## Logic
The `call` async function receives `_args` and `context`:
1. If `DOWNLOAD_USER_SETTINGS` feature is enabled and running in remote mode (`CLAUDE_CODE_REMOTE` env or `getIsRemoteMode()`), calls `redownloadUserSettings()`. If settings were applied, notifies `settingsChangeDetector` of a userSettings change.
2. Calls `refreshActivePlugins(context.setAppState)` to reload plugins and collect counts: `enabled_count`, `command_count`, `agent_count`, `hook_count`, `mcp_count`, `lsp_count`, `error_count`.
3. Constructs a message: `"Reloaded: X plugin(s) · Y skill(s) · Z agent(s) · W hook(s) · V plugin MCP server(s) · U plugin LSP server(s)"` using `plural()` for proper singular/plural forms.
4. If `error_count > 0`, appends `"\nN error(s) during load. Run /doctor for details."`
5. Returns `{ type: 'text', value: msg }`.

Helper:
- `n(count, noun)`: Returns `"count noun(pluralized)"` string.

## Exports
- `call` (async function) - Command handler that reloads plugins and returns status text
- `n` (function) - Pluralization helper
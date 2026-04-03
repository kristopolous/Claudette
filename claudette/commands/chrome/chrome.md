# Chrome Command (`chrome`)

## Purpose
Provides a configuration interface for Claude in Chrome (Beta). Allows users to install the Chrome extension, reconnect, manage permissions, and toggle default behavior. Only available in `claude-ai` mode and when not in a non-interactive session.

## Imports
### Stdlib
- REACT (including `useState`, compiler-runtime)

### Internal
- `OptionWithDescription` type and `Select` component from `.././components/CustomSelect/select`
- `Dialog` from `../../components/designsystem/Dialog`
- `Box`, `Text` from `.././ink`
- `useAppState` from `.././state/AppState`
- `CLAUDE_IN_CHROME_MCP_SERVER_NAME`, `openInChrome` from `.././utils/claudeInChrome/common`
- `isChromeExtensionInstalled` from `.././utils/claudeInChrome/setup`
- `getGlobalConfig`, `saveGlobalConfig` from `.././utils/config`
- `env` from `.././utils/env`
- `isRunningOnHomespace` from `.././utils/envUtils`
- `isClaudeAISubscriber` from `.././utils/auth`
- `openBrowser` from `.././utils/browser`

## Logic
The `call` async function:
1. Checks if the Chrome extension is installed via `isChromeExtensionInstalled()`.
2. Loads global config and checks subscriber status.
3. Determines if running in WSL via `env.isWslEnvironment()`.
4. Renders the `ClaudeInChromeMenu` component with these status values.

`ClaudeInChromeMenu` (memoized UI component):
- Displays warnings for WSL and non-subscriber users.
- Shows current status (enabled/disabled, extension installed/detected).
- Builds a list of options based on state:
  - "Install Chrome extension" (if not installed)
  - "Manage permissions" (always, with suffix if extension not installed)
  - "Reconnect extension" (always, with suffix if extension not installed)
  - "Enabled by default: Yes/No" toggle
- `handleAction` processes selections:
  - `install-extension`: Opens extension install URL and shows hint.
  - `reconnect`: Re-checks extension detection; opens reconnect URL.
  - `manage-permissions`: Opens Chrome permissions URL.
  - `toggle-default`: Saves the opposite value to global config.
- Wraps content in a Dialog with title "Claude in Chrome (Beta)".

Constants:
- `CHROME_EXTENSION_URL`: 'https://claude.ai/chrome'
- `CHROME_PERMISSIONS_URL`: 'https://clau.de/chrome/permissions'
- `CHROME_RECONNECT_URL`: 'https://clau.de/chrome/reconnect'

## Exports
- `call` (async function) - Main command handler that renders the configuration dialog
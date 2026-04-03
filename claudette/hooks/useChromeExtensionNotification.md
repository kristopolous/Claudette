## Purpose
Shows startup notification about Claude in Chrome extension availability and subscription requirements.

## Imports
- **External**: REACT
- **Internal**:
  - `./ink` (Text)
  - `./utils/auth` (isClaudeAISubscriber)
  - `./utils/claudeInChrome/setup` (isChromeExtensionInstalled, shouldEnableClaudeInChrome)
  - `./utils/envUtils` (isRunningOnHomespace)
  - `/notifs/useStartupNotification` (useStartupNotification)

## Logic
1. `getChromeFlag()`: reads `--chrome`/`--no-chrome` CLI flags
2. Hook uses `useStartupNotification` with async notification builder `_temp`
3. `_temp()` checks:
   - If `shouldEnableClaudeInChrome(chromeFlag)` returns false → no notification
   - If not a subscriber → error notification (requires subscription)
   - If extension not installed (and not on homespace) → warning with install link
   - If chromeFlag not explicitly provided → low-priority notice that Chrome mode is enabled by default
4. Notification objects specify `key`, `jsx` or `text`, `priority`, `timeoutMs`

## Exports
- `useChromeExtensionNotification` - Startup notification hook for Chrome extension

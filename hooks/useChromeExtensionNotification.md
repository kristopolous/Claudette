## Purpose
Shows startup notification about Claude in Chrome extension availability and subscription requirements.

## Imports
- **External**: `react`
- **Internal**:
  - `../ink.js` (Text)
  - `../utils/auth.js` (isClaudeAISubscriber)
  - `../utils/claudeInChrome/setup.js` (isChromeExtensionInstalled, shouldEnableClaudeInChrome)
  - `../utils/envUtils.js` (isRunningOnHomespace)
  - `./notifs/useStartupNotification.js` (useStartupNotification)

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

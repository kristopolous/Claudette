## Purpose
Handles the OAuth authentication flow for logging into the inference provider, supporting multiple login methods and manual code entry fallback.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT/compiler-runtime
- **Internal**: services/analytics/index (logEvent), cli/handlers/auth (installOAuthTokens), hooks/useTerminalSize (useTerminalSize), ink/termio/osc (setClipboard), ink/useTerminalNotification (useTerminalNotification), ink (Box, Link, Text), keybindings/useKeybinding (useKeybinding), services/api/errorUtils (getSSLErrorHint), services/notifier (sendNotification), services/oauth/index (OAuthService), utils/auth (getOauthAccountInfo, validateForceLoginOrg), utils/log (logError), utils/settings/settings (getSettings_DEPRECATED), CustomSelect/select (Select), design-system/KeyboardShortcutHint (KeyboardShortcutHint), Spinner (Spinner), TextInput (TextInput)

## Logic
1. Manages OAuth state machine with states: idle, platform_setup, ready_to_start, waiting_for_login, creating_api_key, about_to_retry, success, error
2. Supports login via subscription account, inference provider console, or third-party platforms (Bedrock, Foundry, Vertex AI)
3. Opens browser for OAuth flow, with fallback to manual code paste if browser fails to open
4. Handles authorization code exchange, API key creation, and token installation
5. Provides retry logic with SSL error hints for enterprise TLS proxy issues
6. Auto-exits in setup-token mode after displaying the generated token
7. OAuthStatusMessage sub-component renders UI for each state in the OAuth flow

## Exports
- `ConsoleOAuthFlow` - UI component managing the complete OAuth login flow

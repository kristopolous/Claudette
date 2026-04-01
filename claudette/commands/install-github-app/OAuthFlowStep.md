## Purpose
Step component handling OAuth token creation flow for GitHub App installation.

## Imports
- **External**: `react`
- **Internal**: `Spinner`, `TextInput`, `useTerminalSize`, `KeyboardShortcutHint`, `setClipboard`, `Box`, `Link`, `Text`, `OAuthService`, `saveOAuthTokensIfNeeded`, `logError`, type `KeyboardEvent`

## Logic
Manages a multi-state OAuth flow: starting, waiting_for_login (opens browser, may show paste prompt after 3s), processing, success, error, and about_to_retry. Uses `OAuthService` to start the flow and handle manual code entry. Copies URL to clipboard on 'c' key press. Retries on error with Enter. Automatically advances after success. Integrates with the main install flow to produce a long-lived token.

## Exports
- `OAuthFlowStep` - React component (props: onSuccess: (token: string) => void, onCancel: () => void)

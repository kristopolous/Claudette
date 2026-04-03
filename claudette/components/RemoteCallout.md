## Purpose
Displays a one-time dialog prompting the user to enable remote control access to the CLI session from the web or Claude app.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `isBridgeEnabled`, `Box`, `Text`, `getClaudeAIOAuthTokens`, `getGlobalConfig`, `saveGlobalConfig`, `Select`, `PermissionDialog`

## Logic
On mount, permanently marks the dialog as seen in global config so it only shows once. Presents the user with two options: enable remote control (opens a secure connection to claude.ai) or dismiss. The dialog only appears if the bridge is enabled, OAuth tokens exist, and the dialog has not been previously dismissed.

## Exports
- `RemoteCallout` - renders the remote control enable/dismiss dialog
- `shouldShowRemoteCallout` - checks whether the remote callout should be displayed based on config, bridge status, and auth tokens

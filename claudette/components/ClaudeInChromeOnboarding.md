## Purpose
Displays an onboarding dialog explaining the Chrome extension integration for browser control.

## Imports
- **Stdlib**: None
- **External**: `react`
- **Internal**: `ink`, `Dialog`, analytics, Chrome extension setup utilities, config utilities

## Logic
1. On mount, logs an analytics event, checks if the Chrome extension is installed, and marks onboarding as completed in global config
2. Listens for Enter key to dismiss the dialog
3. Renders an explanation of Chrome integration capabilities (navigation, form filling, screenshots, GIFs, debugging)
4. Shows an installation prompt with link if the extension is not installed
5. Displays a permissions management link when the extension is installed
6. Provides a reference to the /chrome command and documentation URL

## Exports
- `ClaudeInChromeOnboarding` - renders an onboarding dialog for the Chrome extension integration with installation status detection and Enter-to-dismiss

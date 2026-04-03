## Purpose
Handles the handoff flow from the terminal interface to the desktop application, checking installation status and transferring the session.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `commands`, `ink`, `utils/browser`, `utils/desktopDeepLink`, `utils/errors`, `utils/gracefulShutdown`, `utils/sessionStorage`, `components/design-system/LoadingState`

## Logic
1. Checks if the desktop app is installed and meets minimum version requirements
2. Prompts the user to download if not installed, opening the browser on confirmation
3. Flushes session storage before attempting to open the desktop app
4. Transfers the current session via deep link and shuts down gracefully on success
5. Displays loading states for each phase and error handling with retry option

## Exports
- `DesktopHandoff` - UI component that manages the terminal-to-desktop session transfer flow
- `getDownloadUrl` - function that returns the platform-specific desktop app download URL

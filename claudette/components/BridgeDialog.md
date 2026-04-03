## Purpose
A dialog component that handles the connection status and user interaction for establishing and controlling remote REPL or shell sessions, providing visual feedback and actionable controls.

## Imports
- **Stdlib**: `path`
- **External**: `qrcode`, REACT
- **Internal**: `../bootstrap/state`, `../bridge/bridgeStatusUtil`, `../constants/figures`, `../context/overlayContext`, `../ink`, `../keybindings/useKeybinding`, `../state/AppState`, `../utils/config`, `../utils/git`, `./design-system/Dialog`

## Logic
1. **Connection Status Monitoring**:
    - Tracks the state of the remote connection using context hooks (`useAppState`), reflecting states such as `connected`, `sessionActive`, `reconnecting`, and `error`.
    - Displays a status indicator and label that dynamically updates based on the current connection state.
2. **Contextual Information Display**:
    - Shows the relevant URL for connecting or the active session URL.
    - Displays the current Git repository name and branch for context.
    - Includes an option to show a QR code for the connection URL, facilitating mobile or alternative client connections.
3. **User Interaction and Control**:
    - Provides clear keyboard shortcuts for common actions:
        - `Enter` or `Esc` to close the dialog.
        - `Space` to toggle the QR code visibility.
        - `d` to disconnect the active remote session (with explicit confirmation if remote control was manually enabled).
4. **Error Handling**: Prominently displays any connection errors encountered, guiding the user towards resolution.
5. **State Persistence**: Allows explicit disabling of remote control at startup by saving a preference to the global configuration.

## Exports
- `BridgeDialog` - A functional component that renders the remote control connection interface.

## Purpose
Displays a dialog for managing remote control bridge connections with QR code support.

## Imports
- **Stdlib**: `path`
- **External**: `qrcode`, `react`
- **Internal**: `../bootstrap/state`, `../bridge/bridgeStatusUtil`, `../constants/figures`, `../context/overlayContext`, `../ink`, `../keybindings/useKeybinding`, `../state/AppState`, `../utils/config`, `../utils/git`, `./design-system/Dialog`

## Logic
Reads app state for bridge connection status, session URLs, and errors. Fetches the current git branch on mount. Generates QR codes for connection URLs on demand. Displays connection status with indicators, environment/session IDs in verbose mode, and optional QR code rendering. Handles disconnect via raw 'd' key input and toggles QR display via space bar.

## Exports
- `BridgeDialog` - dialog that shows remote control bridge status and allows disconnection

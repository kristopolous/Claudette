## Purpose
Manages the bidirectional Remote Control bridge connection for Claudette on the web.

## Imports
- **Stdlib**: `child_process` (spawnSync)
- **External**: `qrcode`, `react`
- **Internal**: `checkBridgePrerequisites`, `getBridgeAccessToken`, `BRIDGE_LOGIN_INSTRUCTION`, `REMOTE_CONTROL_DISCONNECTED_MSG`, `useRegisterOverlay`, `Dialog`, `ListItem`, `shouldShowRemoteCallout`, `Box`, `Text`, `useKeybindings`, `logEvent`, `useAppState`, `useSetAppState`, `LocalJSXCommandContext`, types

## Logic
Provides the `/remote-control` command (alias `rc`). `checkBridgePrerequisites` ensures policy, version, and auth token are valid. `BridgeToggle` component handles the command: if already connected, shows a disconnect dialog; otherwise, checks prerequisites, may show a callout, enables `replBridgeEnabled` in app state (which triggers connection in REPL), and shows a connecting message. `BridgeDisconnectDialog` displays the session URL (with optional QR code), and options to disconnect, toggle QR, or continue. `call` renders `BridgeToggle` with optional name argument.

## Exports
- `call` - JSX command function
- `BridgeToggle` - Main component
- `BridgeDisconnectDialog` - Disconnect confirmation dialog
- `checkBridgePrerequisites` (internal)

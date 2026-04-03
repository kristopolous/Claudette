# Session Command (`session`)

## Purpose
Displays the remote session URL and a QR code when Claudette is running in remote mode (e.g., via `claude --remote`). Allows quick access from mobile devices. Hidden when not in remote mode.

## Imports
### External
- `qrcode` (`toString` function to generate QR code string)

### Stdlib
- REACT (including `useState`, `useEffect`)

### Internal
- `Pane` from `../../components/designsystem/Pane`
- `Box`, `Text` from `.././ink`
- `useKeybinding` from `.././keybindings/useKeybinding`
- `useAppState` from `.././state/AppState`
- `LocalJSXCommandCall` type from `.././types/command`
- `logForDebugging` from `.././utils/debug`

## Logic
The `call` async function renders the `SessionInfo` component.

`SessionInfo` component:
- Reads `remoteSessionUrl` from app state via `useAppState`.
- Generates a QR code using `qrToString(url)` when `remoteSessionUrl` changes (via `useEffect`).
- Binds the `'confirm:no'` keybinding (escape) to `onDone`.
- If `remoteSessionUrl` is falsy: displays a warning `Pane` indicating that remote mode is not active and suggesting `claude --remote`.
- If `remoteSessionUrl` exists:
  - Splits the QR code string into lines (filtering empties) for monospace display.
  - Shows a `Pane` containing:
    - `"Remote session"` header (bold).
    - QR code lines (or "Generating QR code…" if loading).
    - `"Open in browser: "` followed by the URL in `ide` color.
    - A dimmed hint `"(press esc to close)"`.
- `logForDebugging` is used in the QR code generation catch.

## Exports
- `call` (async function) - Renders the remote session info dialog
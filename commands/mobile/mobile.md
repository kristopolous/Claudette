# Mobile Command (`mobile`)

## Purpose
Displays a QR code to download the Claude mobile app. Supports switching between iOS and Android platforms. Aliases: `ios`, `android`.

## Imports
### External
- `qrcode` (`toString` function to generate QR code string)

### Stdlib
- `react` (including `useState`, `useEffect`, `useCallback`)

### Internal
- `Pane` from `../../components/design-system/Pane.js`
- `KeyboardEvent` type from `../../ink/events/keyboard-event.js`
- `Box`, `Text` from `../../ink.js`
- `useKeybinding` from `../../keybindings/useKeybinding.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`

## Logic
The `call` async function renders the `MobileQRCode` component.

`MobileQRCode` component:
- State: `platform` (default 'ios'), `qrCodes` (object with ios/android strings).
- `PLATFORMS` constant maps platform to App Store / Play Store URLs.
- `useEffect` generates QR codes for both platforms in parallel using `qrToString`.
- `handleKeyDown`:
  - `q` or `Ctrl+C` closes the dialog.
  - `tab`, `left`, `right` toggles the platform between ios and android.
- `handleClose` bound to 'confirm:no' keybinding (escape).
- Renders a `Pane` containing:
  - A `Box` with the platform selector (iOS / Android) and hint "(tab to switch, esc to close)".
  - The URL (dimmed).
  - The QR code (each line as a `Text` component).
  - The QR code is displayed by splitting the string into lines and rendering them to preserve monospace layout.

## Exports
- `call` (async function) - Renders the QR code dialog
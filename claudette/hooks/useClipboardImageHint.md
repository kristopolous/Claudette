## Purpose
Notifies user when terminal regains focus and clipboard contains an image, suggesting the paste shortcut.

## Imports
- **External**: REACT (useEffect, useRef)
- **Internal**:
  - `./context/notifications` (useNotifications)
  - `./keybindings/shortcutFormat` (getShortcutDisplay)
  - `./utils/imagePaste` (hasImageInClipboard)

## Logic
1. Triggers on focus regain: previous `isFocused` false → current true
2. Requires `enabled` (image paste feature is on)
3. Debounces focus changes by 1 second (batching rapid toggles)
4. Cooldown: 30 seconds between hints to avoid spam
5. Async check `hasImageInClipboard()` (may run `osascript` on macOS)
6. If image detected: shows immediate notification for 8 seconds with paste shortcut
7. Cleanup: cancels pending timeout on unmount or re-trigger

## Exports
- `useClipboardImageHint` - Hook `(isFocused: boolean, enabled: boolean) => void`

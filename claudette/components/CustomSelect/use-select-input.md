## Purpose
Handles keyboard input for select components, routing navigation, selection, and input-mode toggling based on component state.

## Imports
- **Stdlib**: none
- **External**: REACT (useMemo)
- **Internal**: `context/overlayContext` (useRegisterOverlay), `ink/events/input-event` (InputEvent), `ink` (useInput), `keybindings/useKeybinding` (useKeybindings), `utils/stringUtils` (normalizeFullWidthDigits, normalizeFullWidthSpace), `select` (OptionWithDescription), `use-select-state` (SelectState)

## Logic
Registers as an overlay to prevent Escape interception. Determines if the focused option is an input type. Sets up keybinding handlers for next/previous/accept/cancel actions that are disabled when in input mode. Uses `useInput` for remaining keys: Tab toggles input mode, arrow keys navigate (with boundary callbacks), PageUp/PageDown paginate, Space toggles selection in multi-select mode, and numeric keys select by index. When in input mode, suppresses selection handling so digits pass through to the text field, but still allows arrow navigation. Input-type options with image support can enter image selection mode via down arrow.

## Exports
- `useSelectInput` - hook that sets up keyboard input handling for select components
- `UseSelectProps` - type defining input props for the hook

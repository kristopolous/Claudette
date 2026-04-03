## Purpose
UI hooks that register action handlers and respond to keybinding matches, with support for multi-keystroke chord sequences.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useEffect)
- **Internal**: `ink/events/input-event` (InputEvent), `ink` (Key, useInput), `KeybindingContext` (useOptionalKeybindingContext), `types` (KeybindingContextName)

## Logic
Registers handler functions with the keybinding context's handler registry on mount and unregisters on unmount. On each key event, resolves the input against active contexts and invokes the handler when the resolved action matches. Supports chord sequences by updating pending chord state through the context. Handlers returning false allow event propagation to fall through to other handlers.

## Exports
- `useKeybinding` - registers a single action handler and invokes it when the configured binding is triggered
- `useKeybindings` - registers multiple action handlers at once to reduce useInput calls

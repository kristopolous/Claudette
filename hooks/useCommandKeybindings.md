## Purpose
Registers keybinding handlers for "command:*" actions; invokes corresponding slash commands immediately without clearing input.

## Imports
- **External**: `react` (useMemo)
- **Internal**:
  - `../context/overlayContext.js` (useIsModalOverlayActive)
  - `../keybindings/KeybindingContext.js` (useOptionalKeybindingContext)
  - `../keybindings/useKeybinding.js` (useKeybindings)
  - `../utils/handlePromptSubmit.js` (PromptInputHelpers)

## Logic
1. Component reads current keybinding context; if missing, returns null (no handlers)
2. Collects all `binding.action` values that start with `"command:"` into a Set
3. Creates a map: for each `command:name` action, handler calls `onSubmit(\`/name\`, NOOP_HELPERS, undefined, { fromKeybinding: true })`
   - NOOP_HELPERS are stubs (setCursorOffset, clearBuffer, resetHistory) since command keybindings don't modify buffer
4. Active state: `isActive` prop (default true) AND `!isModalOverlayActive`
5. Calls `useKeybindings(handlers, { context: "Chat", isActive })` to register
6. Returns `null` (no UI)

## Exports
- `CommandKeybindingHandlers` - React component `Props: { onSubmit: (input: string, helpers: PromptInputHelpers, ...rest) => void, isActive?: boolean }`

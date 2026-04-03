## Purpose
Displays a hint in the prompt footer when sandbox violations have recently occurred, informing the user of blocked operations.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink`, `keybindings/useShortcutDisplay`, `utils/sandbox/sandbox-adapter`

## Logic
1. Subscribes to the sandbox violation store to track new violations
2. When new violations are detected, updates the recent violation count and starts a 5-second timer to reset it
3. Renders a hint showing the number of blocked operations and instructions to view details or disable sandbox
4. Only renders when sandboxing is enabled and there are recent violations

## Exports
- `SandboxPromptFooterHint` - component that shows recent sandbox violation count with action hints

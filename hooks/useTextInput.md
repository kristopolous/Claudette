# useTextInput

## Purpose
Comprehensive text input handler with cursor management, keyboard shortcuts, history navigation, and vim keybindings support.

## Imports
- **Stdlib**: None
- **External**: `stripAnsi`
- **Internal**: `isInputModeCharacter`, `useNotifications`, `addToHistory`, `Key`, `Cursor`, `InlineGhostText`, `TextInputState`, `ImageDimensions`, `isModifierPressed`, `prewarmModifiers`, `useDoublePress`

## Logic
1. Manages cursor position and viewport offset
2. Handles Ctrl+A-Z keyboard shortcuts for cursor movement and editing
3. Supports Meta key combinations for word operations
4. Implements kill ring (Ctrl+K/U/W) and yank-pop (Ctrl+Y)
5. Handles escape double-press for input clearing
6. Processes backslash+return for multiline input
7. Detects SSH-coalesced Enter events
8. Filters DEL characters that interfere with backspace in SSH/tmux

## Exports
- `useTextInput` - Hook returning TextInputState with onInput, renderedValue, cursor position info

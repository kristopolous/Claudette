## Purpose
A text input component that integrates vim-style editing modes with the terminal UI.

## Imports
- **Stdlib**: None
- **External**: STYLER, REACT, REACT/compiler-runtime
- **Internal**: hooks/useClipboardImageHint (useClipboardImageHint), hooks/useVimInput (useVimInput), ink (Box, color, useTerminalFocus, useTheme), types/textInputTypes (VimTextInputProps), utils/textHighlighting (TextHighlight), BaseTextInput (BaseTextInput)

## Logic
1. Reads theme and terminal focus state, sets up clipboard image hint handling
2. Passes all props through to the useVimInput hook to manage vim mode state
3. Resets to initial mode when the mode or initialMode prop changes
4. Renders a BaseTextInput wrapped in a Box, passing the vim input state and terminal focus

## Exports
- `VimTextInput` - Default export, UI component providing vim-mode text input
- `Props` - Type extending VimTextInputProps with optional highlights array

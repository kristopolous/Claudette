## Purpose
Base component for text inputs that handles rendering, cursor management, paste handling, placeholders, and text highlighting.

## Imports
- **Stdlib**: none
- **External**: react, react/compiler-runtime
- **Internal**: ../hooks/renderPlaceholder.js (renderPlaceholder), ../hooks/usePasteHandler.js (usePasteHandler), ../ink/hooks/use-declared-cursor.js (useDeclaredCursor), ../ink.js (Ansi, Box, Text, useInput), ../types/textInputTypes.js (BaseInputState, BaseTextInputProps), ../utils/textHighlighting.js (TextHighlight), ./PromptInput/ShimmeredInput.js (HighlightedInput)

## Logic
Manages text input rendering by combining input state with cursor positioning, paste handling, and placeholder display. Uses useDeclaredCursor for cursor placement and usePasteHandler to intercept paste events while filtering return keys during pastes. Computes placeholder visibility based on focus, cursor, and value state. Filters text highlights based on cursor position and viewport offset, adjusting highlight positions for scrolled content. Renders either a HighlightedInput component when highlights exist, or standard Text with optional argument hints and placeholder content.

## Exports
- `BaseTextInput` - Renders a text input with cursor, paste handling, placeholders, highlights, and optional argument hints

## Purpose
A foundational, reusable text input component for CLI applications that handles core input logic, cursor management, placeholder rendering, and paste event processing.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `hooks/renderPlaceholder`, `hooks/usePasteHandler`, `ink/hooks/use-declared-cursor`, `ink`, `types/textInputTypes`, `utils/textHighlighting`, `components/PromptInput/ShimmeredInput`

## Logic
1. **Core Input Handling**:
    - Captures keyboard input and key events, passing processed input to the parent component via the `onInput` callback.
    - Manages the input state, including the current text value, cursor position, and line/column details.
2. **Cursor and Focus Management**:
    - Integrates with Ink's focus system (`useInput`) to ensure input is only processed when the component is active and focused.
    - Utilizes `useDeclaredCursor` to accurately render and manage the text cursor's position within the terminal interface.
3. **Placeholder and Input Display**:
    - Renders a placeholder text when the input field is empty, with logic to control its visibility and appearance based on focus and inversion states.
    - Displays the actual user input, supporting custom text highlighting.
4. **Advanced Input Features**:
    - **Paste Handling**: Integrates `usePasteHandler` to correctly process pasted content, including detecting multi-line pastes and image pasting events.
    - **Command Hints**: Provides optional support for displaying hints related to command arguments based on the current input.
5. **Reusability**: Designed as a base component, it accepts various props for customization, such as input validation, highlighting, and specific paste event handlers.

## Exports
- `BaseTextInput` - A configurable base component for creating text input fields in a terminal environment.

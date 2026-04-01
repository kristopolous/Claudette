## Purpose
A logic and UI module that defines and manages interactive actions (copy, edit, navigation) that users can perform on historical conversation messages via keyboard shortcuts.

## Imports
- **External**: `figures`
- **Internal**: 
    - UI: `ink`, `design-system/ThemedText`, `FullscreenLayout`, `design-system/Byline`, `design-system/KeyboardShortcutHint`, `design-system/Pane`
    - Logic/State: `keybindings/useKeybinding`, `services/analytics`, `types/message`, `utils/messages`

## Logic
1. **Navigability Filtering**: Implements a tier-based classification system to identify which messages in a transcript are "actionable." It excludes synthetic system messages, XML-wrapped internal data (like command logs), and metadata summaries to focus navigation on user-authored content and assistant responses.
2. **Action Definition**:
    - **Copy**: Extracts clean text from messages, stripping internal system reminders and formatting tool results for the clipboard.
    - **Edit**: Allows users to reopen and modify previous prompt text.
    - **Contextual Copy**: Provides specialized copy actions for tool-specific data, such as extracting file paths from read/write operations or command strings from shell blocks.
3. **Cursor and State Management**: 
    - Tracks a "message cursor" that highlights the active message in a history list.
    - Manages expansion/collapse states for grouped tool uses or long attachments.
4. **Keybinding Integration**: Maps standard keys (j/k for movement, Enter to expand/edit, 'c' to copy) to discrete message actions. It uses stable handlers to prevent re-registration overhead as the message history grows.
5. **UI Rendering**: 
    - **Selection Highlight**: Provides hooks to apply specific background colors to the message currently under the cursor.
    - **Action Bar**: Renders a persistent footer hint showing available shortcuts and their current labels (e.g., toggling between "expand" and "collapse").

## Exports
- `MESSAGE_ACTIONS` - The definitive list of supported keyboard actions and their metadata.
- `useMessageActions` - A hook for managing cursor movement and action dispatching.
- `MessageActionsBar` - A UI footer component summarizing active shortcuts.
- `isNavigableMessage` - Logic to filter conversation history for actionable items.
- `copyTextOf` - Utility for extracting clean, clipboard-ready text from any message type.

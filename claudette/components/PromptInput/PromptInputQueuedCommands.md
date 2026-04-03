## Purpose
Displays queued commands (such as task notifications and bash commands) as rendered messages above the prompt input.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `react`
- **Internal**: `ink`, `state/AppState`, `constants/xml`, `context/QueuedMessageContext`, `hooks/useCommandQueue`, `types/textInputTypes`, `utils/messageQueueManager`, `utils/messages`, `utils/slowOperations`, `Message`

## Logic
1. Filters out idle notifications which are processed silently
2. Caps task notifications at a maximum of 3 visible lines, combining overflow into a single summary notification
3. Converts visible queued commands into synthetic user messages with appropriate XML wrapping for bash commands
4. Memoizes message creation to prevent flicker during streaming re-renders
5. Renders each queued command as a Message component wrapped in QueuedMessageProvider
6. Hides output when viewing an agent's transcript or when no commands are queued

## Exports
- `PromptInputQueuedCommands` - memoized component that renders queued commands as message previews

## Purpose
Displays the model name for assistant messages when in transcript mode.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `../ink/stringWidth`, `../ink`, `../types/message`

## Logic
Checks if the message is from an assistant in transcript mode and contains text content, then renders the model name in a dimmed color within a box with calculated minimum width.

## Exports
- `MessageModel` - renders the inference provider model name for assistant messages in transcript mode

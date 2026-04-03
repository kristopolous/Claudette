## Purpose
Renders a visual separator indicating that the conversation context has been compacted, with a hint for viewing history.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: ink (Box, Text), useShortcutDisplay

## Logic
1. Gets the keyboard shortcut display string for toggling transcript (ctrl+o)
2. Renders a dimmed message "✻ Conversation compacted ({shortcut} for history)" with vertical margin

## Exports
- `CompactBoundaryMessage` - UI component rendering a conversation compaction separator

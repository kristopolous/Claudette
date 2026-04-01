## Purpose
Renders a compact summary display for summarized conversation messages, showing metadata about the summarization.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `constants/figures` (BLACK_CIRCLE), `ink` (Box, Text), `screens/REPL` (Screen type), `types/message` (NormalizedUserMessage), `utils/messages` (getUserMessageText), `components/ConfigurableShortcutHint`, `components/MessageResponse`

## Logic
1. Extracts text content and summarizeMetadata from the user message
2. When metadata exists, displays a "Summarized conversation" header with the count of summarized messages and direction (up to/from this point), plus optional user context
3. When no metadata exists, displays a simpler "Compact summary" label
4. Conditionally shows the full text content in transcript mode and keyboard shortcut hints for expanding history

## Exports
- `CompactSummary` - renders a compact summary view for summarized user messages with metadata and text content

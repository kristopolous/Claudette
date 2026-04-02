# transcriptSearch

## Purpose
Flattens `RenderableMessage` objects into searchable text for the transcript `/` search command. Uses a `WeakMap` cache to avoid recomputing on every keystroke. Strips `<system-reminder>` blocks and sentinel text (interrupt messages) that would cause phantom search matches.

## Imports
- **Internal**: `../types/message`, `./messages` (for interrupt sentinels)

## Logic
1. `renderableSearchText` caches results in a `WeakMap<RenderableMessage, string>`. Messages are immutable so cache entries are always valid. Lowercases at cache time to avoid re-lowering ~1.5MB on every keystroke (the backspace hang).
2. `computeSearchText` handles each message type:
   - **user**: Skips `INTERRUPT_MESSAGE` sentinels (rendered as `<InterruptedByUser />`). For `tool_result` blocks, indexes the tool's native output (`stdout`, `content`, `file.content`, etc.) rather than the model-facing serialization which includes system reminders and other phantom text.
   - **assistant**: Extracts text blocks and tool_use input fields (command, pattern, file_path, etc.). Skips thinking blocks.
   - **attachment**: Indexes `relevant_memories` content and `queued_command` prompts (excluding task-notification and meta commands).
   - **collapsed_read_search**: Mirrors relevant memories absorbed into collapse groups.
3. Strips `<system-reminder>...</system-reminder>` blocks from all text.
4. `toolUseSearchText` extracts searchable fields from tool inputs: `command`, `pattern`, `file_path`, `path`, `prompt`, `description`, `query`, `url`, `skill`, plus array fields `args[]` and `files[]`.
5. `toolResultSearchText` extracts from tool outputs: `{stdout, stderr}`, `{file: {content}}`, and known field names (`content`, `output`, `result`, `text`, `message`, `filenames`, `lines`, `results`). Falls back to empty for unknown shapes (under-count > phantom).

## Exports
- `renderableSearchText(msg)` — returns cached lowercased searchable text for a RenderableMessage
- `toolUseSearchText(input)` — extracts searchable text from tool invocation inputs
- `toolResultSearchText(result)` — extracts searchable text from tool outputs (native Out shape)

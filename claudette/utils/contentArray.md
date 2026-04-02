# contentArray

## Purpose
Utility for inserting a supplementary content block (e.g., cache editing directives) into a content array at the correct position relative to tool_result blocks. Used by the API layer to position content correctly within user messages.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
1. Scans the content array to find the index of the last `tool_result` block (by checking `item.type === 'tool_result'`)
2. If tool_result blocks exist: inserts the new block immediately after the last one via `splice`
3. If no tool_result blocks exist: inserts the block before the last element (at `Math.max(0, content.length - 1)`)
4. If the inserted block would become the final element, appends a text continuation block `{ type: 'text', text: '.' }` because some APIs require the prompt not to end with non-text content
5. Mutates the array in place; returns void

## Exports
- `insertBlockAfterToolResults(content: unknown[], block: unknown): void` - inserts a block into a content array after the last tool_result, or before the last block if none exist

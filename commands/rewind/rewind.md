# Rewind Command (`rewind`)

## Purpose
Opens the message selector to restore the code and/or conversation to a previous point. The command returns a 'skip' result to avoid appending new messages.

## Imports
### Internal
- `LocalCommandResult` type from `../../commands.js`
- `ToolUseContext` type from `../../Tool.js`

## Logic
The `call` async function receives `_args` and `context`:
1. If `context.openMessageSelector` is defined, calls it to open the message selector UI.
2. Returns `{ type: 'skip' }` to indicate no new content should be added to the conversation.

## Exports
- `call` (async function) - Opens message selector and skips message addition
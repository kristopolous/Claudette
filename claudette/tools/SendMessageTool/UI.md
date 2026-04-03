## Purpose
UI components for rendering SendMessage tool usage and result messages.

## Imports
- **Stdlib**: REACT
- **External**: None
- **Internal**:
  - `MessageResponse` component
  - `Text` from ink
  - `jsonParse` utility
  - `Input`, `SendMessageToolOutput` types from SendMessageTool

## Logic
Exports:
- `renderToolUseMessage(input)`: 
  - If input.message is object with type 'plan_approval_response', returns "approve plan from: {to}" or "reject plan from: {to}".
  - Otherwise returns null.
- `renderToolResultMessage(content, progressMessages, options)`:
  - Parses content (string or object) to `SendMessageToolOutput`.
  - If result has `routing` property, returns null (routing info suppressed).
  - If result has `request_id` and `target`, returns null (legacy protocol responses suppressed).
  - Otherwise dims and displays `result.message`.

Handles both regular messages and legacy protocol responses.

## Exports
- `renderToolUseMessage(input)`
- `renderToolResultMessage(content, progressMessages, options)`

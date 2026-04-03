## Purpose
Renders a message indicating a tool use was rejected by the user.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `InterruptedByUser`, `MessageResponse`

## Logic
Returns a memoized `MessageResponse` component with height 1 containing an `InterruptedByUser` child, indicating a tool execution was interrupted by user action.

## Exports
- `FallbackToolUseRejectedMessage` - renders a user-interrupted tool response message

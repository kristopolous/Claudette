## Purpose
Renders an error message for a failed tool use, handling various rejection and interruption scenarios.

## Imports
- **External**: `react`, `bun:bundle`
- **Internal**: `constants/figures`, `ink`, `Tool`, `types/message`, `utils/messages`, `components/FallbackToolUseErrorMessage`, `components/InterruptedByUser`, `components/MessageResponse`, `components/messages/UserToolResultMessage/RejectedPlanMessage`, `components/messages/UserToolResultMessage/RejectedToolUseMessage`

## Logic
Checks the tool result content in order: if it matches an interrupt message, renders an InterruptedByUser component; if it starts with a plan rejection prefix, renders a RejectedPlanMessage with the plan content; if it starts with a reject-with-reason prefix, renders a RejectedToolUseMessage; if the transcript classifier feature is enabled and the content is a classifier denial, renders a dimmed denial message; otherwise delegates to the tool's custom error renderer or falls back to FallbackToolUseErrorMessage.

## Exports
- `UserToolErrorMessage` - renders the appropriate error UI for a failed tool use based on the result content type

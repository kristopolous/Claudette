## Purpose
Top-level component that dispatches to the appropriate tool result message component based on the result status.

## Imports
- **External**: `react`
- **Internal**: `Tool`, `types/message`, `utils/messages`, `components/messages/UserToolResultMessage/UserToolCanceledMessage`, `components/messages/UserToolResultMessage/UserToolErrorMessage`, `components/messages/UserToolResultMessage/UserToolRejectMessage`, `components/messages/UserToolResultMessage/UserToolSuccessMessage`, `components/messages/UserToolResultMessage/utils`

## Logic
Resolves the tool and tool use data using the useGetToolFromMessages hook. Routes to the appropriate child component based on content: UserToolCanceledMessage if the content starts with the cancel message prefix, UserToolRejectMessage if it starts with the reject message or matches the interrupt message, UserToolErrorMessage if the result is marked as an error, and UserToolSuccessMessage as the default case for successful results.

## Exports
- `UserToolResultMessage` - orchestrates rendering of tool result messages by delegating to the appropriate specialized component based on result type

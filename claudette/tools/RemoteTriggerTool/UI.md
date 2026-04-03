# tools/RemoteTriggerTool/UI.tsx

## Purpose
Renders the user-facing UI messages for the Remote Trigger tool, displaying tool use actions and HTTP result information.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `components/MessageResponse`, `ink`, `utils/stringUtils`, `RemoteTriggerTool/RemoteTriggerTool`

## Logic
Renders tool use messages by combining the action type and optional trigger ID into a display string. Renders tool result messages showing the HTTP status code and line count of the JSON response using MessageResponse component.

## Exports
- `renderToolUseMessage` - renders the tool invocation showing action and trigger ID
- `renderToolResultMessage` - renders the HTTP response status and response size

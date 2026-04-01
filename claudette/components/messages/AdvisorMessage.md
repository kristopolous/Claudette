## Purpose
Renders advisor messages showing when an advisor model is consulted, including tool use status, error states, and review results.

## Imports
- **Stdlib**: None
- **External**: react, figures
- **Internal**: ink (Box, Text), MessageResponse, CtrlOToExpand, ToolUseLoader, advisor utils, model utils, slowOperations utils

## Logic
1. For server_tool_use type: Shows "Advising" label with optional model name and JSON-stringified input, plus ToolUseLoader for progress
2. For advisor_tool_result_error: Shows error message with error code in red
3. For advisor_result: Shows full text in verbose mode, or a checkmark with summary in normal mode
4. For advisor_redacted_result: Shows a checkmark with fixed summary text
5. Wraps non-tool-use content in MessageResponse with right padding

## Exports
- `AdvisorMessage` - React component rendering advisor interactions with model name, status, and results

# tools/MCPTool/UI.tsx

## Purpose
Renders the user-facing UI for MCP tool messages including tool use, progress updates, and results with rich text formatting and smart output strategies.

## Imports
- **Stdlib**: None
- **External**: `react/compiler-runtime`, `bun:bundle`, `figures`, `react`, `zod/v4`
- **Internal**: `components/design-system/ProgressBar`, `components/MessageResponse`, `components/shell/OutputLine`, `ink/stringWidth`, `ink`, `ToolProgressData`, `types/message`, `types/tools`, `utils/format`, `utils/hyperlink`, `utils/mcpValidation`, `utils/slowOperations`, `MCPTool/MCPTool`

## Logic
Renders tool use messages by serializing input parameters with optional truncation in non-verbose mode. Renders progress messages with optional progress bar when total is known. Renders results using three strategies: unwrapping dominant text payloads from JSON objects (e.g., Slack messages), flattening small JSON objects into aligned key-value pairs, or falling back to pretty-printed output. Includes special handling for Slack send results with hyperlink display and warnings for large responses exceeding token thresholds.

## Exports
- `renderToolUseMessage` - renders tool invocation with input parameters
- `renderToolUseProgressMessage` - renders progress with optional progress bar
- `renderToolResultMessage` - renders tool results using smart formatting strategies
- `tryFlattenJson` - attempts to parse and flatten JSON into key-value pairs
- `tryUnwrapTextPayload` - extracts dominant text from JSON objects with metadata
- `trySlackSendCompact` - detects Slack send results for compact display

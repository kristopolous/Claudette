## Purpose
A UI module that provides a visual indicator of the agent's current focus within a connected Integrated Development Environment (IDE), showing either active text selections or the currently open file.

## Imports
- **Stdlib**: `path`
- **Internal**: 
    - UI: `ink`
    - Logic/State: `hooks/useIdeConnectionStatus`, `hooks/useIdeSelection`, `services/mcp/types`

## Logic
1. **Connection Monitoring**: The module tracks the connection status to the IDE and only renders content if the status is explicitly "connected."
2. **Contextual Visibility**: Even when connected, the indicator remains hidden unless there is a valid file path or a non-empty text selection to report.
3. **Selection Reporting**:
    - **Text Selection**: If the user has highlighted text in the IDE, the module displays the total line count of that selection (e.g., "⧉ 5 lines selected").
    - **Active File**: If no text is selected but a file is open, it displays the base name of the active file (e.g., "⧉ In main.ts").
4. **Layout Constraints**: The text is rendered with truncation enabled to ensure it fits within the terminal row without causing unexpected line breaks.

## Exports
- `IdeStatusIndicator` - The UI component for displaying IDE focus and selection status.

## Purpose
Renders terminal UI components for the ExitPlanModeTool, displaying status messages when exiting plan mode. Shows different messages for: simple exit (empty plan), team lead approval pending, and user-approved plans with the plan content.

## Imports
- **Stdlib**: React (for React.ReactNode, React component types)
- **External**: None
- **Internal**:
  - Components: Markdown, MessageResponse, RejectedPlanMessage
  - Constants: BLACK_CIRCLE
  - Utilities: getModeColor, getDisplayPath, getPlan
  - UI Library: Box, Text from ink
  - Types: ToolProgressData, ProgressMessage, ThemeName, Output
  - Related Tool: ExitPlanModeV2Tool (for Output type)

## Logic
- **`renderToolUseMessage`**: Returns null - tool use has no visual representation
- **`renderToolResultMessage`**: Main function that renders the result of exiting plan mode
  - Accepts `output` (contains `plan`, `filePath`, `awaitingLeaderApproval`) and progress messages with theme
  - Determines display state: empty plan, awaiting leader approval, or approved plan
  - **Empty plan**: Shows simple "Exited plan mode" message with black circle icon
  - **Awaiting approval**: Shows "Plan submitted for team lead approval" with plan file path and waiting message
  - **Approved plan**: Shows "User approved Claude's plan" with plan file path and full markdown plan content
  - Uses `getModeColor('plan')` for consistent theming, `getDisplayPath` for file paths
- **`renderToolUseRejectedMessage`**: Renders when exiting plan mode is rejected
  - Accepts optional `plan` and theme parameters
  - Retrieves plan from `getPlan()` as fallback
  - Displays `RejectedPlanMessage` component with plan content

## Exports
- `renderToolUseMessage(): React.ReactNode`
- `renderToolResultMessage(output: Output, progressMessages: ProgressMessage<ToolProgressData>[], options: {theme: ThemeName}): React.ReactNode`
- `renderToolUseRejectedMessage(options: {plan?: string}, context: {theme: ThemeName}): React.ReactNode`
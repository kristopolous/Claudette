## Purpose
Renders a progress display for bash command execution showing user input and shell output status.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `ink`, `tools/BashTool/BashTool`, `types/tools`, `components/messages/UserBashInputMessage`, `components/shell/ShellProgressMessage`

## Logic
1. Wraps the bash input in XML-style tags and displays it via UserBashInputMessage
2. Shows ShellProgressMessage with full output, elapsed time, and line count when progress data is available
3. Falls back to BashTool's default progress message rendering when no progress data exists
4. Stacks input and progress messages vertically in a column layout

## Exports
- `BashModeProgress` - React component that displays bash command input and execution progress in the terminal UI

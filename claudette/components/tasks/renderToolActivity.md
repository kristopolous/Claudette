# components/tasks/renderToolActivity

## Purpose
Provides tool activity rendering utility for displaying tool use in agent activity.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink, Tool, tasks LocalAgentTask, theme

## Logic
1. `renderToolActivity` - renders tool activity as React node
2. Takes activity, tools, theme parameters
3. Finds tool by name via findToolByName
4. Returns toolName if tool not found
5. Parses input via tool.inputSchema.safeParse
6. Gets parsedInput from parse result (empty object on failure)
7. Gets userFacingName via tool.userFacingName(parsedInput)
8. Returns toolName if no userFacingName
9. Gets toolArgs via tool.renderToolUseMessage(parsedInput, { theme, verbose: false })
10. Returns Text with userFacingName(toolArgs) if toolArgs present
11. Returns userFacingName if no toolArgs
12. Returns toolName on error
13. `Text` - ink text component
14. `Tools` - tools type
15. `findToolByName` - finds tool by name
16. `ToolActivity` - tool activity type
17. `ThemeName` - theme name type

## Exports
- `renderToolActivity` - renders tool activity
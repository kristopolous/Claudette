## Purpose
Renders grouped tool use messages by delegating to the tool's renderGroupedToolUse method with resolved state and progress data.

## Imports
- **Stdlib**: None
- **External**: REACT, @anthropic-ai/sdk
- **Internal**: Tool, message types, messages utils

## Logic
1. Finds the tool definition by name and checks if it supports grouped rendering
2. Builds a map of tool use IDs to their result data from result messages
3. Constructs toolUsesData array with each tool use's param, resolved/error/in-progress state, progress messages, and result
4. Determines if any tool is still in progress for animation control
5. Delegates to tool.renderGroupedToolUse with the assembled data and animation flag

## Exports
- `GroupedToolUseContent` - UI component rendering grouped tool uses via tool-specific renderers

## Purpose
Renders assistant tool use messages with tool name, input display, progress indicators, and permission/classifier status.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk
- **Internal**: ink (Box, Text, useTheme), Tool, MessageResponse, ToolUseLoader, HookProgressMessage, SentryErrorBoundary, messageActions, useTerminalSize, useAppState, classifierApprovalsHook, messages utils, log utils

## Logic
1. Parses the tool use block to find the matching tool definition and validate input against schema
2. Determines tool state: resolved, queued, in-progress, waiting for permission
3. For transparent wrapper tools, delegates to renderToolUseProgressMessage and skips normal rendering
4. Renders the tool use message by calling the tool's renderToolUseMessage with parsed input
5. Shows appropriate status indicators: loader animation for in-progress, black circle for queued, dim text for classifier checking or permission waiting
6. Displays hook progress messages (PreToolUse) alongside tool progress
7. Wraps output with selection-aware background and optional margin

## Exports
- `AssistantToolUseMessage` - React component rendering tool use messages with full state management
- `renderToolUseMessage` - Internal function that renders tool use message from tool and input
- `renderToolUseProgressMessage` - Internal function rendering progress messages for in-progress tool calls
- `renderToolUseQueuedMessage` - Internal function rendering queued state message

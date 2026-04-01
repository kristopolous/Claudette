# state/AppStateStore

## Purpose
Defines AppState type and store structure for React state management.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: notifications, todo types, bridge, commands, MCP types, PromptSuggestion, Tool, tasks, AgentTool, ExitPlanModeTool, ids, message, plugin, utils, commitAttribution, effort, fileHistory, hooks, model, permissions, settings, thinking, store

## Logic
1. `CompletionBoundary` - union: complete, bash, edit, denied_tool with timestamps
2. `SpeculationResult` - messages, boundary, timeSavedMs
3. `SpeculationState` - idle or active with abort, messagesRef, writtenPathsRef, etc.
4. `IDLE_SPECULATION_STATE` - constant idle state
5. AppState includes: messages, tasks, tools, MCP connections, plugins, settings
6. Tool permission context with mode tracking
7. Agent definitions and color management
8. File history state
9. Session hooks state
10. Attribution state for commit tracking
11. Denial tracking state
12. Notification and todo list state
13. Elicitation request events
14. Bridge and channel permission callbacks
15. Model settings and effort values
16. Thinking enabled by default check

## Exports
- `CompletionBoundary` - completion boundary type
- `SpeculationResult` - speculation result type
- `SpeculationState` - speculation state type
- `IDLE_SPECULATION_STATE` - idle speculation constant
- `AppState` - main application state type
- `AppStateStore` - store type for AppState

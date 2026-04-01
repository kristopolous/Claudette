## Purpose
Renders hook progress messages showing the count of in-progress PreToolUse and PostToolUse hooks during tool execution.

## Imports
- **Stdlib**: None
- **External**: react
- **Internal**: ink (Box, Text), MessageResponse, messages utils

## Logic
1. Looks up in-progress and resolved hook counts for the given tool use ID and hook event
2. Returns null if no hooks are in progress or if resolved count matches in-progress count
3. For PreToolUse/PostToolUse in transcript mode, shows a static summary with count and hook name
4. For other hook events, shows "Running {HookEvent} hook…" dimmed text while hooks are in progress

## Exports
- `HookProgressMessage` - React component rendering hook progress status during tool execution

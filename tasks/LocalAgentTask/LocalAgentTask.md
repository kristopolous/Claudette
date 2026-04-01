# tasks/LocalAgentTask/LocalAgentTask

## Purpose
Manages local agent task execution with progress tracking and output handling.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, xml constants, PromptSuggestion speculation, state, Task types, Tool, agent types, SyntheticOutputTool, ids, message types, abortController, cleanupRegistry, collapseReadSearch, messageQueueManager, sessionStorage, task diskOutput/framework/sdkProgress, task types

## Logic
1. `ToolActivity` - toolName, input, activityDescription, isSearch, isRead
2. `AgentProgress` - toolUseCount, tokenCount, lastActivity, recentActivities, summary
3. `MAX_RECENT_ACTIVITIES` (5) - recent activity limit
4. `ProgressTracker` - tracks toolUseCount, latestInputTokens, cumulativeOutputTokens, recentActivities
5. `createProgressTracker` - creates new tracker
6. `getTokenCountFromTracker` - sums input + output tokens
7. `ActivityDescriptionResolver` - resolver for human-readable descriptions
8. `updateProgressFromMessage` - updates tracker from assistant message
9. Tracks input tokens (cumulative) and output tokens (summed per turn)
10. Omits SYNTHETIC_OUTPUT_TOOL from preview (internal tool)
11. Extracts tool activity descriptions via resolver
12. Maintains recent activities list (capped at MAX)
13. Emits task progress via SDK
14. Handles task output file management (symlink, eviction)
15. Registers cleanup for task lifecycle

## Exports
- `ToolActivity` - tool activity type
- `AgentProgress` - agent progress type
- `ProgressTracker` - progress tracker type
- `ActivityDescriptionResolver` - activity description resolver type
- `createProgressTracker` - creates progress tracker
- `getTokenCountFromTracker` - gets token count from tracker
- `updateProgressFromMessage` - updates progress from message

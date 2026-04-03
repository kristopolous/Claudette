## Purpose
Executes stop hooks, teammate idle hooks, and task completed hooks after a query finishes, handling blocking errors, continuation prevention, and background bookkeeping tasks.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS (feature)
- **Internal**: keybindings/shortcutFormat (getShortcutDisplay), memdir/paths (isExtractModeActive), services/analytics/index (logEvent), Tool (ToolUseContext), types/hooks (HookProgress), types/message (AssistantMessage, Message, RequestStartEvent, StopHookInfo, StreamEvent, TombstoneMessage, ToolUseSummaryMessage), utils/attachments (createAttachmentMessage), utils/debug (logForDebugging), utils/errors (errorMessage), utils/hooks/postSamplingHooks (REPLHookContext), utils/hooks (executeStopHooks, executeTaskCompletedHooks, executeTeammateIdleHooks, getStopHookMessage, getTaskCompletedHookMessage, getTeammateIdleHookMessage), utils/messages (createStopHookSummaryMessage, createSystemMessage, createUserInterruptionMessage, createUserMessage), utils/systemPromptType (SystemPrompt), utils/tasks (getTaskListId, listTasks), utils/teammate (getAgentName, getTeamName, isTeammate), constants/querySource (QuerySource), services/autoDream/autoDream (executeAutoDream), services/PromptSuggestion/promptSuggestion (executePromptSuggestion), utils/envUtils (isBareMode, isEnvDefinedFalsy), utils/forkedAgent (createCacheSafeParams, saveCacheSafeParams)

## Logic
Runs as an async generator that executes stop hooks after sampling completes. First saves cache-safe params for main session queries, then conditionally runs background tasks (prompt suggestion, memory extraction, auto-dream, computer use cleanup) based on mode and feature flags. Iterates through stop hook results yielding messages, tracking blocking errors and continuation prevention. If this is a teammate, additionally runs TaskCompleted hooks for in-progress tasks and TeammateIdle hooks. Returns a StopHookResult indicating whether continuation should be prevented and any blocking errors encountered.

## Exports
- `handleStopHooks` - async generator that executes stop hooks and teammate-related hooks, yielding stream events and messages while tracking errors and continuation state

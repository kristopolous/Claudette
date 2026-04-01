# utils/sessionStart

## Purpose
Provides session start hook processing utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, message types, attachments, debug, diagLogs, envUtils, hooks fileChangedWatcher/hooksConfigSnapshot, hooks, log, plugins loadPluginHooks

## Logic
1. `SessionStartHooksOptions` - { sessionId, agentType, model, forceSyncExecution }
2. `pendingInitialUserMessage` - side channel for initial user message from hooks
3. `takeInitialUserMessage` - takes and clears pending initial user message
4. `processSessionStartHooks` - processes session start hooks
5. Source: 'startup' | 'resume' | 'clear' | 'compact'
6. Skips all hooks in bare mode (isBareMode check)
7. Skips plugin hooks if shouldAllowManagedHooksOnly enabled
8. Loads plugin hooks via loadPluginHooks (memoized, negligible overhead if already loaded)
9. Wraps plugin hook loading with withDiagnosticsTiming
10. Logs errors but continues without plugin hooks on failure
11. Executes setup hooks and session start hooks
12. Collects hook messages, additional contexts, watch paths
13. Updates watch paths via updateWatchPaths
14. Returns array of HookResultMessage
15. `getMainThreadAgentType` - gets main thread agent type
16. `createAttachmentMessage` - creates attachment message
17. `logForDebugging` - debug logging
18. `withDiagnosticsTiming` - diagnostics timing wrapper
19. `isBareMode` - checks bare mode
20. `shouldAllowManagedHooksOnly` - checks managed hooks only
21. `executeSessionStartHooks`, `executeSetupHooks` - hook execution functions
22. `logError` - error logging
23. `loadPluginHooks` - loads plugin hooks

## Exports
- `SessionStartHooksOptions` - options type
- `takeInitialUserMessage` - takes initial user message
- `processSessionStartHooks` - processes session start hooks

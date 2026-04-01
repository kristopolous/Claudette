# utils/sessionStorage

## Purpose
Provides session storage utilities for transcript and log management.

## Imports
- **Stdlib**: `crypto`, `fs`, `fs/promises`, `path`
- **External**: `bun:bundle`, `lodash-es/memoize`
- **Internal**: analytics, bootstrap state, commands, constants xml, growthbook, API sessionIngress, REPLTool, ids, logs types, message types, messageQueueTypes, array, cleanupRegistry, concurrentSessions, cwd, debug, diagLogs, envUtils, errors, fileHistory, format, fsOperations, getWorktreePaths, git, gracefulShutdown, json, jsonRead, log, memoryFileDetection, messages, path, plans, platform, ripgrep, secretScanner, sequential, sessionStoragePortable, settings constants/settings, shell shellCompletion/shellQuote, signal, sleep, slowOperations, stringUtils, task, teammate, theme, toolResultStorage, undercover, xml

## Logic
1. Session storage for transcripts and logs
2. `Entry`, `LogOption`, `SerializedMessage`, `TranscriptMessage` - log types
3. `AttributionSnapshotMessage`, `FileHistorySnapshotMessage` - snapshot types
4. `ContextCollapseCommitEntry`, `ContextCollapseSnapshotEntry` - collapse types
5. `ContentReplacementEntry` - content replacement type
6. `PersistedWorktreeSession` - worktree session type
7. `sortLogs` - sorts logs
8. `AgentId`, `SessionId`, `asAgentId`, `asSessionId` - ID types/functions
9. `getOriginalCwd`, `getPlanSlugCache`, `getPromptId`, `getSessionId`, `getSessionProjectDir`, `isSessionPersistenceDisabled`, `switchSession` - bootstrap state functions
10. `builtInCommandNames` - built-in command names
11. `COMMAND_NAME_TAG`, `TICK_TAG` - XML tag constants
12. `getFeatureValue_CACHED_MAY_BE_STALE` - gets feature value
13. `REPL_TOOL_NAME` - REPL tool name constant
14. `uniq` - unique array elements
15. `registerCleanup` - registers cleanup function
16. `updateSessionName` - updates session name
17. `getCwd` - gets current working directory
18. `logForDebugging` - debug logging
19. `logForDiagnosticsNoPII` - diagnostics logging
20. `getClaudeConfigHomeDir`, `isEnvTruthy` - env utils
21. `isFsInaccessible` - checks fs inaccessible
22. `FileHistorySnapshot` - file history snapshot type
23. `formatFileSize` - formats file size
24. `getFsImplementation` - gets fs implementation
25. `getWorktreePaths` - gets worktree paths
26. `getBranch` - gets git branch
27. `gracefulShutdownSync`, `isShuttingDown` - graceful shutdown functions
28. `parseJSONL` - parses JSONL
29. `LITE_READ_BUF_SIZE` (65536) - lite read buffer size
30. `readFileTailSync` - reads file tail synchronously
31. `getTranscriptPath` - gets transcript path
32. `getLogDisplayTitle` - gets log display title
33. `loadFullLog` - loads full log
34. `loadTranscriptFile` - loads transcript file
35. `isLiteLog` - checks if lite log
36. `getSessionIdFromLog` - gets session ID from log
37. `buildConversationChain` - builds conversation chain
38. `checkResumeConsistency` - checks resume consistency
39. `getLastSessionLog` - gets last session log
40. `loadMessageLogs` - loads message logs
41. `removeExtraFields` - removes extra fields
42. `recordQueueOperation` - records queue operation
43. `getAgentTranscript` - gets agent transcript
44. `getAgentTranscriptPath` - gets agent transcript path
45. `getSessionTranscript` - gets session transcript
46. `appendSessionLog` - appends to session log
47. `getSessionLogPath` - gets session log path
48. `getProjectsDir` - gets projects directory
49. `getLiteLog` - gets lite log
50. `getFullLog` - gets full log
51. `getLogs` - gets logs
52. `getLog` - gets log
53. `getLogOption` - gets log option
54. `getLogOptions` - gets log options
55. `getLogOptionBySessionId` - gets log option by session ID
56. `getLogOptionByPromptId` - gets log option by prompt ID
57. `getLogOptionByAgentId` - gets log option by agent ID
58. `getLogOptionByCustomTitle` - gets log option by custom title
59. `getLogOptionBySummary` - gets log option by summary
60. `getLogOptionByFirstPrompt` - gets log option by first prompt
61. `getLogOptionByTag` - gets log option by tag
62. `getLogOptionByBranch` - gets log option by branch
63. `getLogOptionByProjectDir` - gets log option by project dir
64. `getLogOptionByStartTime` - gets log option by start time
65. `getLogOptionByEndTime` - gets log option by end time
66. `getLogOptionByDuration` - gets log option by duration
67. `getLogOptionByTokenCount` - gets log option by token count
68. `getLogOptionByCost` - gets log option by cost
69. `getLogOptionByModel` - gets log option by model
70. `getLogOptionByStatus` - gets log option by status
71. `getLogOptionByType` - gets log option by type
72. `getLogOptionBySource` - gets log option by source
73. `getLogOptionByUser` - gets log option by user
74. `getLogOptionByWorkspace` - gets log option by workspace
75. `getLogOptionByTeam` - gets log option by team
76. `getLogOptionByOrg` - gets log option by org
77. `getLogOptionByBilling` - gets log option by billing
78. `getLogOptionByPlan` - gets log option by plan
79. `getLogOptionByBudget` - gets log option by budget
80. `getLogOptionByPriority` - gets log option by priority

## Exports
- `Entry`, `LogOption`, `SerializedMessage`, `TranscriptMessage` - log types
- `AttributionSnapshotMessage`, `FileHistorySnapshotMessage` - snapshot types
- `ContextCollapseCommitEntry`, `ContextCollapseSnapshotEntry` - collapse types
- `ContentReplacementEntry` - content replacement type
- `PersistedWorktreeSession` - worktree session type
- `sortLogs` - sorts logs
- `AgentId`, `SessionId`, `asAgentId`, `asSessionId` - ID types/functions
- `getOriginalCwd`, `getPlanSlugCache`, `getPromptId`, `getSessionId`, `getSessionProjectDir`, `isSessionPersistenceDisabled`, `switchSession` - bootstrap state functions
- `builtInCommandNames` - built-in command names
- `COMMAND_NAME_TAG`, `TICK_TAG` - XML tag constants
- `getFeatureValue_CACHED_MAY_BE_STALE` - gets feature value
- `REPL_TOOL_NAME` - REPL tool name constant
- `uniq` - unique array elements
- `registerCleanup` - registers cleanup function
- `updateSessionName` - updates session name
- `getCwd` - gets current working directory
- `logForDebugging` - debug logging
- `logForDiagnosticsNoPII` - diagnostics logging
- `getClaudeConfigHomeDir`, `isEnvTruthy` - env utils
- `isFsInaccessible` - checks fs inaccessible
- `FileHistorySnapshot` - file history snapshot type
- `formatFileSize` - formats file size
- `getFsImplementation` - gets fs implementation
- `getWorktreePaths` - gets worktree paths
- `getBranch` - gets git branch
- `gracefulShutdownSync`, `isShuttingDown` - graceful shutdown functions
- `parseJSONL` - parses JSONL
- `LITE_READ_BUF_SIZE` - lite read buffer size
- `readFileTailSync` - reads file tail synchronously
- `getTranscriptPath` - gets transcript path
- `getLogDisplayTitle` - gets log display title
- `loadFullLog` - loads full log
- `loadTranscriptFile` - loads transcript file
- `isLiteLog` - checks if lite log
- `getSessionIdFromLog` - gets session ID from log
- `buildConversationChain` - builds conversation chain
- `checkResumeConsistency` - checks resume consistency
- `getLastSessionLog` - gets last session log
- `loadMessageLogs` - loads message logs
- `removeExtraFields` - removes extra fields
- `recordQueueOperation` - records queue operation
- `getAgentTranscript` - gets agent transcript
- `getAgentTranscriptPath` - gets agent transcript path
- `getSessionTranscript` - gets session transcript
- `appendSessionLog` - appends to session log
- `getSessionLogPath` - gets session log path
- `getProjectsDir` - gets projects directory
- `getLiteLog` - gets lite log
- `getFullLog` - gets full log
- `getLogs` - gets logs
- `getLog` - gets log
- `getLogOption` - gets log option
- `getLogOptions` - gets log options
- `getLogOptionBySessionId` - gets log option by session ID
- `getLogOptionByPromptId` - gets log option by prompt ID
- `getLogOptionByAgentId` - gets log option by agent ID
- `getLogOptionByCustomTitle` - gets log option by custom title
- `getLogOptionBySummary` - gets log option by summary
- `getLogOptionByFirstPrompt` - gets log option by first prompt
- `getLogOptionByTag` - gets log option by tag
- `getLogOptionByBranch` - gets log option by branch
- `getLogOptionByProjectDir` - gets log option by project dir
- `getLogOptionByStartTime` - gets log option by start time
- `getLogOptionByEndTime` - gets log option by end time
- `getLogOptionByDuration` - gets log option by duration
- `getLogOptionByTokenCount` - gets log option by token count
- `getLogOptionByCost` - gets log option by cost
- `getLogOptionByModel` - gets log option by model
- `getLogOptionByStatus` - gets log option by status
- `getLogOptionByType` - gets log option by type
- `getLogOptionBySource` - gets log option by source
- `getLogOptionByUser` - gets log option by user
- `getLogOptionByWorkspace` - gets log option by workspace
- `getLogOptionByTeam` - gets log option by team
- `getLogOptionByOrg` - gets log option by org
- `getLogOptionByBilling` - gets log option by billing
- `getLogOptionByPlan` - gets log option by plan
- `getLogOptionByBudget` - gets log option by budget
- `getLogOptionByPriority` - gets log option by priority

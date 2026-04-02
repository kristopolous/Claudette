# queryHelpers

## Purpose
Utilities for analyzing message history: checking query success, extracting file read/write/edit state from tool results, and identifying CLI tools used in Bash calls. Also handles orphaned permission resolution and SDK message normalization.

## Imports
- **Stdlib**: `lodash-es/last.js` (last)
- **External**: `@anthropic-ai/sdk/resources/index.mjs` (ToolUseBlock)
- **Internal**: `src/bootstrap/state.js` (getSessionId, isSessionPersistenceDisabled), `src/entrypoints/agentSdkTypes.js` (SDKMessage), `../hooks/useCanUseTool.js` (CanUseToolFn), `../services/tools/toolOrchestration.js` (runTools), `../Tool.js` (findToolByName, Tool, Tools), `../tools/BashTool/toolName.js` (BASH_TOOL_NAME), `../tools/FileEditTool/constants.js` (FILE_EDIT_TOOL_NAME), `../tools/FileReadTool/FileReadTool.js` (FileReadInput), `../tools/FileReadTool/prompt.js` (FILE_READ_TOOL_NAME, FILE_UNCHANGED_STUB), `../tools/FileWriteTool/prompt.js` (FILE_WRITE_TOOL_NAME), `../types/message.js` (Message), `../types/textInputTypes.js` (OrphanedPermission), `./debug.js` (logForDebugging), `./envUtils.js` (isEnvTruthy), `./errors.js` (isFsInaccessible), `./file.js` (getFileModificationTime, stripLineNumberPrefix), `./fileRead.js` (readFileSyncWithMetadata), `./fileStateCache.js` (createFileStateCacheWithSizeLimit, FileStateCache), `./messages.js` (isNotEmptyMessage, normalizeMessages), `./path.js` (expandPath), `./permissions/PermissionPromptToolResultSchema.js` (permissionToolInputSchema, permissionToolOutputSchema), `./processUserInput/processUserInput.js` (ProcessUserInputContext), `./sessionStorage.js` (recordTranscript)

## Logic
1. **isResultSuccessful** — checks if a query result is successful: assistant with text/thinking/redacted_thinking content, user with only tool_result blocks, or user prompt with stopReason=end_turn (model chose no output)
2. **normalizeMessage** — generator that converts internal Message types to SDKMessage format; handles assistant, progress (agent_progress, skill_progress, bash_progress with 30s throttle for CCR), and user messages; skips empty messages
3. **handleOrphanedPermission** — async generator that resolves an orphaned permission (permission granted after tool_use was emitted); applies updated input if allowed, checks for duplicate tool_use in mutableMessages to avoid API rejection, executes tool via runTools, yields SDK messages
4. **extractReadFilesFromMessages** — two-pass algorithm: first pass collects FileRead/FileWrite/FileEdit tool_use IDs from assistant messages; second pass matches tool_results to extract file content into a FileStateCache (size-limited, default 10); strips system-reminder blocks and line number prefixes; for Edit results, reads current disk state; handles dedup of FILE_UNCHANGED_STUB entries
5. **extractBashToolsFromMessages** — scans assistant messages for BashTool calls, extracts the top-level CLI command name (skipping env var assignments and `sudo` prefix)
6. **extractCliName** — helper that parses a bash command string to find the actual CLI name, skipping STRIPPED_COMMANDS (sudo) and env var assignments (FOO=bar pattern)
7. Tool progress throttling: bash/powershell progress messages are limited to one per 30 seconds (TOOL_PROGRESS_THROTTLE_MS), tracked per parentToolUseID with LRU eviction at 100 entries; only emitted for CCR (CLAUDE_CODE_REMOTE or CLAUDE_CODE_CONTAINER_ID)

## Exports
- `PermissionPromptTool` — type alias: `Tool<ReturnType<typeof permissionToolInputSchema>, ReturnType<typeof permissionToolOutputSchema>>`
- `isResultSuccessful(message, stopReason?)` — returns boolean; checks if query result indicates success
- `normalizeMessage(message)` — generator yielding SDKMessage; converts internal messages to SDK format
- `handleOrphanedPermission(orphanedPermission, tools, mutableMessages, processUserInputContext)` — async generator; resolves orphaned permissions and executes tools
- `extractReadFilesFromMessages(messages, cwd, maxSize?)` — returns FileStateCache; extracts file content from Read/Write/Edit tool results
- `extractBashToolsFromMessages(messages)` — returns Set<string>; deduplicated CLI command names from BashTool calls

## Source
`queryHelpers`
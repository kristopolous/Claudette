# tools/PowerShellTool/PowerShellTool.tsx

## Purpose
Tool for executing Windows PowerShell commands with comprehensive security, sandboxing, and background task management.

## Imports
- **External**: `zod/v4`, `@anthropic-ai/sdk`, `lodash-es/uniqBy`
- **Stdlib**: `fs/promises`
- **Internal**: 
  - Bootstrap: `getKairosActive`
  - Analytics: `logEvent`, type
  - Tool: `buildTool`, `ToolDef`, `Tool`, `ToolCallProgress`, `ValidationResult`, `SetToolJSXFn`
  - State: `AppState`
  - Task management: `backgroundExistingForegroundTask`, `markTaskNotified`, `registerForeground`, `spawnShellTask`, `unregisterForeground`
  - Types: `AgentId`, `AssistantMessage`
  - Utils: `extractClaudeCodeHints`, `isEnvTruthy`, `errorMessage`, `ShellError`, `truncate`, `lazySchema`, `logError`, `PermissionResult`, `getPlatform`, `maybeRecordPluginHint`, `exec`, `ExecResult`, `SandboxManager`, `semanticBoolean`, `semanticNumber`, `getCachedPowerShellPath`, `EndTruncatingAccumulator`, `getTaskOutputPath`, `TaskOutput`, `isOutputLineTruncated`, `buildLargeToolResultMessage`, `ensureToolResultsDir`, `generatePreview`, `getToolResultPath`
  - BashTool helpers: `shouldUseSandbox`, `BackgroundHint`, `buildImageToolResult`, `isImageOutput`, `resetCwdIfOutsideProject`, `resizeShellImageOutput`, `stdErrAppendShellResetMessage`, `stripEmptyLines`
  - Shared: `trackGitOperations`
  - PowerShell-specific: `interpretCommandResult`, `powershellToolHasPermission`, `getDefaultTimeoutMs`, `getMaxTimeoutMs`, `getPrompt`, `hasSyncSecurityConcerns`, `isReadOnlyCommand`, `resolveToCanonical`, `POWERSHELL_TOOL_NAME`
  - UI: `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `renderToolUseProgressMessage`, `renderToolUseQueuedMessage`
  - Type exports: `PowerShellProgress`

## Logic
1. Validates input: checks for blocked sleep patterns, sandbox policy violations on Windows
2. Permission check via powershellToolHasPermission (read-only detection, allow/deny rules)
3. Command execution via runPowerShellCommand generator:
   - Finds PowerShell path (pwsh) with fallback
   - Wraps in sandbox when enabled (Linux/macOS/WSL2)
   - Supports auto-backgrounding for long-running commands
   - Tracks foreground vs background tasks
   - Yields progress updates during execution
   - Handles user interrupts by backgrounding instead of killing
   - Tracks git operations
   - Interprets exit codes semantically
   - Manages large output via file persistence (>64MB truncation)
   - Resizes image output if detected
   - Extracts Claudette hints and clears cwd if outside project
4. Returns structured output with stdout, stderr, exit code interpretation, background task info

## Exports
- `PowerShellTool` - Main tool definition
- `PowerShellToolInput` - Input type (command, timeout, description, run_in_background, dangerouslyDisableSandbox)
- `Out` - Output type (stdout, stderr, interrupted, returnCodeInterpretation, isImage, persistedOutputPath/Size, backgroundTaskId, backgroundedByUser, assistantAutoBackgrounded)
- `PowerShellProgress` - Progress type
- `detectBlockedSleepPattern` - Detects problematic sleep patterns

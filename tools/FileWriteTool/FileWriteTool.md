# FileWriteTool.ts

## Purpose

Implements a file write tool that creates new files or overwrites existing files with full content replacement. Handles atomic writes, file modification validation, LSP notifications, skill discovery, and file history tracking.

## Items

### inputSchema
**Purpose**: Zod schema defining the tool's input parameters.
**Logic**: Strict object with `file_path` (absolute path string) and `content` (string to write). Uses lazy schema for potential deferred initialization.

### outputSchema
**Purpose**: Zod schema defining the tool's output.
**Logic**: Returns object with `type` (enum: 'create' | 'update'), `filePath`, `content`, `structuredPatch` (array of hunk schemas), `originalFile` (null for new files), and optional `gitDiff`.

### FileWriteTool
**Purpose**: Main tool definition satisfying `ToolDef<InputSchema, Output>`.
**Logic**: Built with `buildTool()`. Key methods:

- **`description()`**: Returns 'Write a file to the local filesystem.'
- **`validateInput({ file_path, content }, context)`**: Multiple validation checks:
  1. Rejects writes to team memory files containing secrets via `checkTeamMemSecrets`
  2. Checks deny rules from permission settings
  3. Skips filesystem ops for UNC paths (prevents NTLM credential leaks)
  4. Verifies file has been read before writing (prevents blind overwrites)
  5. Compares mtime to detect external modifications since last read
- **`backfillObservableInput(input)`**: Expands `file_path` via `expandPath` to prevent hook bypass via ~ or relative paths
- **`preparePermissionMatcher({ file_path })`**: Returns wildcard pattern matcher for permission system
- **`checkPermissions(input, context)`**: Delegates to `checkWritePermissionForTool`
- **`call({ file_path, content }, context)`**: Main execution:
  1. Discovers and loads skills from the file's path
  2. Activates conditional skills matching the path
  3. Runs `diagnosticTracker.beforeFileEdited`
  4. Creates parent directory if needed
  5. Backs up to file history if enabled
  6. Reads current file state and validates no changes since last read
  7. Writes content with LF line endings (preserves model's explicit line endings)
  8. Notifies LSP servers (didChange, didSave) and VSCode
  9. Updates read timestamp to invalidate stale writes
  10. Logs CLAUDE.md writes as analytics events
  11. Computes git diff if remote and feature flag enabled
  12. Returns result with patch and original content
- **`mapToolResultToToolResultBlockParam({ filePath, type }, toolUseID)`**: Formats output message based on create vs update type

## Imports

- **Stdlib**: `path` (dirname, sep)
- **External**: `zod` (v4)
- **Internal**: 
  - Analytics: `logEvent`, `getFeatureValue_CACHED_MAY_BE_STALE`
  - Diagnostics: `diagnosticTracker`, `clearDeliveredDiagnosticsForFile`
  - LSP: `getLspServerManager`
  - MCP: `notifyVscodeFileUpdated`
  - Skills: `activateConditionalSkillsForPaths`, `addSkillDirectories`, `discoverSkillDirsForPaths`
  - Tool framework: `buildTool`, `ToolDef`, `ToolUseContext`
  - Utils: `getCwd`, `expandPath`, `getFileModificationTime`, `writeTextContent`, `readFileSyncWithMetadata`, `getFsImplementation`, `isENOENT`, `countLinesChanged`, `getPatchForDisplay`, `logForDebugging`, `logError`, `isEnvTruthy`
  - Permissions: `checkWritePermissionForTool`, `matchingRuleForInput`, `matchWildcardPattern`
  - File history: `fileHistoryEnabled`, `fileHistoryTrackEdit`
  - Analytics: `logFileOperation`
  - Git: `fetchSingleFileGitDiff`, `ToolUseDiff`
  - Constants: `FILE_UNEXPECTEDLY_MODIFIED_ERROR`
  - Types: `hunkSchema`, `gitDiffSchema` from FileEditTool

## Insights

- **Atomic write pattern**: Ensures parent directory exists BEFORE the critical section, and avoids async operations between staleness check and write to prevent interleaving
- **Line ending handling**: Explicitly uses LF ('LF') - does NOT preserve old file's line endings since model sent explicit line endings and preserving could corrupt files (e.g., bash scripts with CRLF on Linux)
- **Staleness detection**: Uses mtime with content comparison fallback on Windows (where mtime can change without content changes due to cloud sync/antivirus)
- **UNC path security**: Skips fs operations for UNC paths to prevent SMB authentication which could leak credentials to malicious servers
- **Skill discovery**: Fire-and-forget - discovers skills from file path without blocking the write operation
- **Write ordering**: Content write must happen after read timestamp check to maintain atomicity guarantees

## Exports

- `Output` - output schema type
- `FileWriteToolInput` - input schema type
- `FileWriteTool` - main tool definition

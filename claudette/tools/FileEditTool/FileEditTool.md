# FileEditTool/FileEditTool.ts

## Purpose

Tool for modifying file contents through exact string replacement operations with comprehensive validation and atomic writes.

## Imports

- **Stdlib**: `path`
- **Internal**: 
  - Analytics: `logEvent`, `getFeatureValue_CACHED_MAY_BE_STALE`
  - Diagnostic: `diagnosticTracker`, `clearDeliveredDiagnosticsForFile`
  - LSP: `getLspServerManager`
  - MCP: `notifyVscodeFileUpdated`
  - Services: `checkTeamMemSecrets`
  - Skills: `activateConditionalSkillsForPaths`, `addSkillDirectories`, `discoverSkillDirsForPaths`
  - Tool: `buildTool`, `ToolDef`, `ToolUseContext`
  - Utils: `getCwd`, `logForDebugging`, `countLinesChanged`, `isEnvTruthy`, `isENOENT`, `FILE_NOT_FOUND_CWD_NOTE`, `findSimilarFile`, `getFileModificationTime`, `suggestPathUnderCwd`, `writeTextContent`, `fileHistoryEnabled`, `fileHistoryTrackEdit`, `logFileOperation`, `readFileSyncWithMetadata`, `formatFileSize`, `getFsImplementation`, `fetchSingleFileGitDiff`, `ToolUseDiff`, `logError`, `expandPath`, `checkWritePermissionForTool`, `matchingRuleForInput`, `PermissionDecision`, `matchWildcardPattern`, `validateInputForSettingsFileEdit`
  - Other tools: `NOTEBOOK_EDIT_TOOL_NAME`
  - Constants: `FILE_EDIT_TOOL_NAME`, `FILE_UNEXPECTEDLY_MODIFIED_ERROR`
  - Local: `getEditToolDescription`, `FileEditInput`, `FileEditOutput`, `inputSchema`, `outputSchema`, `getToolUseSummary`, `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `renderToolUseRejectedMessage`, `userFacingName`
  - Helpers: `areFileEditsInputsEquivalent`, `findActualString`, `getPatchForEdit`, `preserveQuoteStyle`

## Logic

1. Validates input: checks for secrets, identical strings, permission denies, file existence, size limits, UNC paths
2. Ensures file was previously read (tracking via readFileState)
3. Checks for file modifications since last read (timestamp + content comparison fallback for Windows)
4. Handles quote style normalization (curly vs straight quotes)
5. Detects multiple matches unless replace_all is true
6. Special validation for settings files
7. Atomic read-modify-write with precautions:
   - Creates parent directories
   - Backs up file history
   - Writes with preserved encoding/line endings
8. Notifies LSP servers (didChange, didSave) and VSCode
9. Updates readFileState to invalidate stale reads
10. Logs analytics and optionally computes git diff
11. Returns structured output with patch, metadata

## Exports

- `FileEditTool: Tool<InputSchema, Output>`

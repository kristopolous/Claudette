## Purpose
Tool for creating new files or overwriting existing files with full content replacement, ensuring atomic writes and comprehensive validation.

## Imports
- **Stdlib**: `path`
- **External**: `zod/v4`
- **Internal**: 
  - Analytics: `logEvent`, `getFeatureValue_CACHED_MAY_BE_STALE`
  - Diagnostic: `diagnosticTracker`, `clearDeliveredDiagnosticsForFile`
  - LSP: `getLspServerManager`
  - MCP: `notifyVscodeFileUpdated`
  - Services: `checkTeamMemSecrets`
  - Skills: `activateConditionalSkillsForPaths`, `addSkillDirectories`, `discoverSkillDirsForPaths`
  - Tool: `buildTool`, `ToolDef`, `ToolUseContext`
  - Utils: `getCwd`, `expandPath`, `getFileModificationTime`, `writeTextContent`, `readFileSyncWithMetadata`, `getFsImplementation`, `isENOENT`, `countLinesChanged`, `getPatchForDisplay`, `logForDebugging`, `logError`, `isEnvTruthy`
  - Permissions: `checkWritePermissionForTool`, `matchingRuleForInput`, `matchWildcardPattern`
  - File history: `fileHistoryEnabled`, `fileHistoryTrackEdit`
  - Analytics: `logFileOperation`
  - Git: `fetchSingleFileGitDiff`, `ToolUseDiff`
  - Constants: `FILE_UNEXPECTEDLY_MODIFIED_ERROR`
  - Types: `hunkSchema`, `gitDiffSchema` (from FileEditTool)
  - Local: `FILE_WRITE_TOOL_NAME`, `getWriteToolDescription`, `getToolUseSummary`, `isResultTruncated`, `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `renderToolUseRejectedMessage`, `userFacingName`

## Logic
1. Validates: rejects team memory secrets, checks deny rules, UNC paths skip fs ops, requires Read-before-Edit, detects external modifications (mtime + content fallback)
2. Creates parent directory before write
3. Backs up file history if enabled
4. Reads current content and validates staleness
5. Writes with LF line endings (explicit, not preserved from original)
6. Notifies LSP (didChange, didSave) and VSCode
7. Updates readFileState to invalidate stale reads
8. Logs CLAUDE.md writes as analytics
9. Optionally computes git diff (remote mode with feature flag)
10. Generates structured patch for updates, empty patch for creates
11. Counts lines changed for analytics
12. Returns type ('create'|'update'), filePath, content, structuredPatch, originalFile?, gitDiff?

## Exports
- `FileWriteTool` - Main tool definition
- `FileWriteToolInput` - Input type (file_path, content)
- `Output` - Output type (type, filePath, content, structuredPatch, originalFile?, gitDiff?)

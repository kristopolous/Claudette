# utils/sessionFileAccessHooks

## Purpose
Provides session file access analytics hooks for tracking memory and transcript file access.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS
- **Internal**: bootstrap state, agentSdkTypes, analytics, FileEditTool constants/types, FileReadTool, FileWriteTool, GlobTool, GrepTool, hooks types, memoryFileDetection, teamMemPaths, teamMemorySync watcher, memoryShapeTelemetry, agentContext

## Logic
1. Tracks access to session memory and transcript files via Read, Grep, Glob tools
2. Tracks memdir file access via Read, Grep, Glob, Edit, Write tools
3. `registerHookCallbacks` - registers hook callbacks
4. `HookInput`, `HookJSONOutput` - hook types
5. `logEvent`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - analytics types
6. `FILE_EDIT_TOOL_NAME`, `FILE_READ_TOOL_NAME`, `FILE_WRITE_TOOL_NAME` - tool name constants
7. `editInputSchema` - edit input schema
8. `FileReadTool`, `FileWriteTool`, `GlobTool`, `GrepTool` - tool classes
9. `GLOB_TOOL_NAME`, `GREP_TOOL_NAME` - tool name constants
10. `HookCallback` - hook callback type
11. `detectSessionFileType`, `detectSessionPatternType` - session file detection
12. `isAutoMemFile`, `memoryScopeForPath` - memory file detection
13. `teamMemPaths`, `teamMemWatcher` - team memory paths/watcher (TEAMMEM feature-gated)
14. `memoryShapeTelemetry` - memory shape telemetry (MEMORY_SHAPE_TELEMETRY feature-gated)
15. `getSubagentLogName` - gets subagent log name
16. `getFilePathFromInput` - extracts file path from tool input
17. Handles FILE_READ_TOOL_NAME, FILE_EDIT_TOOL_NAME, FILE_WRITE_TOOL_NAME
18. `getSessionFileTypeFromInput` - extracts session file type from tool input
19. Returns 'session_memory', 'session_transcript', or null
20. Hook callbacks track file access for analytics

## Exports
- `getFilePathFromInput` - extracts file path from input
- `getSessionFileTypeFromInput` - extracts session file type
- (Session file access hook callbacks)

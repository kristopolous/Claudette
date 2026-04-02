# teamMemoryOps

## Purpose
Utility functions for detecting and summarizing team memory file operations (search, read, write, edit).

## Imports
- **Internal**: ../memdir/teamMemPaths, ../tools/FileEditTool/constants, ../tools/FileWriteTool/prompt

## Logic
1. Re-exports `isTeamMemFile` from teamMemPaths for convenience.
2. `isTeamMemorySearch` checks if a search tool's input targets a team memory file by examining its `path` property.
3. `isTeamMemoryWriteOrEdit` checks if a tool use is a file write or edit targeting a team memory file, by matching tool name against `FILE_WRITE_TOOL_NAME` / `FILE_EDIT_TOOL_NAME` and checking the `file_path` or `path` input property.
4. `appendTeamMemorySummaryParts` builds human-readable summary strings (e.g. "Recalling 2 team memories", "Searched team memories", "Wrote 1 team memory") with correct verb tense (active vs past) and capitalization based on position in the parts array.

## Exports
- `isTeamMemFile` - re-exported from teamMemPaths, checks if a path is a team memory file
- `isTeamMemorySearch(toolInput)` - returns true if a search tool input targets a team memory file
- `isTeamMemoryWriteOrEdit(toolName, toolInput)` - returns true if a write/edit tool targets a team memory file
- `appendTeamMemorySummaryParts(memoryCounts, isActive, parts)` - appends readable summary strings for team memory read/search/write counts to the parts array

## Source
`teamMemoryOps`

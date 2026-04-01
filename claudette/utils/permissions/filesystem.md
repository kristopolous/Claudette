# utils/permissions/filesystem

## Purpose
Provides filesystem permission utilities for path validation and dangerous file/directory protection.

## Imports
- **Stdlib**: `crypto`, `os`, `path`
- **External**: `bun:bundle`, `ignore`, `lodash-es/memoize`, `zod/v4`
- **Internal**: memdir paths, AgentTool agentMemory, FileEditTool constants, bootstrap state, growthbook, Tool, FileReadTool, cwd, envUtils, fsOperations, path, plans, platform, sessionStorage, settings constants/settings, shell readOnlyCommandValidation, toolResultStorage, windowsPaths, permissions PermissionResult/PermissionRule/PermissionUpdate/PermissionUpdateSchema

## Logic
1. `DANGEROUS_FILES` - protected files (.gitconfig, .bashrc, .zshrc, .mcp.json, .claude.json, etc.)
2. `DANGEROUS_DIRECTORIES` - protected directories (.git, .vscode, .idea, .claude)
3. `isPathInDangerousFile` - checks if path is dangerous file
4. `isPathInDangerousDirectory` - checks if path in dangerous directory
5. `isPathSafeForAutoEdit` - checks if path safe for auto-editing
6. `expandPath` - expands path with tilde notation
7. `sanitizePath` - sanitizes path for safe use
8. `containsPathTraversal` - checks for path traversal attempts
9. `getDirectoryForPath` - gets directory for path
10. `pathInWorkingPath` - checks if path in working path
11. `isAgentMemoryPath` - checks if path is agent memory path
12. `isAutoMemPath` - checks if path is auto memory path
13. `getToolResultsDir` - gets tool results directory
14. `getPlanSlug`, `getPlansDirectory` - plan utilities
15. `getSettingsFilePathForSource` - gets settings file path
16. `getSettingsRootPathForSource` - gets settings root path
17. `containsVulnerableUncPath` - checks for vulnerable UNC path
18. `windowsPathToPosixPath` - converts Windows to POSIX path
19. `getRuleByContentsForToolName` - gets rule by contents
20. `createReadRuleSuggestion` - creates read rule suggestion
21. `applyPermissionUpdates` - applies permission updates
22. `persistPermissionUpdates` - persists permission updates

## Exports
- `DANGEROUS_FILES` - dangerous files array
- `DANGEROUS_DIRECTORIES` - dangerous directories array
- `isPathInDangerousFile` - checks dangerous file
- `isPathInDangerousDirectory` - checks dangerous directory
- `isPathSafeForAutoEdit` - checks safe for auto-edit
- `expandPath` - expands path
- `sanitizePath` - sanitizes path
- `containsPathTraversal` - checks path traversal
- `getDirectoryForPath` - gets directory
- `pathInWorkingPath` - checks path in working path
- `isAgentMemoryPath` - checks agent memory path
- `isAutoMemPath` - checks auto memory path
- `getToolResultsDir` - gets tool results dir
- `getPlanSlug` - gets plan slug
- `getPlansDirectory` - gets plans directory
- `getSettingsFilePathForSource` - gets settings file path
- `getSettingsRootPathForSource` - gets settings root path
- `containsVulnerableUncPath` - checks vulnerable UNC path
- `windowsPathToPosixPath` - converts Windows to POSIX
- `getRuleByContentsForToolName` - gets rule by contents
- `createReadRuleSuggestion` - creates read rule suggestion
- `applyPermissionUpdates` - applies permission updates
- `persistPermissionUpdates` - persists permission updates

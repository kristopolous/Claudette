# utils/sessionStoragePortable

## Purpose
Provides portable session storage utilities for CLI and VS Code extension.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: (none)
- **Internal**: envUtils, getWorktreePathsPortable, hash

## Logic
1. Pure Node.js - no internal dependencies on logging, experiments, or feature flags
2. Shared between CLI (src/utils/sessionStorage.ts) and VS Code extension (packages/claude-vscode/src/common-host/sessionStorage.ts)
3. `LITE_READ_BUF_SIZE` (65536) - size of head/tail buffer for lite metadata reads
4. `uuidRegex` - UUID validation regex
5. `validateUuid` - validates UUID string
6. `unescapeJsonString` - unescapes JSON string value from raw text
7. Only allocates new string when escape sequences present
8. `extractJsonStringField` - extracts simple JSON string field from raw text without full parsing
9. Looks for "key":"value" or "key": "value" patterns
10. Returns first match or undefined if not found
11. `extractLastJsonStringField` - like extractJsonStringField but finds LAST occurrence
12. Useful for fields that are appended (customTitle, tag, etc.)
13. `getWorktreePathsPortable` - gets worktree paths (portable version)
14. `djb2Hash` - djb2 hash function
15. `getProjectsDirPortable` - gets projects directory (portable version)
16. `getSessionIdFromLogPortable` - gets session ID from log (portable version)
17. `getLogDisplayTitlePortable` - gets log display title (portable version)
18. `isLiteLogPortable` - checks if lite log (portable version)
19. `loadLiteLogPortable` - loads lite log (portable version)
20. `readFileTailPortable` - reads file tail (portable version)

## Exports
- `LITE_READ_BUF_SIZE` - lite read buffer size constant
- `validateUuid` - validates UUID
- `unescapeJsonString` - unescapes JSON string
- `extractJsonStringField` - extracts JSON string field
- `extractLastJsonStringField` - extracts last JSON string field
- `getWorktreePathsPortable` - gets worktree paths
- `djb2Hash` - djb2 hash function
- `getProjectsDirPortable` - gets projects directory
- `getSessionIdFromLogPortable` - gets session ID from log
- `getLogDisplayTitlePortable` - gets log display title
- `isLiteLogPortable` - checks if lite log
- `loadLiteLogPortable` - loads lite log
- `readFileTailPortable` - reads file tail

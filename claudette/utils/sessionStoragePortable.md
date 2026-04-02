# utils/sessionStoragePortable

## Purpose
Portable session storage utilities — pure Node.js with no internal dependencies on logging, experiments, or feature flags. Shared between the CLI (`src/utils/sessionStorage.ts`) and the VS Code extension (`packages/claude-vscode/src/common-host/sessionStorage.ts`). Provides JSONL file I/O, UUID validation, JSON field extraction, path sanitization, project directory discovery, and chunked transcript reading with compact boundary handling.

## Imports
- **Stdlib**: `crypto` (UUID), `fs/promises` (open, readdir, realpath, stat), `path` (join)
- **External**: (none)
- **Internal**: `./envUtils.js`, `./getWorktreePathsPortable.js`, `./hash.js`

## Logic
1. **UUID validation** — `validateUuid` checks against RFC 4122 regex
2. **JSON string field extraction** — `extractJsonStringField` and `extractLastJsonStringField` parse `"key":"value"` patterns from raw text without full JSON parse, handling escape sequences; useful for reading metadata from truncated JSONL head/tail chunks
3. **First prompt extraction** — `extractFirstPromptFromHead` scans JSONL head for first meaningful user message, skipping tool_results, meta messages, compact summaries, slash-commands, and auto-generated patterns (IDE context, hooks, tick notifications); returns up to 200 chars
4. **File I/O** — `readHeadAndTail` reads first/last 64KB of a file using a shared buffer; `readSessionLite` does the same with per-file buffer for concurrent use
5. **Path sanitization** — `sanitizePath` replaces non-alphanumeric chars with hyphens, truncates to 200 chars with hash suffix for filesystem compatibility (cross-platform including Windows reserved chars)
6. **Project directory discovery** — `getProjectsDir` returns `~/.claude/projects`; `getProjectDir` sanitizes and joins; `canonicalizePath` resolves symlinks + NFC normalization; `findProjectDir` tolerates hash mismatches for long paths via prefix scanning
7. **Session file resolution** — `resolveSessionFilePath` locates a session's JSONL file by ID, searching the given project dir (with worktree fallback) or scanning all projects
8. **Chunked transcript read** — `readTranscriptForLoad` performs a forward chunked read (1MB chunks) that strips attribution-snapshot lines, truncates at compact boundaries (unless `preservedSegment` is set), and appends the last attr-snap at EOF; uses a streaming state machine with carry buffer for lines spanning chunk boundaries

## Exports
- `LITE_READ_BUF_SIZE` — constant: 65536 (64KB head/tail buffer size)
- `validateUuid(maybeUuid)` — returns UUID or null
- `unescapeJsonString(raw)` — unescapes JSON string value, only allocates when escapes present
- `extractJsonStringField(text, key)` — extracts first `"key":"value"` from raw text
- `extractLastJsonStringField(text, key)` — extracts last occurrence (for appended fields like customTitle)
- `extractFirstPromptFromHead(head)` — extracts first meaningful user prompt from JSONL head chunk, truncated to 200 chars
- `readHeadAndTail(filePath, fileSize, buf)` — reads first/last 64KB using shared buffer
- `readSessionLite(filePath)` — reads head/tail with per-file buffer, returns LiteSessionFile or null
- `LiteSessionFile` — type: `{mtime, size, head, tail}`
- `MAX_SANITIZED_LENGTH` — constant: 200 (max filesystem path component length)
- `sanitizePath(name)` — makes string safe for directory/file name
- `getProjectsDir()` — returns `~/.claude/projects` path
- `getProjectDir(projectDir)` — returns sanitized project directory path
- `canonicalizePath(dir)` — resolves symlinks + NFC normalization
- `findProjectDir(projectPath)` — finds project dir with hash mismatch fallback for long paths
- `resolveSessionFilePath(sessionId, dir?)` — resolves session ID to JSONL file path with worktree fallback
- `SKIP_PRECOMPACT_THRESHOLD` — constant: 5MB (below which precompact filtering is skipped)
- `readTranscriptForLoad(filePath, fileSize)` — async chunked read that strips attr-snaps, truncates at compact boundaries; returns `{boundaryStartOffset, postBoundaryBuf, hasPreservedSegment}`

## Source
`sessionStoragePortable`

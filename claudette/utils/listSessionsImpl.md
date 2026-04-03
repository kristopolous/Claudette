# listSessionsImpl

## Purpose
Standalone implementation of listSessions for the Agent SDK. Lists session files with metadata extracted from stat + head/tail reads, supporting pagination, git worktrees, and cross-project scanning. Keeps dependencies minimal — no bootstrap/state, no analytics, no BUILDFLAGS, no module-scope mutable state.

## Imports
- **Stdlib**: fs (Dirent type), fs/promises (readdir, stat), path (basename, join)
- **Internal**: ./getWorktreePathsPortable, ./sessionStoragePortable (canonicalizePath, extractFirstPromptFromHead, extractJsonStringField, extractLastJsonStringField, findProjectDir, getProjectsDir, MAX_SANITIZED_LENGTH, readSessionLite, sanitizePath, validateUuid, LiteSessionFile type)

## Logic
1. **Candidate discovery** — Two-phase approach: stat-only pass to find `.jsonl` files with valid UUID names, then expensive head/tail reads only for survivors. When no limit/offset, skips stat pass entirely (readAllAndSort).
2. **Session parsing** — `parseSessionInfoFromLite` extracts summary, customTitle, firstPrompt, gitBranch, cwd, tag, createdAt from head/tail JSONL lines. Filters out sidechain sessions and metadata-only sessions with no summary.
3. **Sort & limit** — Candidates sorted by mtime desc (sessionId desc for ties). Batch-reads 32 at a time with dedup by sessionId. Offset/limit applied after filtering.
4. **Project enumeration** — `gatherProjectCandidates` handles single dirs and git worktree-aware scanning (matches worktree paths against projects dir entries). `gatherAllCandidates` enumerates all project dirs.
5. **Pagination optimization** — When limit/offset set, does cheap stat pass first, then reads only enough candidates to fill the quota. `limit: 0` means "no limit".

## Exports
- `SessionInfo` — Type: session metadata (sessionId, summary, lastModified, fileSize, customTitle, firstPrompt, gitBranch, cwd, tag, createdAt)
- `ListSessionsOptions` — Type: options for listing (dir, limit, offset, includeWorktrees)
- `parseSessionInfoFromLite` — Parses SessionInfo from a lite session read (head/tail/stat). Returns null for sidechain or metadata-only sessions.
- `listCandidates` — Lists `.jsonl` files with valid UUID names in a directory, optionally stat'ing for mtime.
- `listSessionsImpl` — Main entry: lists sessions with metadata. When dir provided, scans that project (+ worktrees). When omitted, scans all projects. Optimizes I/O via stat-only pass when limit/offset set.

## Source
`listSessionsImpl`

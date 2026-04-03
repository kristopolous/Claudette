## Purpose
Fetches current git diff data (stats and hunks) on mount; derives file list with flags and provides hunks map.

## Imports
- **External**: REACT (useEffect, useMemo, useState), `diff` (StructuredPatchHunk type)
- **Internal**:
  - `./utils/gitDiff` (fetchGitDiff, fetchGitDiffHunks, GitDiffResult, GitDiffStats)

## Logic
- State: `diffResult` (GitDiffResult | null), `hunks` (Map<string, StructuredPatchHunk[]>), `loading`
- `useEffect` (mount): parallel fetch of stats and hunks; cancellation guard; sets states; errors clear data
- `useMemo` computes `DiffData`:
  - From `diffResult.stats` and `perFileStats`
  - For each file:
    - `isLargeFile`: no hunks and not binary/untracked
    - `isTruncated`: total lines > MAX_LINES_PER_FILE (400) and not large/binary
    - flags: `isBinary`, `isUntracked`
  - Files sorted by path
  - Returns `{ stats, files, hunks, loading: false }`

## Exports
- `useDiffData` - Hook returning `DiffData`
- `DiffFile` - Type: `{ path, linesAdded, linesRemoved, isBinary, isLargeFile, isTruncated, isNewFile?, isUntracked? }`
- `DiffData` - Type: `{ stats: GitDiffStats | null, files: DiffFile[], hunks: Map<string, StructuredPatchHunk[]>, loading: boolean }`

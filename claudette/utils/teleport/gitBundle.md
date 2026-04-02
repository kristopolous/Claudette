# gitBundle

## Purpose
Creates a git bundle of the local repository and uploads it to the Files API for CCR seed-bundle seeding, enabling remote sessions to clone from the bundle instead of GitHub.

## Imports
- **Stdlib**: fs/promises
- **External**: analytics (growthbook, analytics/index)
- **Internal**: ../../services/api/filesApi, ../cwd, ../debug, ../execFileNoThrow, ../git, ../tempfile

## Logic
Bundle creation follows a three-tier fallback chain to stay within size limits:
1. **`--all`**: Bundles all refs (including `refs/seed/stash` for WIP). First attempt, captures everything.
2. **`HEAD`**: If `--all` exceeds max bytes (default 100MB), retries with HEAD-only (drops side branches/tags but keeps current-branch history).
3. **`squashed-root`**: If HEAD still too large, creates a single parentless commit of HEAD's tree (or stash tree if WIP exists) — no history, just the snapshot.

WIP handling: `git stash create` produces a dangling commit (doesn't touch refs/stash or working tree). The SHA is stored in `refs/seed/stash` so the bundle includes uncommitted changes. Untracked files are intentionally excluded.

Cleanup: Always deletes temp bundle file and `refs/seed/stash` + `refs/seed/root` refs in a `finally` block, even on crash.

## Exports
- `BundleUploadResult` - Discriminated union: `{ success: true, fileId, bundleSizeBytes, scope, hasWip }` | `{ success: false, error, failReason? }`
- `createAndUploadGitBundle` - Main entry point. Finds git root, sweeps stale refs, checks for empty repo, captures WIP via stash, creates bundle with fallback chain, uploads to Files API as `_source_seed.bundle`, cleans up. Returns file_id for `seed_bundle_file_id`.

## Source
`gitBundle`

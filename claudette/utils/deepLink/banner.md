# banner

## Purpose
Builds a security warning banner shown when a session is opened via a `claude-cli://` deep link. The banner informs the user of the session's origin, working directory, and any pre-filled prompt — defending against homoglyph/padding attacks by requiring the user to press Enter after reviewing.

## Imports
- **Stdlib**: `fs/promises` (stat), `os` (homedir), `path` (join, sep)
- **Internal**: `../format` (formatNumber, formatRelativeTimeAgo), `../git/gitFilesystem` (getCommonDir), `../git` (getGitDir)

## Logic
1. `buildDeepLinkBanner` constructs a multi-line string: always shows the tildified cwd, optionally shows repo slug + fetch age (with staleness warning if >7 days or never fetched), and optionally warns about pre-filled prompts (switching to "scroll to review" mode above 1000 chars).
2. `readLastFetchTime` reads `.git/FETCH_HEAD` mtime to determine when the repo was last fetched. Checks both the worktree's `.git` and the common dir (for worktrees), returning whichever is newer.
3. `tildify` shortens home-dir-prefixed paths to `~` notation (not using `getDisplayPath` because cwd-relative would collapse to empty string).
4. `mtimeOrUndefined` is a private helper that stats a file and returns its mtime or undefined on failure.

Constants: `STALE_FETCH_WARN_MS` = 7 days, `LONG_PREFILL_THRESHOLD` = 1000 chars.

## Exports
- `DeepLinkBannerInfo` - type with fields: `cwd`, `prefillLength?`, `repo?`, `lastFetch?`
- `buildDeepLinkBanner` - builds the multi-line warning banner string from a `DeepLinkBannerInfo`
- `readLastFetchTime` - async function returning the FETCH_HEAD mtime (or undefined) for a given cwd

## Source
`claude-code/src/utils/deepLink/banner.ts`

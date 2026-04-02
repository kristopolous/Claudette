# getWorktreePathsPortable

## Purpose
Portable worktree detection using only `child_process` — no analytics, no bootstrap deps, no execa. Used by `listSessionsImpl.ts` (SDK) and anywhere that needs worktree paths without pulling in the CLI dependency chain.

## Imports
- **Stdlib**: `child_process` (`execFile`), `util` (`promisify`)

## Logic
1. Promisifies `execFile` via `promisify`.
2. Runs `git worktree list --porcelain` in the given `cwd` with a 5-second timeout.
3. Parses stdout: filters lines starting with `worktree `, strips the prefix, and normalizes to NFC.
4. Returns empty array on any error or empty output.

## Exports
- `getWorktreePathsPortable(cwd: string): Promise<string[]>` — returns list of worktree paths

## Source
`getWorktreePathsPortable`

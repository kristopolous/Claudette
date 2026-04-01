# shared/gitOperationTracking.ts

## Purpose

Shell-agnostic git operation tracking for usage metrics and analytics. Detects git commits, pushes, branch merges/rebases, and PR creation (via `gh`, `glab`, or `curl`) from command strings and their output. Increments OTLP counters and fires analytics events. Auto-links session to PR when possible.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**:
  - State: `getCommitCounter`, `getPrCounter` from bootstrap
  - Analytics: `logEvent` with metadata type
  - Session: `linkSessionToPR` (dynamic import)
  - Config: `getSessionId` (dynamic import)

## Logic

**Regex Builders**:
- `gitCmdRe(subcmd, suffix='')`: Matches `git` with optional global options (`-c`, `--git-dir`, etc.) before subcommand. Tolerates retries with config changes.
- Prebuilt regexes: `GIT_COMMIT_RE`, `GIT_PUSH_RE`, `GIT_CHERRY_PICK_RE`, `GIT_MERGE_RE` (negative lookahead to avoid `merge-conflict`), `GIT_REBASE_RE`

**Type Definitions**:
- `CommitKind`: 'committed' | 'amended' | 'cherry-picked'
- `BranchAction`: 'merged' | 'rebased'
- `PrAction`: 'created' | 'edited' | 'merged' | 'commented' | 'closed' | 'ready'

**GH PR Actions** (`GH_PR_ACTIONS`): Array of `{re, action, op}` mapping regex to action and analytics operation name for `gh pr` subcommands

**Helper Functions**:
- `parsePrUrl(url)`: Extracts PR number, URL, repository from GitHub PR URL; returns null if invalid
- `findPrInStdout(stdout)`: Finds first GitHub PR URL in output and parses
- `parseGitCommitId(stdout)`: Extracts commit SHA from `git commit` output pattern `[branch sha] msg` (or root-commit)
- `parseGitPushBranch(output)`: Parses branch name from push ref update line (regex handles formats like `abc..def branch -> branch`, `[new branch]`, forced updates)
- `parsePrNumberFromText(stdout)`: Extracts PR number from `gh pr merge/close/ready` text output
- `parseRefFromCommand(command, verb)`: Splits command after `git <verb>` and returns first non-flag argument (the branch ref)

**Core Functions**:
- `detectGitOperation(command, output): {commit?, push?, branch?, pr?}`:
  - Detects commit/cherry-pick: matches `git commit` or `git cherry-pick`; determines kind by presence of `--amend` or cherry-pick; extracts SHA (truncated to 6 chars)
  - Detects push: matches `git push`; extracts branch name
  - Detects merge: matches `git merge` and output containing "Fast-forward" or "Merge made by"; extracts ref, action='merged'
  - Detects rebase: matches `git rebase` and output containing "Successfully rebased"; extracts ref, action='rebased'
  - Detects PR actions via `GH_PR_ACTIONS`; tries to extract PR URL from output; else tries number from text; sets `pr` object
  - Returns result object with detected operations
- `trackGitOperations(command, exitCode, stdout?)`:
  - Only processes if exitCode === 0
  - On `git commit`: logs `tengu_git_operation` with `'commit'`; if `--amend` also logs `'commit_amend'`; increments commit counter
  - On `git push`: logs `'push'`
  - On `gh pr` action: logs corresponding `pr_*` operation; if `created`, increments PR counter and attempts auto-link:
    - Dynamic imports `linkSessionToPR` and `getSessionId`
    - If stdout contains PR URL, calls `linkSessionToPR(sessionId, prNumber, prUrl, prRepository)`
  - On `glab mr create`: logs `'pr_create'`, increments PR counter
  - On `curl` POST to PR endpoint: logs `'pr_create'`, increments PR counter
  - All logging uses `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` type assertion

## Exports

- `CommitKind` type
- `BranchAction` type
- `PrAction` type
- `detectGitOperation(command: string, output: string): {commit?: {sha: string; kind: CommitKind}; push?: {branch: string}; branch?: {ref: string; action: BranchAction}; pr?: {number: number; url?: string; action: PrAction}}`
- `trackGitOperations(command: string, exitCode: number, stdout?: string): void`

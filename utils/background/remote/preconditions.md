# utils/background/remote/preconditions

## Purpose
Provides precondition checks for background remote sessions.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, oauth client, growthbook, auth, cwd, debug, detectRepository, errors, git, teleport/api, teleport/environments

## Logic
1. `checkNeedsClaudeAiLogin` - checks if user needs Claude.ai login
2. Returns false if not Claude.ai subscriber
3. Uses checkAndRefreshOAuthTokenIfNeeded for refresh check
4. `checkIsGitClean` - checks if git working directory is clean
5. Ignores untracked files (won't be lost during branch switching)
6. Uses getIsGit with ignoreUntracked: true
7. `checkHasRemoteEnvironment` - checks if user has remote environment access
8. Fetches environments, returns true if any exist
9. Catches and logs errors, returns false on failure
10. `checkIsInGitRepo` - checks if in git repository (has .git/)
11. Uses findGitRoot, distinct from checkHasGitRemote
12. `checkHasGitRemote` - checks if repo has GitHub remote configured
13. Returns false for local-only repos (git init with no origin)
14. `checkGithubAppInstalled` - checks if GitHub app installed on repo
15. Takes owner and repo parameters

## Exports
- `checkNeedsClaudeAiLogin` - checks login requirement
- `checkIsGitClean` - checks git clean status
- `checkHasRemoteEnvironment` - checks remote environment access
- `checkIsInGitRepo` - checks if in git repo
- `checkHasGitRemote` - checks git remote configured
- `checkGithubAppInstalled` - checks GitHub app installed

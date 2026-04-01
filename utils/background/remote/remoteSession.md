# utils/background/remote/remoteSession

## Purpose
Provides background remote session management for teleport sessions.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: agentSdkTypes, growthbook, policyLimits, detectRepository, envUtils, todo types, preconditions

## Logic
1. `BackgroundRemoteSession` - { id, command, startTime, status, todoList, title, type, log }
2. Status: starting, running, completed, failed, killed
3. `BackgroundRemoteSessionPrecondition` - union of failure types
4. Types: not_logged_in, no_remote_environment, not_in_git_repo, no_git_remote, github_app_not_installed, policy_blocked
5. `checkBackgroundRemoteSessionEligibility` - checks eligibility for creating session
6. Returns array of failed preconditions (empty = all passed)
7. Checks policy first (allow_remote_sessions)
8. Checks: Claude.ai login, remote environment, git repo with remote
9. `skipBundle` option for bundle seeding gate
10. Bundle seed gate: CCR_FORCE_BUNDLE, CCR_ENABLE_BUNDLE env vars, tengu_ccr_bundle_seed_enabled feature
11. When bundle seeding on, in-git-repo is enough (CCR seeds from local bundle)
12. No GitHub remote or app needed when bundle seeding

## Exports
- `BackgroundRemoteSession` - remote session type
- `BackgroundRemoteSessionPrecondition` - precondition failure type
- `checkBackgroundRemoteSessionEligibility` - checks session eligibility

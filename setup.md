# setup

## Purpose
Implements the main setup function that initializes the Claude Code session environment.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `chalk`
- **Internal**: analytics, cwd, releaseNotes, services, bootstrap state, commands, SessionMemory, types, agentSwarms, appleTerminalBackup, auth, claudemd, config, diagLogs, env, git, hooks, iTermBackup, log, logoV2Utils, nativeInstaller, permissions, plans, sessionStorage, startupProfiler, worktree utils

## Logic
1. Checks Node.js version (requires ≥18)
2. Sets up working directory and project root
3. Initializes session memory and memory file caches
4. Handles worktree creation and tmux session setup
5. Applies managed environment variables
6. Initializes file change watcher for hooks
7. Captures hooks config snapshot
8. Handles terminal backup restoration (Apple Terminal, iTerm2)
9. Locks current version for native installs
10. Gets recent activity for logo display
11. Supports custom session ID and PR number worktrees
12. Logs setup started event for diagnostics

## Exports
- `setup` - async function that initializes the session environment

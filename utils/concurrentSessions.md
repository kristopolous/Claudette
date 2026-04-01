# utils/concurrentSessions

## Purpose
Manages concurrent session tracking with PID files for `claude ps` visibility.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `bun:bundle`
- **Internal**: bootstrap state, cleanupRegistry, debug, envUtils, errors, genericProcessUtils, platform, JSON utils, teammate

## Logic
1. `SessionKind` - interactive, bg, daemon, daemon-worker
2. `SessionStatus` - busy, idle, waiting
3. `getSessionsDir` - gets ~/.claude/sessions directory
4. `envSessionKind` - gets session kind from CLAUDE_CODE_SESSION_KIND env
5. Gated with BG_SESSIONS feature for DCE
6. `isBgSession` - checks if running in `claude --bg` tmux session
7. Exit paths should detach attached client instead of killing process
8. `registerSession` - writes PID file and registers cleanup
9. Registers all top-level sessions (interactive, SDK, bg/daemon)
10. Skips teammates/subagents (would pollute ps with noise)
11. Creates directory with 0o700 mode
12. Writes JSON with pid, kind, cwd, sessionId, startTime
13. Cleanup unlinks PID file on exit
14. `countConcurrentSessions` - counts active sessions
15. `getConcurrentSessionInfo` - gets info about concurrent sessions
16. `cleanupStaleSessionFiles` - cleans up stale PID files

## Exports
- `SessionKind` - session kind type
- `SessionStatus` - session status type
- `registerSession` - registers session with PID file
- `isBgSession` - checks bg session
- `countConcurrentSessions` - counts concurrent sessions
- `getConcurrentSessionInfo` - gets session info
- `cleanupStaleSessionFiles` - cleans stale files

# terminalPanel

## Purpose
Built-in terminal panel (toggled with Meta+J) providing a persistent shell session via tmux, isolated per Claude Code instance.

## Imports
- **Stdlib**: child_process
- **Internal**: ../bootstrap/state, ../ink/instances, ./cleanupRegistry, ./cwd, ./debug

## Logic
Uses a per-instance tmux server with a unique socket (`claude-panel-<sessionId[:8]>`). Meta+J is bound to `detach-client` inside tmux so pressing it returns to Claude Code while the shell keeps running. On toggle: enters alternate screen, ensures tmux session exists (creates if needed), attaches. Falls back to a non-persistent interactive shell via `spawnSync` when tmux is unavailable. Registers cleanup to kill the tmux server on exit (detached spawn to avoid blocking event loop).

## Exports
- `getTerminalPanelSocket` - `() => string`. Returns the tmux socket name for this instance: `claude-panel-<first 8 chars of session UUID>`.
- `getTerminalPanel` - `() => TerminalPanel`. Returns singleton TerminalPanel instance, created lazily on first call. The class has a `toggle()` method that shows the shell.

## Source
`terminalPanel`

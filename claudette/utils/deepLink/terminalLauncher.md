# terminalLauncher

## Purpose
Detects the user's preferred terminal emulator and launches Claude Code inside it. Used by the deep link protocol handler when invoked by the OS (not already running inside a terminal). Supports macOS, Linux, and Windows.

## Imports
- **Stdlib**: `child_process` (spawn), `path` (basename)
- **Internal**: `../config` (getGlobalConfig), `../debug` (logForDebugging), `../execFileNoThrow` (execFileNoThrow), `../which` (which)

## Logic
1. **Detection** — Platform-specific terminal detection:
   - macOS: checks stored preference (`deepLinkTerminal` config), `TERM_PROGRAM` env var, Spotlight `mdfind` for .app bundles, fallback to `/Applications` directory listing. Terminal.app is always available.
   - Linux: checks `$TERMINAL` env var, `x-terminal-emulator`, then walks priority list (ghostty, kitty, alacritty, wezterm, gnome-terminal, konsole, xfce4-terminal, mate-terminal, tilix, xterm).
   - Windows: checks for `wt.exe`, `pwsh.exe`, `powershell.exe`, falls back to `cmd.exe`.
2. **Launching** — Two execution paths:
   - **Pure argv** (no shell interpretation): Ghostty, Alacritty, Kitty, WezTerm on macOS (via `open -na --args`), all Linux terminals, Windows Terminal. User input travels as distinct argv elements.
   - **Shell-string** (user input is shell-quoted): iTerm2, Terminal.app (AppleScript `write text`/`do script`), PowerShell (`-Command`), cmd.exe (`/k`). Correctness of shell quoting is load-bearing here.
3. **Quoting helpers** — Platform-specific escaping:
   - `shellQuote`: POSIX single-quote escaping (`'` → `'\''`)
   - `appleScriptQuote`: backslash-escapes `\` and `"` for AppleScript string literals
   - `psQuote`: PowerShell single-quote (`'` → `''`)
   - `cmdQuote`: strips `"` and `%`, doubles trailing backslashes, wraps in double quotes
4. `spawnDetached` spawns the terminal with `detached: true, stdio: 'ignore'` so the handler can exit without waiting. Resolves `false` on spawn failure (ENOENT, EACCES).
5. macOS launch falls back to Terminal.app if the preferred terminal fails.

Constants: `MACOS_TERMINALS` (6 entries with bundle IDs), `LINUX_TERMINALS` (10 entries).

## Exports
- `TerminalInfo` - type with `name: string` and `command: string`
- `detectTerminal` - async function returning the detected terminal or null
- `launchInTerminal` - async function taking `claudePath` and action object (`query?`, `cwd?`, `repo?`, `lastFetchMs?`), returns boolean success

## Source
`claude-code/src/utils/deepLink/terminalLauncher.ts`

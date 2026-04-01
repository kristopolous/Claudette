## Purpose
Provides terminal capability detection and writes optimized diff patches to the terminal output.

## Imports
- **Stdlib**: `stream`
- **External**: `semver`
- **Internal**: `utils/env`, `utils/semver`, `ink/clearTerminal`, `ink/frame`, `ink/termio/csi`, `ink/termio/dec`, `ink/termio/osc`

## Logic
Detects terminal capabilities by inspecting environment variables and XTVERSION probe results. Checks for OSC 9;4 progress reporting support (ConEmu, Ghostty 1.2.0+, iTerm2 3.6.6+), DEC 2026 synchronized output support (modern terminals excluding tmux), extended key protocol support (Kitty keyboard + modifyOtherKeys), xterm.js-based terminals (VS Code, Cursor), and cursor-up viewport yank bug on Windows. The `writeDiffToTerminal` function buffers all patch operations into a single string, optionally wrapping with BSU/ESU sequences for flicker-free rendering, and writes to stdout.

## Exports
- `Progress` - type describing progress state (running, completed, error, indeterminate)
- `isProgressReportingAvailable` - checks if terminal supports OSC 9;4 progress reporting
- `isSynchronizedOutputSupported` - checks if terminal supports DEC mode 2026 synchronized output
- `setXtversionName` - records the XTVERSION response from the terminal
- `isXtermJs` - checks if running in an xterm.js-based terminal
- `supportsExtendedKeys` - checks if terminal handles extended key reporting
- `hasCursorUpViewportYankBug` - checks if terminal scrolls viewport on cursor-up sequences
- `SYNC_OUTPUT_SUPPORTED` - cached boolean for synchronized output support
- `Terminal` - type describing stdout and stderr writables
- `writeDiffToTerminal` - writes a diff of patches to the terminal with optional sync markers

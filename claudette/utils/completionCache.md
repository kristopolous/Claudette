# utils/completionCache

## Purpose
Provides shell completion script caching and setup for zsh, bash, and fish.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`, `url`
- **External**: STYLER
- **Internal**: design-system color, ink supports-hyperlinks, debug, errors, execFileNoThrow, log, theme

## Logic
1. `ShellInfo` - name, rcFile, cacheFile, completionLine, shellFlag
2. `detectShell` - detects shell from SHELL env var
3. Supports zsh, bash, fish (including .exe variants)
4. Returns shell config with rc file and cache file paths
5. `formatPathLink` - formats path with terminal hyperlink support
6. Uses supportsHyperlinks() to check terminal capability
7. Creates file:// URL for hyperlink
8. `setupShellCompletion` - generates and caches completion script
9. Adds source line to shell's rc file
10. Returns user-facing status message
11. Creates ~/.claude directory if needed
12. Writes completion script to cache file
13. Checks if completion line already in rc file
14. Appends completion line if not present
15. Logs debug info for setup process

## Exports
- `ShellInfo` - shell info type
- `detectShell` - detects shell from environment
- `formatPathLink` - formats path with hyperlink
- `setupShellCompletion` - sets up shell completion

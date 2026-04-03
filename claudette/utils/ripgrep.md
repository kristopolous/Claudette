# utils/ripgrep

## Purpose
Provides ripgrep command configuration and execution utilities.

## Imports
- **Stdlib**: `child_process`, `os`, `path`, `url`
- **External**: `lodash-es/memoize`
- **Internal**: analytics, bundledMode, debug, envUtils, execFileNoThrow, findExecutable, log, platform, stringUtils

## Logic
1. `RipgrepConfig` - { mode, command, args, argv0 }
2. `getRipgrepConfig` - memoized config getter
3. Checks USE_BUILTIN_RIPGREP env var (falsy = use system ripgrep)
4. System ripgrep: finds 'rg' via findExecutable, uses command name 'rg' (not path) for PATH hijacking protection
5. Bundled mode: ripgrep statically compiled into the binary, dispatches based on argv[0]
6. Spawns self with argv0='rg'
7. Builtin mode: uses vendored ripgrep from vendor/ripgrep directory
8. Platform-specific paths: {arch}-win32/rg.exe or {arch}-{platform}/rg
9. `ripgrepCommand` - gets ripgrep command configuration
10. Returns { rgPath, rgArgs, argv0 }
11. `MAX_BUFFER_SIZE` (20MB) - max buffer size for ripgrep output
12. Large monorepos can have 200k+ files
13. `ripgrep` - executes ripgrep command
14. `ripgrepSync` - executes ripgrep synchronously
15. `countCharInString` - counts character occurrences in string
16. `isInBundledMode` - checks bundled mode
17. `logForDebugging` - debug logging
18. `isEnvDefinedFalsy` - checks env var falsy
19. `execFileNoThrow` - executes file without throwing
20. `findExecutable` - finds executable
21. `logError` - logs error
22. `getPlatform` - gets platform
23. `logEvent` - logs analytics event

## Exports
- `RipgrepConfig` - ripgrep config type
- `getRipgrepConfig` - gets ripgrep config
- `ripgrepCommand` - gets ripgrep command
- `MAX_BUFFER_SIZE` - max buffer size constant
- `ripgrep` - executes ripgrep
- `ripgrepSync` - executes ripgrep synchronously
- (Ripgrep execution functions)

### Helpful Prompt Templates

- **(No prompt templates found in this file)** - This file contains ripgrep configuration and execution logic but no prompt strings.

# utils/envDynamic

## Purpose
Provides dynamic environment detection requiring exec (Docker, JetBrains IDE, etc.).

## Imports
- **Stdlib**: `fs/promises`
- **External**: BUILDFLAGS, `lodash-es/memoize`
- **Internal**: env, envUtils, execFileNoThrow, genericProcessUtils

## Logic
1. `getIsDocker` - checks if running in Docker via /.dockerenv file
2. Linux-only check, uses test -f command
3. `getIsBubblewrapSandbox` - checks CLAUDE_CODE_BUBBLEWRAP env var
4. `muslRuntimeCache` - cache for musl libc detection fallback
5. Fire-and-forget cache population for node fallback path
6. `isMuslEnvironment` - checks for MUSL libc vs glibc
7. Uses feature flags (IS_LIBC_MUSL, IS_LIBC_GLIBC) for native builds
8. Falls back to runtime stat check for node unbundled
9. `jetBrainsIDECache` - cache for JetBrains IDE detection
10. `detectJetBrainsIDEFromParentProcessAsync` - detects from ancestor commands
11. macOS uses bundle ID detection (handled elsewhere)
12. Checks ancestor commands for JetBrains executables
13. `getJetBrainsIDE` - gets detected JetBrains IDE name
14. `isJetBrainsIDE` - checks if running in JetBrains IDE

## Exports
- `getIsDocker` - checks Docker environment
- `getIsBubblewrapSandbox` - checks Bubblewrap sandbox
- `isMuslEnvironment` - checks MUSL libc environment
- `getJetBrainsIDE` - gets JetBrains IDE name
- `isJetBrainsIDE` - checks JetBrains IDE

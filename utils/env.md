# utils/env

## Purpose
Provides environment detection and configuration utilities.

## Imports
- **Stdlib**: `os`, `path`
- **External**: `lodash-es/memoize`
- **Internal**: oauth constants, bundledMode, envUtils, findExecutable, fsOperations, which

## Logic
1. `getGlobalClaudeFile` - gets global Claude config file path
2. Legacy fallback to .config.json if exists
3. Uses fileSuffixForOauthConfig for oauth config suffix
4. Respects CLAUDE_CONFIG_DIR env var
5. `hasInternetAccess` - checks internet connectivity via 1.1.1.1
6. 1-second timeout for connectivity check
7. `isCommandAvailable` - checks if command exists via which
8. `detectPackageManagers` - detects npm, yarn, pnpm
9. `detectRuntimes` - detects bun, deno, node
10. `isWslEnvironment` - checks for WSL via /proc/sys/fs/binfmt_misc/WSLInterop
11. `getPlatform` - gets platform name (win32, darwin, linux)
12. `isMacOS` - checks if running on macOS
13. `isWindows` - checks if running on Windows
14. `isLinux` - checks if running on Linux
15. `getHomeDir` - gets home directory path
16. `getTempDir` - gets temp directory path

## Exports
- `getGlobalClaudeFile` - gets global config file
- `hasInternetAccess` - checks internet access
- `isCommandAvailable` - checks command availability
- `detectPackageManagers` - detects package managers
- `detectRuntimes` - detects runtimes
- `isWslEnvironment` - checks WSL environment
- (Platform detection functions)

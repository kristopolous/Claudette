# utils/platform

## Purpose
Provides platform detection utilities for macOS, Windows, WSL, and Linux.

## Imports
- **Stdlib**: `fs/promises`, `os`
- **External**: `lodash-es/memoize`
- **Internal**: fsOperations, log

## Logic
1. `Platform` - 'macos' | 'windows' | 'wsl' | 'linux' | 'unknown'
2. `SUPPORTED_PLATFORMS` - ['macos', 'wsl']
3. `getPlatform` - memoized platform detection
4. macOS: process.platform === 'darwin'
5. Windows: process.platform === 'win32'
6. Linux: checks /proc/version for Microsoft/WSL markers
7. WSL: returns 'wsl' if Microsoft/WSL in /proc/version
8. Regular Linux: returns 'linux'
9. Unknown: returns 'unknown' on error
10. `getWslVersion` - memoized WSL version detection
11. Only checks on Linux systems
12. Matches WSL1, WSL2, etc. via /proc/version
13. Falls back to '1' if Microsoft marker but no version
14. Returns undefined if not WSL or unable to determine

## Exports
- `Platform` - platform type
- `SUPPORTED_PLATFORMS` - supported platforms array
- `getPlatform` - detects platform
- `getWslVersion` - detects WSL version

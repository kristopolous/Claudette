# powershellDetection

## Purpose
Detects and locates PowerShell on the system, with special handling for Linux snap installations that can hang in subprocesses. Caches the result for performance and infers the PowerShell edition (core vs desktop) for version-appropriate syntax guidance.

## Logic
1. `findPowerShell` prefers pwsh (PowerShell Core 7+) over powershell (5.1). On Linux, if PATH resolves to a snap launcher (/snap/…), probes known apt/rpm install locations (/opt/microsoft/powershell/7/pwsh, /usr/bin/pwsh) to avoid snapd confinement initialization hangs
2. `getCachedPowerShellPath` memoizes findPowerShell with a promise cache — safe for concurrent callers
3. `getPowerShellEdition` infers edition from binary basename: pwsh → 'core' (supports &&, ||, ?:, ??), powershell → 'desktop' (no pipeline chain operators, stderr-sets-$? bug, UTF-16 encoding)
4. `resetPowerShellCache` clears the memoized result — only for testing
5. `probePath` internal helper that checks if a path exists and is a file

## Items

### probePath
**Type**: Function

### findPowerShell
**Type**: Function

### getCachedPowerShellPath
**Type**: Function

### getPowerShellEdition
**Type**: Function

### resetPowerShellCache
**Type**: Function

### PowerShellEdition
**Type**: Type alias

## Exports
- findPowerShell
- getCachedPowerShellPath
- PowerShellEdition
- getPowerShellEdition
- resetPowerShellCache

## Source
`powershellDetection`
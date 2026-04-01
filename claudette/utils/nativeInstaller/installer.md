# utils/nativeInstaller/installer

## Purpose
Implements file-based native installer system with directory management and version control.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: analytics, autoUpdater, cleanupRegistry, config, debug, doctorDiagnostic, env, envDynamic, envUtils, errors, execFileNoThrow, localInstaller, lockfile, log, semver, shellConfig, sleep, xdg, nativeInstaller download/pidLock

## Logic
1. `VERSION_RETENTION_COUNT` (2) - versions to retain
2. `LOCK_STALE_MS` (7 days) - mtime-based lock stale timeout
3. Directory structure management with symlinks
4. Version installation and activation
5. Multi-process safety with locking
6. Simple fallback mechanism using modification time
7. Supports both JS and native builds
8. `checkInstall` - checks installation status
9. `cleanupNpmInstallations` - cleans up npm installations
10. `cleanupOldVersions` - cleans up old versions
11. `cleanupShellAliases` - cleans up shell aliases
12. `installLatest` - installs latest version
13. `lockCurrentVersion` - locks current version
14. `removeInstalledSymlink` - removes installed symlink
15. Uses acquireProcessLifetimeLock for process safety
16. Uses withLock for file operations
17. Handles version retention and cleanup

## Exports
- `VERSION_RETENTION_COUNT` - version retention constant
- `LOCK_STALE_MS` - lock stale timeout constant
- `checkInstall` - checks installation
- `cleanupNpmInstallations` - cleans npm installations
- `cleanupOldVersions` - cleans old versions
- `cleanupShellAliases` - cleans shell aliases
- `installLatest` - installs latest
- `lockCurrentVersion` - locks version
- `removeInstalledSymlink` - removes symlink
- (Installer implementation functions)

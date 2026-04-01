# utils/nativeInstaller/index

## Purpose
Provides native installer public API barrel file.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: installer

## Logic
1. Re-exports only functions actually used by external modules
2. External modules should only import from this file
3. `checkInstall` - checks installation status
4. `cleanupNpmInstallations` - cleans up npm installations
5. `cleanupOldVersions` - cleans up old versions
6. `cleanupShellAliases` - cleans up shell aliases
7. `installLatest` - installs latest version
8. `lockCurrentVersion` - locks current version
9. `removeInstalledSymlink` - removes installed symlink
10. `SetupMessage` - setup message type

## Exports
- `checkInstall` - checks installation
- `cleanupNpmInstallations` - cleans npm installations
- `cleanupOldVersions` - cleans old versions
- `cleanupShellAliases` - cleans shell aliases
- `installLatest` - installs latest
- `lockCurrentVersion` - locks version
- `removeInstalledSymlink` - removes symlink
- `SetupMessage` - setup message type

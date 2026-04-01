## Purpose
Determines the installation type and delegates to the appropriate auto-updater component.

## Imports
- **Stdlib**: none
- **External**: `bun:bundle` (feature), `react`, `react/compiler-runtime`
- **Internal**: `AutoUpdaterResult` (utils/autoUpdater), `isAutoUpdaterDisabled` (utils/config), `logForDebugging` (utils/debug), `getCurrentInstallationType` (utils/doctorDiagnostic), `AutoUpdater`, `NativeAutoUpdater`, `PackageManagerAutoUpdater`

## Logic
On mount, detects the installation type (native or package-manager) unless auto-updates are disabled. Renders null until detection completes, then delegates to `PackageManagerAutoUpdater` for package-manager installs or `NativeAutoUpdater`/`AutoUpdater` for native installs, passing through all update-related props.

## Exports
- `AutoUpdaterWrapper` - wrapper component that selects and renders the correct auto-updater based on installation type

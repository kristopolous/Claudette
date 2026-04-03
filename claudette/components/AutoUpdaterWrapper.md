## Purpose
A higher-order component that abstracts the logic for detecting the application's installation environment and conditionally renders the most appropriate auto-updater mechanism.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `feature` (BUILDFLAGS), `AutoUpdaterResult` (utils/autoUpdater, type only), `isAutoUpdaterDisabled` (utils/config), `logForDebugging` (utils/debug), `getCurrentInstallationType` (utils/doctorDiagnostic), `AutoUpdater`, `NativeAutoUpdater`, `PackageManagerAutoUpdater`

## Logic
1. **Environment Detection**:
    - On mount, asynchronously determines the installation type via `getCurrentInstallationType`.
    - Detection is skipped when the `SKIP_DETECTION_WHEN_AUTOUPDATES_DISABLED` feature flag is active and auto-updates are disabled via config.
    - Sets `useNativeInstaller` to true for "native" installs, `isPackageManager` to true for "package-manager" installs.
2. **Updater Selection**:
    - While detection is pending (`null`), renders nothing.
    - If `isPackageManager` is true, renders `PackageManagerAutoUpdater`.
    - Otherwise, renders `NativeAutoUpdater` if `useNativeInstaller` is true, or `AutoUpdater` as the fallback.
3. **Props Passthrough**: Passes all props (`isUpdating`, `onChangeIsUpdating`, `onAutoUpdaterResult`, `autoUpdaterResult`, `showSuccessMessage`, `verbose`) through to the selected updater component.

## Exports
- `AutoUpdaterWrapper` - The component responsible for selecting and rendering the correct auto-update implementation.

## Purpose
Displays a startup dialog prompting users to try the Claudette desktop application with options to defer or dismiss permanently.

## Imports
- **Stdlib**: process
- **External**: react, react/compiler-runtime
- **Internal**: services/analytics/growthbook, services/analytics/index, utils/config, components/CustomSelect/select, components/DesktopHandoff, components/permissions/PermissionDialog

## Logic
1. Checks if the current platform is supported (macOS or Windows x64)
2. Retrieves dynamic config to determine if the startup dialog is enabled
3. Tracks how many times the upsell has been shown, hiding after 3 displays
4. Renders a PermissionDialog with a Select offering "Open in Claudette Desktop", "Not now", and "Don't ask again" options
5. On "try" selection, transitions to a DesktopHandoff component; on dismissal, persists config and calls onDone

## Exports
- `getDesktopUpsellConfig` - retrieves the desktop upsell dynamic config from growthbook
- `shouldShowDesktopUpsellStartup` - determines whether the upsell dialog should be shown based on platform, config, and dismissal state
- `DesktopUpsellStartup` - React component that renders the desktop upsell dialog at startup

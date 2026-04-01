## Purpose
Displays a dialog prompting the user to enable or disable auto-connect to an IDE, and provides helper functions to determine when each dialog should be shown.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `ink`, `utils/config`, `utils/ide`, `components/CustomSelect/index`, `components/design-system/Dialog`

## Logic
1. `IdeAutoConnectDialog` presents a yes/no selection, saves the preference to global config, and marks the dialog as shown
2. `IdeDisableAutoConnectDialog` presents a yes/no selection to disable auto-connect, updates global config accordingly
3. `shouldShowAutoConnectDialog` checks if the terminal is unsupported, auto-connect is not already enabled, and the dialog has not been shown before
4. `shouldShowDisableAutoConnectDialog` checks if the terminal is unsupported and auto-connect is currently enabled

## Exports
- `IdeAutoConnectDialog` - React component that prompts the user to enable IDE auto-connect
- `shouldShowAutoConnectDialog` - returns true when the auto-connect enable dialog should be displayed
- `IdeDisableAutoConnectDialog` - React component that prompts the user to disable IDE auto-connect
- `shouldShowDisableAutoConnectDialog` - returns true when the auto-connect disable dialog should be displayed

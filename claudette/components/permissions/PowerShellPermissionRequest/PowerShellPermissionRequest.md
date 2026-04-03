## Purpose
Renders a permission request dialog for PowerShell command execution, with support for editable prefix rules and destructive command warnings.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: ink, keybindings/useKeybinding, services/analytics/growthbook, services/analytics/index, services/analytics/metadata, tools/PowerShellTool/destructiveCommandWarning, tools/PowerShellTool/PowerShellTool, tools/PowerShellTool/readOnlyValidation, utils/permissions/PermissionUpdateSchema, utils/powershell/staticPrefix, CustomSelect/select, permissions/hooks, permissions/PermissionDecisionDebugInfo, permissions/PermissionDialog, permissions/PermissionExplanation, permissions/PermissionRequest, permissions/PermissionRuleExplanation, permissions/useShellPermissionFeedback, permissions/utils, PowerShellPermissionRequest/powershellToolUseOptions

## Logic
1. Parse the PowerShell command input and extract the command and description
2. Set up the permission explainer UI and shell permission feedback hooks
3. Compute an editable prefix for single-line commands, initially the raw command then refined via AST-based prefix extraction for compound commands
4. Build dialog options via powershellToolUseOptions, handling yes/no with feedback and prefix editing
5. On selection, log analytics events and either allow with permission updates for prefix rules or reject with feedback
6. Render the PermissionDialog with command display, destructive warnings, debug info toggle, and option selection

## Exports
- `PowerShellPermissionRequest` - component that handles PowerShell command permission requests with editable prefix rules and feedback support

## Purpose
Renders a permission approval dialog for computer use operations, handling either missing macOS TCC permissions or app allowlist selection with grant flags.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime, figures
- **Internal**: ink, utils/execFileNoThrow, utils/stringUtils, CustomSelect/select, design-system/Dialog, @ant/computer-use-mcp/sentinelApps, @ant/computer-use-mcp/types

## Logic
1. Dispatch between two panels based on whether TCC state is present
2. TCC panel: show accessibility and screen recording permission status, offer buttons to open System Settings for each missing permission, and a retry option
3. App list panel: display resolved apps with their grant status, sentinel category warnings for shell/filesystem/system_settings access, and requested capability flags
4. Track checked apps in state and build a response with granted, denied, and flags on approval
5. On deny, return a default response with empty granted and denied lists

## Exports
- `ComputerUseApproval` - dispatcher component that shows either the TCC panel or app list panel based on the permission request state

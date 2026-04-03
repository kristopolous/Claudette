## Purpose
Displays a security dialog warning users about external CLAUDE.md file imports and prompts them to allow or deny.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT/compiler-runtime
- **Internal**: services/analytics/index (logEvent), ink (Box, Link, Text), utils/claudemd (ExternalClaudeMdInclude), utils/config (saveCurrentProjectConfig), CustomSelect/index (Select), design-system/Dialog (Dialog)

## Logic
1. Logs an analytics event when the dialog is shown
2. Renders a warning message about external imports and a security notice with a documentation link
3. Lists the external import paths if provided
4. Presents a Select with "allow" and "deny" options, logging analytics and saving the project config accordingly
5. Calls onDone after the user makes a selection

## Exports
- `ClaudeMdExternalIncludesDialog` - UI component that prompts users about external CLAUDE.md imports

## Purpose
Renders a permission request dialog for bash command execution, with support for sed edit detection, auto-approval via classifier, and editable prefix rules.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime, figures
- **Internal**: ink, useKeybinding, useAppState, BashTool, BashTool/bashPermissions, BashTool/destructiveCommandWarning, BashTool/sedEditParser, BashTool/shouldUseSandbox, utils/bash/prefix, utils/permissions/bashClassifier, utils/permissions/PermissionUpdate, utils/sandbox/sandbox-adapter, CustomSelect/select, Spinner/ShimmerChar, Spinner/useShimmerAnimation, permissions/hooks, permissions/PermissionDecisionDebugInfo, permissions/PermissionDialog, permissions/PermissionExplanation, permissions/PermissionRequest, permissions/PermissionRuleExplanation, permissions/SedEditPermissionRequest, permissions/useShellPermissionFeedback, permissions/utils, BashPermissionRequest/bashToolUseOptions

## Logic
1. Parse the bash command input and check if it is a sed edit; if so, delegate to SedEditPermissionRequest
2. For non-sed commands, asynchronously generate a classifier description if classifier permissions are enabled
3. Compute an editable prefix for "don't ask again" rules, initially from sync heuristics and optionally refined via tree-sitter
4. Track classifier check state (in-progress, auto-approved, or requiring manual approval)
5. Build dialog options via bashToolUseOptions, handling yes/no with feedback, prefix editing, and classifier-reviewed rules
6. On selection, log analytics events and either allow with permission updates or reject with feedback
7. Render the PermissionDialog with command display, destructive warnings, debug info toggle, and option selection

## Exports
- `BashPermissionRequest` - main component that handles bash command permission requests, delegating to SedEditPermissionRequest for sed commands or rendering the full dialog for other commands
- `ClassifierCheckingSubtitle` - isolated component that renders a shimmer animation during classifier checks to avoid re-rendering the entire dialog at 20fps

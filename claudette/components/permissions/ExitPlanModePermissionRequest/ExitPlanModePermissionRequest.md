## Purpose
Renders a permission request dialog for exiting plan mode, displaying the generated plan and offering multiple approval options including mode selection, context clearing, and feedback.

## Imports
- **Stdlib**: none
- **External**: react, react/compiler-runtime, figures, BUILDFLAGS, crypto, @anthropic-ai/sdk/resources/messages
- **Internal**: context/notifications, services/analytics/index, state/AppState, bootstrap/state, commands/rename/generateSessionName, commands/ultraplan, ink/events/keyboard-event, ink, state/AppStateStore, tools/AgentTool/constants, tools/ExitPlanModeTool/constants, tools/ExitPlanModeTool/ExitPlanModeV2Tool, tools/TeamCreateTool/constants, utils/agentSwarmsEnabled, utils/context, utils/editor, utils/file, utils/ide, utils/log, utils/messageQueueManager, utils/messages, utils/model/model, utils/permissions/bashClassifier, utils/permissions/PermissionMode, utils/permissions/PermissionUpdateSchema, utils/permissions/permissionSetup, utils/planModeV2, utils/plans, utils/promptEditor, utils/sessionStorage, utils/settings/settings, CustomSelect/index, Markdown, permissions/PermissionDialog, permissions/PermissionRequest, permissions/PermissionRuleExplanation, utils/permissions/autoModeState, utils/config, utils/imageResizer, utils/imageStore

## Logic
1. Parse the plan content from the tool input, detecting V1 vs V2 tool format
2. Build approval options based on available modes (bypass permissions, accept edits, auto mode), clear context availability, and ultraplan feature flag
3. Handle keyboard shortcuts: Ctrl+G for external editor, Shift+Tab for auto-accept edits
4. On approval, determine the permission mode, optionally clear context, auto-name the session from plan content, set the initial message with the plan, and log analytics events
5. On rejection with feedback, process pasted images and send feedback to the model
6. Support sticky footer rendering in fullscreen mode for long plans
7. Handle empty plans with a simplified yes/no dialog

## Exports
- `ExitPlanModePermissionRequest` - component that handles exiting plan mode with plan display, multiple approval modes, feedback, and external editor support
- `buildPermissionUpdates` - creates permission update objects for plan approval including mode changes and prompt-based rules
- `autoNameSessionFromPlan` - asynchronously generates and saves a session name from plan content
- `buildPlanApprovalOptions` - constructs the options array for plan approval based on available modes and features

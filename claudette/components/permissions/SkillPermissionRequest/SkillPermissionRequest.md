## Purpose
Renders a permission request dialog for skill tool execution, with options for single use, exact skill always-allow, or command-prefix always-allow rules.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: utils/log, bootstrap/state, ink, services/analytics/metadata, tools/SkillTool/constants, tools/SkillTool/SkillTool, utils/env, utils/permissions/permissionsLoader, utils/unaryLogging, permissions/hooks, permissions/PermissionDialog, permissions/PermissionPrompt, permissions/PermissionRequest, permissions/PermissionRuleExplanation

## Logic
1. Parse the skill tool input to extract the skill name
2. Build base options with a yes option that supports feedback
3. When always-allow options are permitted, add an exact-match rule for the full skill command and a prefix-based rule for the command prefix
4. Add a no option with feedback support
5. On selection, log unary events and either allow with optional permission updates for always-allow rules or reject with feedback
6. Render the PermissionDialog with skill display, command description, rule explanation, and option selection

## Exports
- `SkillPermissionRequest` - component that handles skill tool permission requests with options for single use or skill-level always-allow rules

## Purpose
Renders a permission request dialog for web fetch operations, allowing single approval or domain-based always-allow rules.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink, tools/WebFetchTool, utils/permissions/permissionsLoader, CustomSelect/select, permissions/hooks, permissions/PermissionDialog, permissions/PermissionRequest, permissions/PermissionRuleExplanation, permissions/utils

## Logic
1. Extract the URL and hostname from the tool input
2. Build options: a simple yes, an optional yes-dont-ask-again-domain when always-allow is permitted, and a no option
3. On yes, log the accept event and call onAllow with no permission updates
4. On yes-dont-ask-again-domain, create a domain-based permission rule and save it to local settings
5. On no, log the reject event and call onReject
6. Render the PermissionDialog with the URL display, description, rule explanation, and option selection

## Exports
- `WebFetchPermissionRequest` - component that handles web fetch permission requests with options for single approval or domain-level always-allow rules

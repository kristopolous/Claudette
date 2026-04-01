## Purpose
Displays a human-readable description of a permission rule value.

## Imports
- **Stdlib**: None
- **External**: `react`
- **Internal**: `ink`, `tools/BashTool/BashTool`, `utils/permissions/PermissionRule`

## Logic
1. Switches on the tool name in the rule value
2. For BashTool, renders descriptions based on whether ruleContent exists and if it ends with ":*" (prefix match)
3. For other tools, renders a description if no specific ruleContent is set
4. Returns null for non-Bash tools with specific rule content

## Exports
- `PermissionRuleDescription` - renders a dim-colored text description explaining what a permission rule allows or denies

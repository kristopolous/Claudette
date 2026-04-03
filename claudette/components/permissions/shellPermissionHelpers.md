## Purpose
Generates descriptive labels for the "always allow" option in shell permission dialogs based on suggested rules, directories, and commands.

## Imports
- **Stdlib**: `path`
- **External**: REACT
- **Internal**: `bootstrap/state`, `ink`, `utils/permissions/PermissionUpdateSchema`, `utils/permissions/shellRuleMatching`

## Logic
Separates permission suggestions into read rules, shell rules, and directories. Extracts command prefixes from shell rules and path names from read rules. Generates context-appropriate labels based on which types of suggestions are present, handling single and multiple items with proper formatting and truncation for long command lists.

## Exports
- `generateShellSuggestionsLabel` - creates a descriptive label for the "yes, and apply suggestions" option based on the mix of read paths, directories, and shell commands in the suggestions

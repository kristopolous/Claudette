# agents

## Purpose
Implements the `claude agents` subcommand that prints the list of configured agents.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: AgentTool display utils, loadAgentsDir, cwd utils

## Logic
1. `formatAgent` - formats agent display line with model and memory info
2. Fetches agent definitions with overrides from config
3. Filters to active agents only
4. Resolves agent overrides (shadowing)
5. Groups agents by source (bundled, project, user, etc.)
6. Sorts each group by name
7. Shows "(shadowed by X)" for overridden agents
8. Prints total active count and formatted list

## Exports
- `agentsHandler` - async function that prints agent list

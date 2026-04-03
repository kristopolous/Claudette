## Purpose
Defines tool availability sets for different agent execution modes including async agents, in-process teammates, and coordinator mode.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS
- **Internal**: tool name constants from individual tool modules, shell tool utilities

## Logic
Maintains sets of allowed and disallowed tools for various agent contexts. Async agents have a restricted toolset to prevent recursion and main-thread dependency issues. In-process teammates get additional task management tools. Coordinator mode is limited to output and agent management tools.

## Exports
- `ALL_AGENT_DISALLOWED_TOOLS` - set of tools disallowed for all agent executions
- `CUSTOM_AGENT_DISALLOWED_TOOLS` - set of tools disallowed for custom agents
- `ASYNC_AGENT_ALLOWED_TOOLS` - set of tools available to async background agents
- `IN_PROCESS_TEAMMATE_ALLOWED_TOOLS` - set of tools available only to in-process teammates
- `COORDINATOR_MODE_ALLOWED_TOOLS` - set of tools available in coordinator mode

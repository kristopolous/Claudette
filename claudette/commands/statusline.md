## Purpose
Displays the status line in the terminal showing current mode, project, and task information.

## Imports
- **Internal**: `Command` type, `AGENT_TOOL_NAME`

## Logic
'prompt' type command that generates a prompt to create an agent with subagent_type "statusline-setup". This agent renders the terminal status line UI showing current mode, project, time, and task indicators. The command includes allowed tools for reading settings and configuring the status display.

## Exports
- `default` - The statusline command object

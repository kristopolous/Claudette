## Purpose
Provides the description and prompt for the TaskListTool, including conditional teammate workflow instructions.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `isAgentSwarmsEnabled`

## Logic
Exports a static description and a dynamic prompt function. The prompt conditionally includes teammate workflow instructions and agent swarms context based on whether `isAgentSwarmsEnabled` returns true. The prompt explains when to use the tool, the output format (id, subject, status, owner, blockedBy), and recommends working in ID order.

## Exports
- `DESCRIPTION` - static description string for the tool
- `getPrompt` - returns the prompt string with conditional teammate workflow sections

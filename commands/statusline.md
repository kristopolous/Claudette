## Purpose
Set up Claude Code's status line UI in the terminal based on shell PS1 configuration.

## Imports
- **External**: `@anthropic-ai/sdk` (ContentBlockParam)
- **Internal**: AGENT_TOOL_NAME constant

## Logic
1. Prompt command that delegates to a specialized agent
2. Takes optional args for custom prompt, defaults to "Configure my statusLine from my shell PS1 configuration"
3. Allowed tools: AGENT_TOOL_NAME (statusline-setup agent), Read (any file), Edit (~/.claude/settings.json)
4. Creates agent with subagent_type "statusline-setup" and the prompt
5. Agent will analyze shell configuration and configure status line accordingly
6. Disabled in non-interactive mode
7. Command type: 'prompt' with dynamic content length

## Exports
- `default` - statusline Command object (prompt type)

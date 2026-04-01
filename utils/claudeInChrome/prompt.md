# utils/claudeInChrome/prompt

## Purpose
Provides system prompts and instructions for Claude in Chrome browser automation.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `BASE_CHROME_PROMPT` - base prompt for Chrome browser automation
2. Guidelines for GIF recording with gif_creator tool
3. Console log debugging via read_console_messages with pattern filtering
4. Alerts/dialogs handling - avoid triggering, use console.log instead
5. Rabbit hole prevention - stop after 2-3 failures, unexpected complexity
6. Tab context: call tabs_context_mcp at session start
7. Never reuse tab IDs from previous sessions
8. `CHROME_TOOL_SEARCH_INSTRUCTIONS` - instructions when tool search enabled
9. Must load chrome tools via ToolSearch before using
10. Example: ToolSearch with 'select:mcp__claude-in-chrome__tabs_context_mcp'
11. `getChromeSystemPrompt` - returns base prompt without tool search instructions
12. Tool search instructions injected separately based on enabled state
13. `CLAUDE_IN_CHROME_SKILL_HINT` - minimal hint for skill availability
14. Instructs to invoke 'claude-in-chrome' skill before using MCP tools
15. Variant for when WebBrowser tool also available (steer dev-loop to WebBrowser)

## Exports
- `BASE_CHROME_PROMPT` - base Chrome automation prompt
- `CHROME_TOOL_SEARCH_INSTRUCTIONS` - tool search instructions
- `getChromeSystemPrompt` - gets Chrome system prompt
- `CLAUDE_IN_CHROME_SKILL_HINT` - skill availability hint

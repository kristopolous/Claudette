# claudeInChrome

## Purpose
Implements the /claude-in-chrome bundled skill for Chrome browser automation via MCP.

## Imports
- **Stdlib**: (none)
- **External**: `@ant/claude-for-chrome-mcp`
- **Internal**: claudeInChrome prompt, setup utils, bundledSkills

## Logic
1. `registerClaudeInChromeSkill` - registers the skill with isEnabled check
2. Maps BROWSER_TOOLS to mcp__claude-in-chrome__* tool names
3. `SKILL_ACTIVATION_MESSAGE` - informs user about Chrome tool availability
4. Starts by calling mcp__claude-in-chrome__tabs_context_mcp for tab info
5. Requires site-level permissions before executing (configured in extension)
6. Automates clicking, form filling, screenshots, console logs, navigation
7. Opens pages in new tabs within existing Chrome session
8. Appends user task args to base Chrome prompt

## Exports
- `registerClaudeInChromeSkill` - function that registers the skill
- `CLAUDE_IN_CHROME_MCP_TOOLS` - array of MCP tool names
- `SKILL_ACTIVATION_MESSAGE` - activation instruction text

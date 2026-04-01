# tools/AgentTool/built-in/claudeCodeGuideAgent

## Purpose
Defines the Claude Code Guide agent for helping users with Claude Code, Agent SDK, and Claude API.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: BashTool, FileReadTool, GlobTool, GrepTool, SendMessageTool, WebFetchTool, WebSearchTool, auth, embeddedTools, settings, JSON utils, loadAgentsDir

## Logic
1. `CLAUDE_CODE_GUIDE_AGENT_TYPE` - 'claude-code-guide'
2. `CLAUDE_CODE_DOCS_MAP_URL` - https://code.claude.com/docs/en/claude_code_docs_map.md
3. `CDP_DOCS_MAP_URL` - https://platform.claude.com/llms.txt
4. `getClaudeCodeGuideBasePrompt` - generates base prompt for guide agent
5. Expertise in three domains:
   - Claude Code CLI: installation, config, hooks, skills, MCP, shortcuts, IDE, settings
   - Claude Agent SDK: Node.js/TypeScript and Python agent framework
   - Claude API: direct model interaction, tool use, integrations
6. Uses embedded tools (bfs/ugrep) when available, otherwise Glob/Grep
7. Fetches Claude Code docs for CLI questions
8. Fetches Claude API docs for SDK questions (same URL)
9. Tools: Bash, FileRead, Glob, Grep, SendMessage, WebFetch, WebSearch
10. Checks isUsing3PServices for auth context
11. Gets settings for configuration context

## Exports
- `CLAUDE_CODE_GUIDE_AGENT_TYPE` - guide agent type constant
- `CLAUDE_CODE_DOCS_MAP_URL` - Claude Code docs URL
- `CDP_DOCS_MAP_URL` - Claude API docs URL
- `getClaudeCodeGuideBasePrompt` - generates guide agent prompt
- `CLAUDE_CODE_GUIDE_AGENT` - guide agent definition

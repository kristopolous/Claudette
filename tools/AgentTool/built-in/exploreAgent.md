# tools/AgentTool/built-in/exploreAgent

## Purpose
Defines the Explore agent for read-only file search and codebase exploration.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: BashTool, ExitPlanModeTool, FileEditTool, FileReadTool, FileWriteTool, GlobTool, GrepTool, NotebookEditTool, embeddedTools, AgentTool constants, loadAgentsDir

## Logic
1. `getExploreSystemPrompt` - generates read-only exploration prompt
2. Uses embedded tools (bfs/ugrep) when available, otherwise Glob/Grep
3. CRITICAL: READ-ONLY MODE - NO FILE MODIFICATIONS
4. STRICTLY PROHIBITED: creating, modifying, deleting, moving, copying files
5. No temporary files, redirects, heredocs, state-changing commands
6. Strengths: glob patterns, regex search, file reading
7. Guidelines:
   - find via Bash for broad file patterns (embedded) or GlobTool
   - grep via Bash for regex search (embedded) or GrepTool
   - FileReadTool for specific file paths
   - Bash ONLY for read-only ops (ls, git status/log/diff, find, cat, head, tail)
   - NEVER: mkdir, touch, rm, cp, mv, git add/commit, npm/pip install
8. `EXPLORE_AGENT_MIN_QUERIES` (3) - minimum queries for exploration
9. Fast agent: efficient tool use, parallel tool calls for grep/read
10. Reports findings directly as regular message (no file creation)

## Exports
- `getExploreSystemPrompt` - generates explore agent prompt
- `EXPLORE_AGENT_MIN_QUERIES` - minimum queries constant
- `EXPLORE_AGENT` - explore agent definition

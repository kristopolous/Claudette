# utils/permissions/permissionRuleParser

## Purpose
Provides permission rule parsing utilities with legacy tool name support.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: AgentTool constants, TaskOutputTool constants, TaskStopTool prompt, BriefTool prompt

## Logic
1. `LEGACY_TOOL_NAME_ALIASES` - maps legacy names to canonical names
2. Task → AGENT_TOOL_NAME, KillShell → TASK_STOP_TOOL_NAME
3. AgentOutputTool/BashOutputTool → TASK_OUTPUT_TOOL_NAME
4. Brief → BRIEF_TOOL_NAME (KAIROS feature-gated)
5. `normalizeLegacyToolName` - normalizes legacy name to canonical
6. Returns alias target or original name if not aliased
7. `getLegacyToolNames` - gets all legacy names for canonical name
8. `escapeRuleContent` - escapes special characters for storage
9. Escapes: backslashes first (\ → \\), then parentheses (( → \(, ) → \))
10. Example: 'psycopg2.connect()' → 'psycopg2.connect\\(\\)'
11. `unescapeRuleContent` - unescapes special characters after parsing
12. Unescapes: parentheses first, then backslashes (reverse order)
13. Example: 'psycopg2.connect\\(\\)' → 'psycopg2.connect()'

## Exports
- `LEGACY_TOOL_NAME_ALIASES` - legacy name mapping
- `normalizeLegacyToolName` - normalizes legacy name
- `getLegacyToolNames` - gets legacy names
- `escapeRuleContent` - escapes rule content
- `unescapeRuleContent` - unescapes rule content

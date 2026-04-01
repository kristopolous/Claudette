## Purpose
Analyzes Claude Code usage data to generate insights about user behavior, session patterns, and productivity trends.

## Imports
- **Stdlib**: `child_process`, `diff`, `fs/promises`, `os`, `path`
- **External**: `diff`
- **Internal**: `Command` type, `queryWithModel`, `AGENT_TOOL_NAME`, `LEGACY_AGENT_TOOL_NAME`, `LogOption` type, `getClaudeConfigHomeDir`, `toError`, `execFileNoThrow`, `logError`, `extractTextContent`, `getDefaultOpusModel`, session storage utils, `jsonParse`, `jsonStringify`, `countCharInString`, `asSystemPrompt`, `escapeXmlAttr`

## Logic
Collects session data from local storage and optionally from remote hosts (for internal users). Processes session logs to extract metadata (SessionMeta) and facets (SessionFacets) using AI models (Opus). Aggregates statistics about tool usage, languages, git activity, interruptions, errors, multi-clauding patterns, lines modified, and more. Generates six parallel insight sections (project areas, interaction style, what works, friction analysis, suggestions, on_the_horizon) using AI prompts, plus optional internal-specific sections (cc_team_improvements, model_behavior_improvements). Results provide comprehensive usage analytics with time-of-day patterns and multi-clauding detection.

## Exports
- `deduplicateSessionBranches` - Removes duplicate conversation branches from same session, keeping the one with most user messages
- `detectMultiClauding` - Detects overlapping multiple Claude sessions within 30-minute window
- Many internal helper functions for data collection, processing, and formatting

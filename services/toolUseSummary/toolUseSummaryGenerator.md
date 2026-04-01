# toolUseSummary/toolUseSummaryGenerator

## Purpose
Generates human-readable summaries of completed tool batches using Haiku for SDK client progress updates.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: errorIds, errors, log, JSON utils, systemPromptType, API claude

## Logic
1. `TOOL_USE_SUMMARY_SYSTEM_PROMPT` - instructs git-commit-subject style labels (~30 chars)
2. Past tense verb + distinctive noun, drop articles/connectors
3. Examples: "Searched in auth/", "Fixed NPE in UserService", "Created signup endpoint"
4. `ToolInfo` - type with name, input, output
5. `GenerateToolUseSummaryParams` - params with tools, signal, isNonInteractiveSession, lastAssistantText
6. `generateToolUseSummary` - main generation function
7. Returns null for empty tools array
8. Truncates JSON input/output to 300 chars each
9. Includes user intent from last assistant message (200 char prefix)
10. Queries Haiku with prompt caching enabled
11. Logs errors on generation failure

## Exports
- `TOOL_USE_SUMMARY_SYSTEM_PROMPT` - system prompt for summary generation
- `ToolInfo` - tool information type
- `GenerateToolUseSummaryParams` - generation parameters type
- `generateToolUseSummary` - generates tool use summary

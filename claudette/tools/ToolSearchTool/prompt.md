## Purpose
Provides the prompt string for the ToolSearch tool, explaining when and how to use it to fetch deferred tool schemas.

## Imports
- **External**: `feature` from 'BUILDFLAGS'
- **Internal**:
  - `isReplBridgeActive` from bootstrap/state
  - `getFeatureValue_CACHED_MAY_BE_STALE` from services/analytics/growthbook
  - `Tool` type from Tool
  - `AGENT_TOOL_NAME` from AgentTool/constants
  - `BRIEF_TOOL_NAME` and `SEND_USER_FILE_TOOL_NAME` dynamically required based on feature flags (KAIROS, KAIROS_BRIEF, KAIROS)

## Logic
Exports:
- `TOOL_SEARCH_TOOL_NAME` (re-export from constants)
- `getPrompt()`: Returns a composed string with:
  - Head: "Fetches full schema definitions for deferred tools so they can be called."
  - Tool location hint: depends on delta-enabled flag (USER_TYPE='ant' or GrowthBook 'tengu_glacier_2xr'). Hints differ: deferred tools appear in <system-reminder> vs <available-deferred-tools>.
  - Tail: Explains that until fetched, only name is known; this tool matches queries and returns matched tools' JSONSchema inside <functions> block. Query forms: "select:Read,Edit", "notebook jupyter" (keyword search), "+slack send" (require term).
- `isDeferredTool(tool)`: Determines if a tool should be deferred (requires ToolSearch). Rules:
  - If tool.alwaysLoad === true → NOT deferred
  - If tool.isMcp === true → ALWAYS deferred
  - If tool.name === TOOL_SEARCH_TOOL_NAME → NOT deferred
  - If FORK_SUBAGENT && tool.name === AGENT_TOOL_NAME → check forkSubagent; if enabled, not deferred
  - If KAIROS(KAIROS_BRIEF) && tool.name === BRIEF_TOOL_NAME → NOT deferred
  - If KAIROS && SEND_USER_FILE_TOOL_NAME && tool.name === that && replBridgeActive → NOT deferred
  - Else defer if tool.shouldDefer === true
- `formatDeferredToolLine(tool)`: Returns just the tool name for listing in <available-deferred-tools>. (searchHint ignored)

## Exports
- `getPrompt(): string`
- `isDeferredTool(tool): boolean`
- `formatDeferredToolLine(tool): string`
- `TOOL_SEARCH_TOOL_NAME` (re-export)

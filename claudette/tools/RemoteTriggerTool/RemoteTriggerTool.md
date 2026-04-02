# tools/RemoteTriggerTool/RemoteTriggerTool.ts

## Purpose
Tool for managing scheduled remote agent triggers via claude.ai API, supporting CRUD operations and manual execution.

## Imports
- **External**: `axios`, `zod/v4`
- **Internal**: 
  - Constants: `getOauthConfig`
  - Analytics: `getFeatureValue_CACHED_MAY_BE_STALE`
  - OAuth: `getOrganizationUUID`, `checkAndRefreshOAuthTokenIfNeeded`, `getClaudeAIOAuthTokens`
  - Policy: `isPolicyAllowed`
  - Tool: `buildTool`, `ToolDef`, `ToolUseContext`
  - Utils: `lazySchema`, `jsonStringify`
  - Local: `DESCRIPTION`, `PROMPT`, `REMOTE_TRIGGER_TOOL_NAME`, `renderToolResultMessage`, `renderToolUseMessage`

## Logic
1. Feature-gated by 'tengu_surreal_dali' and policy 'allow_remote_sessions'
2. Requires claude.ai OAuth authentication (refreshes if needed)
3. Resolves organization UUID for API calls
4. API base: `${BASE_API_URL}/v1/code/triggers` with beta header
5. Actions:
   - list: GET /triggers
   - get: GET /triggers/:id (requires trigger_id)
   - create: POST /triggers (requires body)
   - update: POST /triggers/:id (requires trigger_id and body)
   - run: POST /triggers/:id/run (requires trigger_id)
6. 20s timeout, uses abortController for cancellation
7. Returns HTTP status and JSON body as string
8. Maps result to "HTTP <status>\n<json>" format

## Exports
- `RemoteTriggerTool` - Main tool definition
- `Input` - Type for input (action enum, optional trigger_id, optional body)
- `Output` - Type for output (status, json)

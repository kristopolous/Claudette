# toolSchemaCache

## Purpose
Session-scoped cache of rendered tool schemas. Tool schemas render at server position 2 (before system prompt), so any byte-level change busts the entire ~11K-token tool block and everything downstream. This cache locks schema bytes at first render, preventing mid-session GrowthBook gate flips, MCP reconnects, or dynamic `tool.prompt()` content from causing churn.

## Imports
- **External**: `@anthropic-ai/sdk/resources/beta/messages/messages.mjs`

## Logic
1. A single module-level `Map<string, CachedSchema>` stores schemas keyed by tool name.
2. `CachedSchema` extends `BetaTool` with optional `strict` and `eager_input_streaming` fields.
3. Lives in a leaf module so `auth.ts` can clear it without importing `api.ts` (which would create a circular dependency via plans→settings→file→growthbook→config→bridgeEnabled→auth).

## Exports
- `getToolSchemaCache()` — returns the session-scoped Map of cached schemas
- `clearToolSchemaCache()` — clears all cached schemas (called by auth.ts on session changes)

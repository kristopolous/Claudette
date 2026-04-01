# services/api/emptyUsage

## Purpose
Provides zero-initialized usage object for API calls without transitively pulling in heavy dependencies.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: SDK sdkUtilityTypes

## Logic
1. `EMPTY_USAGE` - Readonly<NonNullableUsage> with all fields zeroed
2. input_tokens, cache_creation_input_tokens, cache_read_input_tokens, output_tokens: 0
3. server_tool_use: { web_search_requests: 0, web_fetch_requests: 0 }
4. service_tier: 'standard'
5. cache_creation: { ephemeral_1h_input_tokens: 0, ephemeral_5m_input_tokens: 0 }
6. inference_geo: '', iterations: [], speed: 'standard'
7. Extracted from logging.ts to avoid circular dependency chain
8. bridge/replBridge.ts can import without pulling in api/errors.ts → utils/messages.ts → BashTool.tsx

## Exports
- `EMPTY_USAGE` - zero-initialized usage object

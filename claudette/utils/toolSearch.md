# toolSearch

## Purpose
Utilities for dynamically discovering deferred tools (MCP and `shouldDefer` tools) via the ToolSearchTool instead of loading them upfront. Supports three modes: `tst` (always defer), `tst-auto` (defer only when descriptions exceed a token threshold), and `standard` (no deferral).

## Imports
- **Stdlib**: `lodash-es/memoize`
- **External**: (none directly)
- **Internal**: growthbook analytics, Tool types, AgentDefinition, ToolSearchTool prompt helpers, analyzeContext, array, betas, context, debug, envUtils, model providers, slowOperations, zodToJsonSchema

## Logic
1. **Auto-threshold**: `ENABLE_TOOL_SEARCH=auto:N` where N is 0-100 (default 10%). When MCP tool descriptions exceed N% of the context window, tool search auto-enables. Threshold computed in tokens (via counting API) or characters (fallback at 2.5 chars/token).
2. **Mode resolution** (`getToolSearchMode`): `auto`/`auto:1-99` → `tst-auto`, `true`/`auto:0` → `tst`, `false`/`auto:100` → `standard`, unset → `tst`. Kill switch `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` forces `standard`.
3. **Model support** (`modelSupportsToolReference`): Haiku models don't support `tool_reference` blocks. Configurable via GrowthBook feature `tengu_tool_search_unsupported_models`.
4. **Optimistic check** (`isToolSearchEnabledOptimistic`): Returns false only when definitively disabled. Also disables for non-first-party Anthropic base URLs (proxy gateways) unless `ENABLE_TOOL_SEARCH` is explicitly set.
5. **Definitive check** (`isToolSearchEnabled`): Full check including model support, ToolSearchTool availability, and threshold for `tst-auto` mode. Logs `tengu_tool_search_mode_decision` analytics events.
6. **Dynamic tool discovery** (`extractDiscoveredToolNames`): Scans message history for `tool_reference` blocks inside `tool_result` content from ToolSearchTool results. Also reads `preCompactDiscoveredTools` from compact boundary messages.
7. **Deferred tools delta** (`getDeferredToolsDelta`): Diffs current deferred tool pool against previously announced tools (reconstructed from `deferred_tools_delta` attachments). Returns added/removed names. Logs `tengu_deferred_tools_pool_change` with call-site context for debugging.

## Exports
- `ToolSearchMode` — type: `'tst' | 'tst-auto' | 'standard'`
- `getAutoToolSearchCharThreshold(model)` — character-based threshold for auto mode
- `getToolSearchMode()` — resolves the current mode from env vars
- `modelSupportsToolReference(model)` — checks if a model supports `tool_reference` blocks
- `isToolSearchEnabledOptimistic()` — quick check for whether tool search might be enabled
- `isToolSearchToolAvailable(tools)` — checks if ToolSearchTool is in the tools list
- `isToolSearchEnabled(model, tools, ...)` — definitive async check with full context
- `isToolReferenceBlock(obj)` — type guard for `tool_reference` content blocks
- `extractDiscoveredToolNames(messages)` — extracts tool names from message history
- `DeferredToolsDelta` — type: `{addedNames, addedLines, removedNames}`
- `DeferredToolsDeltaScanContext` — type: call-site discriminator for delta scan events
- `isDeferredToolsDeltaEnabled()` — checks if delta attachments are enabled (internal/feature-gated)
- `getDeferredToolsDelta(tools, messages, scanContext)` — computes added/removed deferred tools

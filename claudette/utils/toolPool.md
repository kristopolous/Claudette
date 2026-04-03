# toolPool

## Purpose
Merges and filters tool pools from multiple sources (built-in, MCP, initial props), applying coordinator-mode restrictions and PR activity subscription tool allowances.

## Imports
- **Stdlib**: BUILDFLAGS, `lodash-es/partition`, `lodash-es/uniqBy`
- **Internal**: `../constants/tools`, `../services/mcp/utils`, `../Tool`

## Logic
1. `isPrActivitySubscriptionTool` checks if a tool name ends with `subscribe_pr_activity` or `unsubscribe_pr_activity`. These are lightweight orchestration tools always allowed in coordinator mode.
2. `applyCoordinatorToolFilter` filters a tool array to only those in `COORDINATOR_MODE_ALLOWED_TOOLS` or PR activity subscription tools.
3. `mergeAndFilterTools` merges `initialTools` (from props) on top of `assembled` tools (from assembleToolPool), deduplicates by name via `uniqBy`, then partition-sorts to keep built-ins as a contiguous prefix (required for server prompt-cache policy). Applies coordinator-mode filtering when the `COORDINATOR_MODE` feature flag is active and `isCoordinatorMode()` returns true.

## Exports
- `isPrActivitySubscriptionTool(name)` — returns true if tool name ends with a PR activity subscription suffix
- `applyCoordinatorToolFilter(tools)` — filters tools to coordinator-mode-allowed set
- `mergeAndFilterTools(initialTools, assembled, mode)` — merges, deduplicates, sorts, and optionally filters tool pools

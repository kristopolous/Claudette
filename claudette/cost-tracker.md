# cost-tracker

## Purpose
Tracks API costs, token usage, and duration metrics for a Claudette session, with support for session persistence and multi-model tracking.

## Imports
- **Stdlib**: None
- **External**: `@anthropic-ai/sdk` (BetaUsage type), STYLER (terminal formatting)
- **Internal**: 
  - `/bootstrap/state` (state management functions)
  - `/entrypoints/agentSdkTypes` (ModelUsage type)
  - `/services/analytics/index` (logEvent)
  - `/utils/advisor` (getAdvisorUsage)
  - `/utils/config` (project config functions)
  - `/utils/context` (context window utilities)
  - `/utils/fastMode` (isFastModeEnabled)
  - `/utils/format` (formatDuration, formatNumber)
  - `/utils/fpsTracker` (FpsMetrics type)
  - `/utils/model/model` (getCanonicalName)
  - `/utils/modelCost` (calculateUSDCost)

## Logic
1. **Session Cost Storage**: Costs are persisted to project config, allowing retrieval when resuming a session
2. **Model Usage Tracking**: Accumulates input/output tokens, cache tokens, and web search requests per model using canonical short names
3. **Cost Calculation**: Calculates USD cost per API call and aggregates totals across sessions
4. **Advisor Integration**: Tracks usage and costs from advisor tools recursively
5. **Analytics**: Reports metrics to analytics services (cost counter, token counter)
6. **Formatting**: Provides human-readable cost summaries with appropriate decimal precision

## Exports
- `getTotalCost` - Returns total USD cost accumulated in the session
- `getTotalDuration` - Returns total wall-clock duration
- `getTotalAPIDuration` - Returns total API call duration
- `getTotalAPIDurationWithoutRetries` - Returns API duration excluding retry attempts
- `addToTotalLinesChanged` - Records lines added/removed from code changes
- `getTotalLinesAdded` - Returns total lines added
- `getTotalLinesRemoved` - Returns total lines removed
- `getTotalInputTokens` - Returns total input tokens used
- `getTotalOutputTokens` - Returns total output tokens generated
- `getTotalCacheReadInputTokens` - Returns cache read input tokens
- `getTotalCacheCreationInputTokens` - Returns cache creation input tokens
- `getTotalWebSearchRequests` - Returns count of web search requests made
- `formatCost` - Formats a cost number as a dollar string with appropriate precision
- `hasUnknownModelCost` - Returns true if any usage involved unknown models
- `resetStateForTests` - Resets all state for test isolation
- `resetCostState` - Clears cost state for a new session
- `setHasUnknownModelCost` - Sets the unknown model cost flag
- `getModelUsage` - Returns usage map for all models
- `getUsageForModel` - Returns usage for a specific model
- `getStoredSessionCosts` - Retrieves stored cost state from project config for a given session ID
- `restoreCostStateForSession` - Restores cost state when resuming a session; returns true if restored
- `saveCurrentSessionCosts` - Saves current costs to project config before switching sessions
- `addToTotalSessionCost` - Adds cost and usage from an API call, including advisor costs; returns total cost
- `formatTotalCost` - Returns formatted multi-line string with complete cost summary

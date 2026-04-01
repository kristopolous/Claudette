## Purpose
Generates "while you were away" summary messages after the terminal has been blurred for 5 minutes.

## Imports
- **External**: `react` (useEffect, useRef)
- **Internal**:
  - `../ink/terminal-focus-state.js` (getTerminalFocusState, subscribeTerminalFocus)
  - `../services/analytics/growthbook.js` (getFeatureValue_CACHED_MAY_BE_STALE)
  - `../services/awaySummary.js` (generateAwaySummary)
  - `../types/message.js` (Message type)
  - `../utils/messages.js` (createAwaySummaryMessage)

## Logic
1. Feature-gated by 'AWAY_SUMMARY' and 'tengu_sedge_lantern' GrowthBook flags
2. Sets up a 5-minute timer when terminal blurs; cancels on focus
3. Generates away summary only if:
   - No user turn is currently in progress (isLoading false)
   - No existing away_summary message since last user message
   - Timer fired while blurred
4. Uses AbortController to cancel in-flight generation if terminal refocuses
5. Pending generation if turn starts during timer period fires after turn completes
6. Summary message is appended to messages via setMessages callback

## Exports
- `useAwaySummary` - React hook that manages away summary generation

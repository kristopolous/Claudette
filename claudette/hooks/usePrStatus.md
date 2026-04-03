# usePrStatus

## Purpose
Polls GitHub PR review status every 60 seconds while the session is active, stopping on idle or slow responses.

## Imports
- **Stdlib**: `useEffect`, `useRef`, `useState` from 'REACT'
- **External**: None
- **Internal**: `getLastInteractionTime`, `fetchPrStatus`, `PrReviewState`

## Logic
1. Polls every 60 seconds via setTimeout (not useInterval)
2. Stops polling after 60 minutes of idle (no interaction time change)
3. Disables permanently if any fetch exceeds 4 seconds (slow GitHub)
4. Only active when enabled=true and isLoading changes trigger restarts
5. Schedules next poll relative to last fetch time

## Exports
- `usePrStatus` - Hook returning PrStatusState with number, url, reviewState, lastUpdated

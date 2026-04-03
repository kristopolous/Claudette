# costHook

## Purpose
Provides cost summary hook for session cost tracking.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: cost-tracker, utils billing, utils fpsTracker

## Logic
1. `useCostSummary` - hook for cost summary display
2. Takes optional getFpsMetrics function
3. useEffect registers 'exit' event handler
4. On exit: if hasConsoleBillingAccess, writes formatTotalCost to stdout
5. Calls saveCurrentSessionCosts with fps metrics
6. Cleanup removes event handler on unmount
7. `useEffect` - React effect hook
8. `formatTotalCost`, `saveCurrentSessionCosts` - cost tracker functions
9. `hasConsoleBillingAccess` - checks console billing access
10. `FpsMetrics` - FPS metrics type

## Exports
- `useCostSummary` - cost summary hook

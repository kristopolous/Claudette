# utils/collapseHookSummaries

## Purpose
Collapses consecutive hook summary messages with same hookLabel into single summary.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: message types

## Logic
1. `isLabeledHookSummary` - type guard for labeled hook summaries
2. Checks type === 'system', subtype === 'stop_hook_summary', hookLabel defined
3. `collapseHookSummaries` - collapses consecutive same-label summaries
4. Happens when parallel tool calls each emit hook summary
5. Groups consecutive messages with same hookLabel
6. Single message: passes through unchanged
7. Multiple messages: combines into single summary
8. Combines: hookCount (sum), hookInfos (flat), hookErrors (flat)
9. preventedContinuation: true if any prevented
10. hasOutput: true if any has output
11. totalDurationMs: max of group (parallel calls overlap)
12. Preserves message order for non-hook messages
13. Returns collapsed message array

## Exports
- `isLabeledHookSummary` - type guard for labeled summaries
- `collapseHookSummaries` - collapses consecutive hook summaries

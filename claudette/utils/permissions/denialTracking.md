# utils/permissions/denialTracking

## Purpose
Provides denial tracking infrastructure for permission classifiers.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `DenialTrackingState` - { consecutiveDenials, totalDenials }
2. `DENIAL_LIMITS` - { maxConsecutive: 3, maxTotal: 20 }
3. `createDenialTrackingState` - creates initial state
4. `recordDenial` - records denial, increments both counters
5. `recordSuccess` - records success, resets consecutiveDenials
6. No change if consecutiveDenials already 0
7. `shouldFallbackToPrompting` - checks if should fallback to prompting
8. Returns true if consecutiveDenials >= maxConsecutive OR totalDenials >= maxTotal
9. Used to determine when classifier should stop auto-approving

## Exports
- `DenialTrackingState` - denial tracking state type
- `DENIAL_LIMITS` - denial limits constant
- `createDenialTrackingState` - creates initial state
- `recordDenial` - records denial
- `recordSuccess` - records success
- `shouldFallbackToPrompting` - checks fallback condition

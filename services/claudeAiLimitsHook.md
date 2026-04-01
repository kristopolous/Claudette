# services/claudeAiLimitsHook

## Purpose
Provides React hook for subscribing to Claude.ai rate limit changes.

## Imports
- **Stdlib**: (none)
- **External**: `react`
- **Internal**: claudeAiLimits

## Logic
1. `useClaudeAiLimits` - React hook for limit state
2. Initializes state with copy of currentLimits
3. useEffect adds listener to statusListeners on mount
4. Listener updates state with new limits on change
5. Cleanup removes listener on unmount
6. Returns current limits state
7. Enables reactive UI updates when limits change

## Exports
- `useClaudeAiLimits` - hook returning current Claude.ai limits

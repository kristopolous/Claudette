## Purpose
Displays a warning when token usage approaches the context window limit, with support for auto-compact and context collapse modes.

## Imports
- **Stdlib**: none
- **External**: `bun:bundle`, `react`, `useSyncExternalStore`
- **Internal**: `Box`, `Text`, `getFeatureValue_CACHED_MAY_BE_STALE`, `calculateTokenWarningState`, `getEffectiveContextWindowSize`, `isAutoCompactEnabled`, `useCompactWarningSuppression`, `getUpgradeMessage`

## Logic
Calculates token warning state from usage percentage and model. Supports three display modes: standard warning showing remaining context percentage, reactive compact mode with adjusted effective window size, and context collapse mode showing a live summary of collapsed/staged spans. Suppresses warnings when auto-compact is active or suppression is enabled.

## Exports
- `TokenWarning` - renders a token usage warning with context percentage or collapse status

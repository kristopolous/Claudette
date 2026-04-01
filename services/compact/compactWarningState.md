# compact/compactWarningState

## Purpose
Provides store for tracking "context left until autocompact" warning suppression state.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: state store utils

## Logic
1. `compactWarningStore` - boolean store (default false) tracking suppression state
2. `suppressCompactWarning` - sets store to true after successful compaction
3. Suppress immediately after compaction since token counts inaccurate until next API response
4. `clearCompactWarningSuppression` - resets store to false at start of new compact attempt
5. Uses createStore pattern for reactive state management
6. React-free module (hook lives in compactWarningHook.ts)

## Exports
- `compactWarningStore` - boolean store for suppression state
- `suppressCompactWarning` - suppresses warning after successful compaction
- `clearCompactWarningSuppression` - clears suppression for new compact attempt

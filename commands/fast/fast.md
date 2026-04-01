## Purpose
Toggle fast mode, which uses a faster/cheaper model for simpler tasks.

## Imports
- **External**: React, React Compiler runtime
- **Internal**: FastIcon, Dialog, FastModePicker component, fastMode utilities (getFastModeModel, isFastModeEnabled, isFastModeSupportedByModel, prefetchFastModeStatus, clearFastModeCooldown, getFastModeRuntimeState, getFastModeUnavailableReason), analytics, settings management, formatDuration, formatModelPricing, getOpus46CostTier, shouldInferenceConfigCommandBeImmediate

## Logic
1. Local-jsx command that renders FastModePicker dialog
2. Fast mode behavior:
   - When enabled: switches mainLoopModel to fast model (if current doesn't support fast mode)
   - Updates user settings to persist preference
   - Clears cooldown on toggle
3. FastModePicker component:
   - Shows current model and fast mode state
   - Displays pricing information
   - Handles enable/disable
   - Checks availability (feature flag, cooldown status, model support)
   - Logs analytics event on toggle
   - Shows confirmation message with model/pricing details
4. Command is enabled only when isFastModeEnabled() returns true (feature gated)
5. Hidden when fast mode not available
6. Description dynamically includes fast model display name
7. Availability: ['claude-ai', 'console']
8. `immediate` determined by shouldInferenceConfigCommandBeImmediate()

## Exports
- `call` - async LocalJSXCommandCall rendering FastModePicker
- `FastModePicker` - React component (exported for testing/reuse)
- `applyFastMode` - helper function to update state/settings

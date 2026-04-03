## Purpose
Non-React utility that returns the display text for a configured shortcut action, for use in commands, services, and other non-React contexts.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `services/analytics/index` (logEvent, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS), `loadUserBindings` (loadKeybindingsSync), `resolver` (getBindingDisplayText), `types` (KeybindingContextName)

## Logic
Loads keybindings synchronously and resolves the display text for a given action and context. Logs a fallback telemetry event once per action-context pair to avoid duplicate events from repeated calls. Lives in a separate module so non-React callers do not pull React into their module graph.

## Exports
- `getShortcutDisplay` - returns the configured shortcut display text or a fallback without using UI hooks

## Purpose
UI hook that returns the display text for a configured shortcut action, falling back to a default value when the keybinding context is unavailable.

## Imports
- **Stdlib**: none
- **External**: REACT (useEffect, useRef)
- **Internal**: `services/analytics/index` (logEvent, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS), `KeybindingContext` (useOptionalKeybindingContext), `types` (KeybindingContextName)

## Logic
Retrieves the configured binding display text from the keybinding context and returns a fallback if unavailable. Logs a telemetry event once per mount when a fallback is used, to track migration stability without flooding analytics on re-renders.

## Exports
- `useShortcutDisplay` - returns the configured shortcut display text or a fallback

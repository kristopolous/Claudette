## Purpose
Displays a dialog prompting the user to opt into auto mode for handling permission prompts.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `logEvent` (analytics), `Box`, `Link`, `Text` (ink), `updateSettingsForSource` (settings), `Select` (CustomSelect), `Dialog` (design-system)

## Logic
Shows a warning dialog explaining auto mode behavior with options to accept, accept as default, or decline. On acceptance, updates user settings to skip auto permission prompts and optionally sets default mode to auto. Logs analytics events for each user action. Logs a "shown" event on mount via useEffect.

## Exports
- `AutoModeOptInDialog` - renders an opt-in dialog for enabling auto mode
- `AUTO_MODE_DESCRIPTION` - constant string describing auto mode behavior for display in the dialog

## Purpose
Manages the full teleport resume flow including session selection, loading state, and error handling.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `src/services/analytics/index`, `src/utils/conversationRecovery`, `src/utils/teleport/api`, `../hooks/useTeleportResume`, `../ink`, `../keybindings/useKeybinding`, `./ResumeTask`, `./Spinner`

## Logic
Uses the useTeleportResume hook to manage session resumption, logs analytics events for teleport start/cancel, handles session selection with error propagation, displays loading spinners during resumption, shows error states with cancel instructions, and delegates to ResumeTask for session selection UI.

## Exports
- `TeleportResumeWrapper` - wrapper component that orchestrates the complete teleport session resume experience

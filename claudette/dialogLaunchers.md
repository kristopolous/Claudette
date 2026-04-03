# dialogLaunchers

## Purpose
Provides thin launchers for one-off dialog JSX components, extracting dialog rendering from main.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: AssistantSession, StatsStore, ink Root, interactiveHelpers, KeybindingSetup, AppState, AgentMemoryScope, TeleportRemoteResponse, FpsMetrics, ValidationError types

## Logic
1. `launchSnapshotUpdateDialog` - shows agent memory snapshot update prompt (merge/keep/replace)
2. `launchInvalidSettingsDialog` - shows settings validation errors with continue/exit options
3. `launchAssistantSessionChooser` - picks bridge session to attach to
4. `launchAssistantInstallWizard` - shows install wizard when no assistant sessions found
5. Each launcher dynamically imports its component and wires done callback identically
6. Uses showSetupDialog helper for consistent callback wiring
7. Zero behavior change from original inline call sites

## Exports
- `launchSnapshotUpdateDialog` - launches memory snapshot update dialog
- `launchInvalidSettingsDialog` - launches settings validation dialog
- `launchAssistantSessionChooser` - launches session picker dialog
- `launchAssistantInstallWizard` - launches assistant install wizard

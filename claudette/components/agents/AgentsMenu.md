## Purpose
Provides the main menu component for managing agents including listing, viewing, editing, creating, and deleting.

## Imports
- **External**: STYLER, REACT, REACT/compiler-runtime, useCallback, useMemo, useState
- **Internal**: src/utils/settings/constants (SettingSource type),commands (CommandResultDisplay type),hooks/useExitOnCtrlCDWithKeybindings,hooks/useMergedTools,ink (Box, Text),state/AppState (useAppState, useSetAppState),Tool (Tools type),tools/AgentTool/agentDisplay (ResolvedAgent type, resolveAgentOverrides),tools/AgentTool/loadAgentsDir (AgentDefinition type, getActiveAgentsFromList),utils/errors (toError),utils/log (logError),CustomSelect/select (Select), designsystem/Dialog,AgentDetail,AgentEditor,AgentNavigationFooter,AgentsList, agentFileUtils (deleteAgentFromFile), new-agent-creation/CreateAgentWizard, types (ModeState type)

## Logic
Implements a state machine for agent management modes (list-agents, create-agent, agent-menu, view-agent, edit-agent, delete-confirm). Groups agents by source, handles CRUD operations with state updates, and renders the appropriate sub-component for each mode. Tracks changes and reports them on exit.

## Exports
- `AgentsMenu` - renders the complete agent management interface with all modes and operations

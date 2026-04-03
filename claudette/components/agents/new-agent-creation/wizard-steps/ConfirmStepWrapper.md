## Purpose
Wraps the confirmation step with agent saving, state management, and analytics logging logic.

## Imports
- **External**: chalk, REACT, useCallback, useState
- **Internal**: src/services/analytics/index (logEvent, AnalyticsMetadata type),src/state/AppState (useSetAppState),Tool (Tools type),tools/AgentTool/loadAgentsDir (AgentDefinition type, getActiveAgentsFromList),utils/promptEditor (editFileInEditor),wizard/index (useWizard), agentFileUtils (getNewAgentFilePath, saveAgentToFile), types (AgentWizardData type), ConfirmStep (ConfirmStep)

## Logic
Handles the complete agent save workflow: persists the agent to file, updates application state with the new agent, optionally opens the file in an external editor, and logs analytics events. Provides save and save-and-edit callbacks to the ConfirmStep component.

## Exports
- `ConfirmStepWrapper` - wraps ConfirmStep with save logic, state updates, and analytics tracking

## Purpose
Provides the final confirmation step that displays a summary of the agent configuration before saving.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink/events/keyboard-event (KeyboardEvent type),ink (Box, Text),keybindings/useKeybinding,memdir/paths (isAutoMemoryEnabled),Tool (Tools type),tools/AgentTool/agentMemory (getMemoryScopeDisplay),tools/AgentTool/loadAgentsDir (AgentDefinition type),utils/format (truncateToWidth),utils/model/agent (getAgentModelDisplay),ConfigurableShortcutHint, designsystem/Byline, designsystem/KeyboardShortcutHint,wizard/index (useWizard),wizard/WizardDialogLayout, agentFileUtils (getNewRelativeAgentFilePath), validateAgent (validateAgent), types (AgentWizardData type)

## Logic
Validates the complete agent configuration and displays a summary including name, location, tools, model, memory, description, and system prompt preview. Shows validation warnings and errors. Handles keyboard shortcuts for save (s/Enter) and save-and-edit (e).

## Exports
- `ConfirmStep` - renders an agent configuration summary with validation feedback and save actions

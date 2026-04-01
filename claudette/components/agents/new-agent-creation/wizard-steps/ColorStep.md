## Purpose
A wizard workflow step that allows the user to select a visual theme color for the new agent and serves as the primary aggregation point for finalizing the agent's definition.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `keybindings/useKeybinding`, `tools/AgentTool/agentColorManager`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/ColorPicker`, `components/agents/new-agent-creation/types`

## Logic
1. **Interactive Selection**: Utilizes the `ColorPicker` component to let the user choose between an automatic color or a specific theme color, providing immediate visual feedback.
2. **Data Aggregation and Finalization**:
    - When a color is selected and confirmed, the component aggregates all configuration values accumulated during the wizard's lifecycle (e.g., agent type, system prompt, usage logic, tool assignments, and model choice).
    - It constructs a `finalAgent` definition object that includes a retrieval function for the system prompt and maps source identifiers to the appropriate setting location.
3. **Wizard Integration**: 
    - Updates the shared wizard state with both the selected color and the newly constructed agent definition.
    - Controls the sequence by transitioning to the next step (`goNext`) or returning to the previous one (`goBack`).
4. **Contextual Shortcuts**: Displays a standard footer with keyboard hints for arrow navigation, selection, and cancellation (Esc), ensuring the user understands the CLI-based interaction model.

## Exports
- `ColorStep` - A functional component representing the "Color Selection" phase of the agent creation wizard.

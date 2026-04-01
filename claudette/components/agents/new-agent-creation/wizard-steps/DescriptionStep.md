## Purpose
A wizard workflow step that allows the user to define the triggering logic ("When to Use") for an agent, instructing Claudette on the specific scenarios or tasks that should be delegated to this subagent.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `keybindings/useKeybinding`, `utils/promptEditor`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/TextInput`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/new-agent-creation/types`

## Logic
1. **Interactive Text Entry**:
    - Provides a specialized `TextInput` component for entering the agent's usage description within the CLI environment.
    - Manages local state for the current input value and cursor position to ensure a responsive typing experience.
2. **External Editor Integration**:
    - Supports a configurable keyboard shortcut (e.g., `Ctrl+G`) to bridge to an external system editor.
    - Allows for more comfortable editing of complex or detailed usage instructions, synchronizing the result back into the wizard's state upon closing the editor.
3. **Validation and Error Handling**: 
    - Enforces a requirement that the description cannot be empty.
    - Displays inline error messages if the user attempts to proceed with an invalid input.
4. **State Persistence**: On successful submission (via `Enter`), the trimmed description is saved into the shared `AgentWizardData` before transitioning to the next step.
5. **Navigation Controls**: Integrates with the wizard's navigation system to handle "Go Back" (Esc) and "Continue" actions, with associated keyboard shortcut hints displayed in the footer.

## Exports
- `DescriptionStep` - A functional component representing the "Usage Logic" phase of the agent creation wizard.

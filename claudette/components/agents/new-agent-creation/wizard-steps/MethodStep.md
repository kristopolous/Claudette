## Purpose
A wizard workflow step that allows the user to select the creation method for a new agent, choosing between an automated AI-assisted process or a manual configuration path.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `components/ConfigurableShortcutHint`, `components/CustomSelect/select`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/new-agent-creation/types`

## Logic
1. **Method Selection**:
    - Presents two primary workflows for agent creation:
        - **Automated Generation**: Recommends using Claudette (via the inference provider) to automatically synthesize the agent's identifier, description, and system prompt.
        - **Manual Configuration**: Allows the user to provide all agent attributes manually.
2. **Dynamic Workflow Routing**:
    - If "Automated Generation" is selected, the wizard advances to the next sequential step (the AI generation phase).
    - If "Manual Configuration" is selected, the wizard jumps directly to the manual identification and prompt definition steps, bypassing the AI synthesis logic.
3. **State Management**: Updates the wizard's shared state with the chosen `method` and sets a `wasGenerated` flag, which is used for conditional logic in later steps and for analytics tracking.
4. **Interactive Controls**: Utilizes a standardized `Select` component for keyboard-driven navigation through the options.
5. **Navigation**: Provides a "Go Back" mechanism (Esc) to return to the initial location selection step.

## Exports
- `MethodStep` - A functional component that manages the "Creation Method" phase of the agent creation wizard.

## Purpose
A wizard workflow step that enables users to describe an agent's intended function in natural language and leverages the inference provider to automatically synthesize the agent's complete configuration.

## Imports
- **Stdlib**: None
- **External**: `inference-provider-sdk` (e.g., anthropic), `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `hooks/useMainLoopModel`, `keybindings/useKeybinding`, `utils/abortController`, `utils/promptEditor`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/Spinner`, `components/TextInput`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/generateAgent`, `components/agents/new-agent-creation/types`

## Logic
1. **Natural Language Interface**:
    - Provides a `TextInput` field for the user to describe the agent's role and triggering conditions.
    - Supports bridging to an external editor for more extensive descriptions.
2. **Automated Synthesis**:
    - Invokes the `generateAgent` utility to translate the user's description into a structured agent definition (identifier, usage logic, and system prompt).
    - Employs the currently active conversation model for the generation task.
    - Displays a progress indicator (spinner) and informative status messaging during the synthesis process.
3. **Interruptible Generation**:
    - Implements an abort mechanism using a standard controller, allowing the user to cancel an in-progress generation at any time via a keyboard shortcut (Esc).
    - Handles API abort errors gracefully without displaying them as system failures.
4. **Intelligent Workflow Routing**:
    - Upon successful generation, the component populates the wizard's shared state with the synthesized data and marks the agent as "AI-generated."
    - Automatically advances the user directly to the tool selection phase, skipping the manual prompt and identifier steps to streamline the workflow.
5. **State and Navigation Management**:
    - Uses specialized keybinding contexts to prevent common typing characters from triggering navigation actions.
    - Provides a "Go Back" mechanism that clears the generation-specific state if the user decides to change their approach.

## Exports
- `GenerateStep` - A functional component that manages the AI-assisted agent generation phase of the creation wizard.

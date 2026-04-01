## Purpose
The introductory step of the agent creation wizard, allowing the user to decide where the new agent's definition file should be stored (either scoped to the current project or globally for the user).

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `utils/settings/constants`, `components/ConfigurableShortcutHint`, `components/CustomSelect/select`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/new-agent-creation/types`

## Logic
1. **Storage Scope Selection**:
    - Presents two primary storage locations for the new agent file:
        - **Project**: Stored within the current working directory (e.g., `.claudette/agents/`), making the agent available only for this specific project.
        - **Personal**: Stored in the user's home directory (e.g., `~/.claudette/agents/`), making the agent available across all projects on the system.
2. **Interactive Selection**: Utilizes a standardized `Select` component to provide a clear, keyboard-driven interface for choosing the storage source.
3. **Flow Integration**:
    - Upon selection, updates the wizard's shared state with the chosen `location` (Project vs. User settings).
    - Automatically advances the user to the next phase of the creation process.
4. **Cancellation**: Handles the "cancel" action (typically via Esc), which exits the wizard and returns the user to the agent management menu.

## Exports
- `LocationStep` - A functional component that serves as the entry point for configuring a new agent's storage location.

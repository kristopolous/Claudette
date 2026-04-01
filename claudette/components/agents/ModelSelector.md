## Purpose
A specialized selection component that allows users to choose the underlying AI model for an agent, balancing reasoning capabilities and execution speed.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `utils/model/agent`, `components/CustomSelect/select`

## Logic
1. **Dynamic Option Management**:
    - Retrieves the standard set of available model options (e.g., high-performance vs. high-speed aliases).
    - Detects if the agent is currently configured with a custom model identifier that is not present in the standard alias list.
    - If a custom identifier is detected, it is dynamically injected into the selection list to ensure the user can confirm the current state without it being accidentally overwritten by a default choice.
2. **Contextual Guidance**: Displays a brief informational message explaining that the choice of model impacts both the agent's intelligence/reasoning and its responsiveness.
3. **Interactive Selection**:
    - Employs a standardized `Select` component for navigating model choices.
    - Defaults the selection to the agent's current model or a sensible system baseline (e.g., a balanced "sonnet" class model).
4. **Lifecycle Hooks**: Triggers completion callbacks with the chosen model identifier or handles cancellation by reverting to the previous state or an undefined selection.

## Exports
- `ModelSelector` - A functional component that provides the model choice interface for agent configuration.

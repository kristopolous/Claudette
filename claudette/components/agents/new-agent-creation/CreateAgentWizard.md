## Purpose
A high-level orchestrator that manages the multi-step interactive workflow for defining and creating a new specialized agent.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react)
- **Internal**: `memdir/paths`, `Tool`, `tools/AgentTool/loadAgentsDir`, `components/wizard`, `components/agents/new-agent-creation/types`, and various wizard step components (`ColorStep`, `ConfirmStepWrapper`, `DescriptionStep`, etc.)

## Logic
1. **Workflow Orchestration**: Defines a structured, sequential pipeline of steps that guide the user through the entire agent creation process. The sequence includes:
    - **Initial Configuration**: Selecting storage location and creation method (Manual vs. AI-assisted).
    - **Generation (Optional)**: Using the inference provider to brainstorm agent properties.
    - **Core Definition**: Specifying the agent's unique identifier (type), system prompt, and usage description.
    - **Capability Assignment**: Selecting specific tools the agent is permitted to use.
    - **Visual & Model Selection**: Choosing the agent's reasoning model and UI theme color.
    - **Persistence (Conditional)**: Configuring long-term memory scope if the feature is enabled globally.
    - **Finalization**: Reviewing and committing the new agent definition to the filesystem.
2. **State Management**: Utilizes a central wizard provider to maintain a shared data object (`AgentWizardData`) that accumulates configuration details as the user progresses through each step.
3. **Dynamic Step Injection**: Conditionally includes or excludes the "Memory" configuration step based on the application's current environment and whether persistent memory features are active.
4. **Completion and Cancellation**: Standardizes the exit paths, ensuring that a successful creation triggers a completion callback with a summary message, while cancellations revert the user to the previous menu state.

## Exports
- `CreateAgentWizard` - The main component that initializes the wizard provider and defines the step hierarchy for agent creation.

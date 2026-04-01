## Purpose
A wizard workflow step that allows the user to configure the persistent memory scope for a new agent, enabling it to learn and retain information across different conversation sessions.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `keybindings/useKeybinding`, `memdir/paths`, `tools/AgentTool/agentMemory`, `components/ConfigurableShortcutHint`, `components/CustomSelect/select`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/new-agent-creation/types`

## Logic
1. **Memory Scope Selection**:
    - Offers several levels of data persistence for the agent's learned knowledge:
        - **Project**: Stored within the current project (e.g., `.claudette/agent-memory/`).
        - **User**: Stored globally for the user account (e.g., `~/.claudette/agent-memory/`).
        - **Local**: Stored in a project-specific local directory (e.g., `.claudette/agent-memory-local/`).
        - **None**: Disables long-term memory for this specific agent.
2. **Context-Aware Recommendations**: Automatically suggests the most appropriate scope (e.g., recommending "User" scope if the agent definition itself is stored in the user's global settings) to ensure consistency between an agent's definition and its data.
3. **Dynamic Prompt Injection**: 
    - When a memory scope is selected, the component automatically appends specialized instructions to the agent's system prompt.
    - These instructions enable the agent to recognize its own memory storage and provide guidance on how to record and retrieve institutional knowledge.
4. **State Management**: Updates the wizard's shared state with the chosen memory scope and the modified system prompt before advancing.
5. **Navigation**: Standardizes the "Go Back" (Esc) and "Select" (Enter) interactions, ensuring the user can refine their choice or return to previous configuration steps.

## Exports
- `MemoryStep` - A functional component that manages the "Persistent Memory" phase of the agent creation wizard.

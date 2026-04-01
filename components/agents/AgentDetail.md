## Purpose
A detailed view component that displays the configuration, capabilities, and system prompt of a specific agent.

## Imports
- **Stdlib**: None
- **External**: `figures`, `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `keybindings/useKeybinding`, `Tool`, `tools/AgentTool/agentColorManager`, `tools/AgentTool/agentMemory`, `tools/AgentTool/agentToolUtils`, `tools/AgentTool/loadAgentsDir`, `utils/model/agent`, `components/Markdown`, `components/agents/agentFileUtils`

## Logic
1. **Agent Metadata Resolution**:
    - Resolves the agent's file path, color, and model display information.
    - Resolves the tools the agent is permitted to use, including handling wildcards and identifying unrecognized tools.
2. **Configuration Display**:
    - Renders the "When to Use" description, providing context on the agent's purpose.
    - Lists tools, model, permission mode, memory scope, and any associated hooks or skills.
    - Displays the agent's assigned color as a visual identifier.
3. **System Prompt Rendering**:
    - For non-built-in agents, it renders the full system prompt using a Markdown component for rich formatting.
4. **Interaction**:
    - Supports a "back" navigation action via both a specific keybinding (e.g., "confirm:no" or ESC) and the "return" key.
    - Automatically focuses the container for immediate keyboard interaction.

## Exports
- `AgentDetail` - A functional component that provides a comprehensive overview of an agent's definition and configuration.

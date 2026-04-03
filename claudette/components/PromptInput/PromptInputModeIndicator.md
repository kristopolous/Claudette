## Purpose
Renders the prompt character and mode indicator showing the current input mode (prompt or bash) with teammate color support.

## Imports
- **Stdlib**: none
- **External**: `figures`, REACT, REACT_COMPILER
- **Internal**: `ink`, `tools/AgentTool/agentColorManager`, `types/textInputTypes`, `utils/teammate`, `utils/theme`, `utils/agentSwarmsEnabled`

## Logic
1. Determines teammate theme color by checking if agent swarms are enabled and mapping the teammate color name to a theme color
2. PromptChar renders the pointer figure with optional teammate color and dimmed state during loading
3. When viewing an agent, uses the agent's color for the prompt character
4. In bash mode, renders "!" with bash border color instead of the prompt character
5. Falls back to default prompt character when no teammate color is set

## Exports
- `PromptInputModeIndicator` - component that renders the mode indicator (prompt character or bash symbol) with appropriate coloring

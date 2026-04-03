## Purpose
Returns banner information for swarm, standalone agent, or agent CLI context to display above the prompt input.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `state/AppState`, `state/selectors`, `tools/AgentTool/agentColorManager`, `utils/standaloneAgent`, `utils/swarm/backends/detection`, `utils/swarm/backends/registry`, `utils/swarm/constants`, `utils/teammate`, `utils/teammateContext`, `utils/theme`

## Logic
1. Reads team context, standalone agent context, and agent state from app store
2. For teammate processes, returns agent name with assigned color background
3. For leaders with teammates, returns tmux attach hint when external or viewed teammate name when inside tmux/native panes/in-process
4. For background agent viewing, reverse-looks up agent name from registry and returns with color
5. For standalone agents, returns rename/color values if set
6. For agent CLI flag, returns agent name with cyan background
7. Falls through each condition and returns null if no banner context applies
8. Converts agent color names to theme colors with a fallback to cyan

## Exports
- `useSwarmBanner` - hook that returns SwarmBannerInfo (text and bgColor) or null based on current swarm/agent context

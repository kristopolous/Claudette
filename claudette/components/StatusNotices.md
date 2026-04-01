## Purpose
Displays startup status notices to the user based on current configuration, agent definitions, and memory files.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `ink`, `tools/AgentTool/loadAgentsDir`, `utils/claudemd`, `utils/config`, `utils/statusNoticeDefinitions`

## Logic
1. Gathers global config, agent definitions, and memory files into a context object
2. Retrieves the list of active notices based on the context
3. Renders each active notice as a React fragment within a column layout, or returns null if no notices are active

## Exports
- `StatusNotices` - React component that renders active status notices at startup, using context from config, agents, and memory files

## Purpose
Visualizes context usage breakdown including token counts per category, MCP tools, agents, skills, memory files, and system components.

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS (feature), REACT, REACT/compiler-runtime
- **Internal**: ink (Box, Text), utils/analyzeContext (ContextData), utils/contextSuggestions (generateContextSuggestions), utils/file (getDisplayPath), utils/format (formatTokens), utils/settings/constants (getSourceDisplayName, SettingSource), utils/stringUtils (plural), ContextSuggestions (ContextSuggestions)

## Logic
1. Displays a grid visualization of context usage with colored squares representing token fullness
2. Shows context usage summary with model name, token count, and percentage
3. Optionally shows context collapse status when the feature is enabled
4. Groups and displays categories by source type (Project, User, Managed, Plugin, Built-in) sorted by tokens
5. Renders sections for MCP tools, custom agents, memory files, skills, and system tools
6. Generates and displays context optimization suggestions based on current usage
7. Helper function groupBySource organizes items by their source and sorts by token count descending

## Exports
- `ContextVisualization` - UI component displaying detailed context usage visualization

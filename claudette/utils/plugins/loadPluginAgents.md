# utils/plugins/loadPluginAgents

## Purpose
Provides plugin agent loading utilities from markdown files.

## Imports
- **Stdlib**: `path`
- **External**: `lodash-es/memoize`
- **Internal**: memdir paths, AgentTool agentColorManager/agentMemory/loadAgentsDir, FileEditTool, FileReadTool, FileWriteTool, plugin types, debug, effort, frontmatterParser, fsOperations, markdownConfigLoader, pluginLoader, pluginOptionsStorage, schemas, walkPluginMarkdown

## Logic
1. `VALID_MEMORY_SCOPES` - ['user', 'project', 'local']
2. `loadAgentsFromDirectory` - loads agents from directory
3. Walks plugin markdown files in agents directory
4. Calls loadAgentFromFile for each agent file
5. `loadAgentFromFile` - loads single agent from file
6. Checks for duplicate paths via isDuplicatePath
7. Parses frontmatter and markdown content
8. `loadPluginAgents` - loads all plugin agents
9. Loads from all enabled plugins
10. Handles plugin options and variable substitution
11. `loadAgentMemoryPrompt` - loads agent memory prompt
12. `isAutoMemoryEnabled` - checks auto memory enabled
13. `FILE_EDIT_TOOL_NAME`, `FILE_READ_TOOL_NAME`, `FILE_WRITE_TOOL_NAME` - tool name constants
14. `getPluginErrorMessage` - gets plugin error message
15. `EFFORT_LEVELS`, `parseEffortValue` - effort level functions
16. `coerceDescriptionToString` - coerces description to string
17. `parseFrontmatter`, `parsePositiveIntFromFrontmatter` - frontmatter parsing
18. `parseAgentToolsFromFrontmatter`, `parseSlashCommandToolsFromFrontmatter` - tool parsing
19. `walkPluginMarkdown` - walks plugin markdown files

## Exports
- `VALID_MEMORY_SCOPES` - valid memory scopes
- `loadAgentsFromDirectory` - loads agents from directory
- `loadAgentFromFile` - loads agent from file
- `loadPluginAgents` - loads all plugin agents
- `loadAgentMemoryPrompt` - loads agent memory prompt
- (Agent loading functions)

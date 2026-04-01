# utils/plugins/loadPluginCommands

## Purpose
Provides plugin command loading utilities from markdown files.

## Imports
- **Stdlib**: `path`
- **External**: `lodash-es/memoize`
- **Internal**: bootstrap state, plugin types, argumentSubstitution, debug, effort, envUtils, errors, frontmatterParser, fsOperations, markdownConfigLoader, model model, promptShellExecution, pluginLoader, pluginOptionsStorage, schemas, walkPluginMarkdown

## Logic
1. `PluginMarkdownFile` - { filePath, baseDir, frontmatter, content }
2. `LoadConfig` - { isSkillMode: boolean }
3. `isSkillFile` - checks if file is SKILL.md
4. `getCommandNameFromFile` - gets command name from file path
5. For skills: uses parent directory name, builds namespace
6. For regular files: uses file basename
7. `loadCommandsFromDirectory` - loads commands from directory
8. Walks plugin markdown files in commands directory
9. Calls loadCommandFromFile for each command file
10. `loadCommandFromFile` - loads single command from file
11. Parses frontmatter and markdown content
12. Handles argument substitution via substituteArguments
13. `loadPluginCommands` - loads all plugin commands
14. Loads from all enabled plugins
15. Handles plugin options and variable substitution
16. `parseArgumentNames`, `substituteArguments` - argument functions
17. `EFFORT_LEVELS`, `parseEffortValue` - effort level functions
18. `isBareMode` - checks bare mode
19. `isENOENT` - checks file not found error
20. `coerceDescriptionToString` - coerces description
21. `parseFrontmatter`, `parseBooleanFrontmatter`, `parseShellFrontmatter` - frontmatter parsing
22. `extractDescriptionFromMarkdown` - extracts description
23. `parseSlashCommandToolsFromFrontmatter` - parses tools
24. `parseUserSpecifiedModel` - parses user model
25. `executeShellCommandsInPrompt` - executes shell commands

## Exports
- `PluginMarkdownFile` - plugin markdown file type
- `LoadConfig` - load config type
- `isSkillFile` - checks skill file
- `getCommandNameFromFile` - gets command name
- `loadCommandsFromDirectory` - loads commands from directory
- `loadCommandFromFile` - loads command from file
- `loadPluginCommands` - loads all plugin commands
- (Command loading functions)

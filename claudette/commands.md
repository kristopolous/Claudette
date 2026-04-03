# FILE TEMPLATE

```
## Purpose
One sentence describing what this module does.

## Imports
- **Stdlib**: list any stdlib imports
- **External**: list external library imports  
- **Internal**: list internal imports from project

## Logic
Brief description of the core logic/algorithm this module implements.

## Exports
- `exportName` - description of what it does
```

---

# EXAMPLE (main)

## Purpose
Entry point that parses CLI arguments, initializes the application, and launches either the REPL interface or headless mode.

## Imports
- **Stdlib**: `fs`, `path`, `child_process`
- **External**: `commander`, `chalk`, `react`
- **Internal**: `init`, `launchRepl`, `getCommands`, `getTools`

## Logic
1. Parse CLI flags viaCommander
2. Pre-fetch keychain and MDM settings in parallel
3. Initialize telemetry and config
4. Check for updates, auth, and managed settings
5. Either launch REPL (interactive) or process command (headless)

## Exports
- None (this is the entry point, not a module)

---

# commands

## Purpose
Central registry and loader for all Claudette slash commands, including built-in commands, skills, plugin commands, and dynamic skills.

## Imports
- **Stdlib**: `lodash-es/memoize`
- **External**: BUILDFLAGS (feature flags)
- **Internal**: Over 70 command modules from `./commands/*`, skill loaders (`getSkillDirCommands`, `getBundledSkills`, `getPluginSkills`), auth utilities (`isUsing3PServices`, `isAiSubscriber`), and type definitions from `./types/command`

## Logic
1. **Static Command Registration**: Import and register all built-in commands at module load time
2. **Feature-Gated Commands**: Conditional imports based on feature flags (PROACTIVE, KAIROS, VOICE_MODE, WORKFLOW_SCRIPTS, etc.)
3. **Memoized Command Lists**: Use lodash memoization to cache expensive command loading operations
4. **Dynamic Skill Loading**: Load skills from `./skills/` directory, plugins, bundled skills, and workflow commands via async imports
5. **Availability Filtering**: Filter commands by auth/provider requirements
6. **Command Deduplication**: Ensure dynamic skills don't duplicate built-in commands
7. **Remote Mode Filtering**: Provide safe command lists for remote/bridge execution contexts

## Exports
- `INTERNAL_ONLY_COMMANDS` - Array of commands only available to internal ANT users
- `COMMANDS` - Memoized function returning all static commands
- `builtInCommandNames` - Memoized Set of all built-in command names and aliases
- `getCommands(cwd)` - Async function returning all available commands for the current user
- `meetsAvailabilityRequirement(cmd)` - Checks if user meets command's auth/provider requirements
- `loadAllCommands(cwd)` - Memoized async loader for all command sources
- `clearCommandMemoizationCaches()` - Clears command memoization without clearing skill caches
- `clearCommandsCache()` - Clears all command and skill caches
- `getMcpSkillCommands(mcpCommands)` - Filters MCP commands for model-invocable skills
- `getSkillToolCommands` - Memoized function returning prompt-type commands for SkillTool
- `getSlashCommandToolSkills` - Memoized function returning skills for slash command tool
- `REMOTE_SAFE_COMMANDS` - Set of commands safe to use in remote mode
- `BRIDGE_SAFE_COMMANDS` - Set of 'local' type commands safe for bridge execution
- `isBridgeSafeCommand(cmd)` - Predicate checking if command is safe over bridge
- `filterCommandsForRemoteMode(commands)` - Filters commands for remote mode
- `findCommand(name, commands)` - Finds a command by name or alias
- `hasCommand(name, commands)` - Checks if a command exists
- `getCommand(name, commands)` - Gets a command or throws ReferenceError
- `formatDescriptionWithSource(cmd)` - Formats command description with source annotation
- Re-exports: `Command`, `CommandBase`, `CommandResultDisplay`, `LocalCommandResult`, `LocalJSXCommandContext`, `PromptCommand`, `ResumeEntrypoint`, `getCommandName`, `isCommandEnabled`

# components/skills/SkillsMenu

## Purpose
Provides skills menu dialog displaying available skills grouped by source.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER, `lodash-es/capitalize`
- **Internal**: commands (Command, CommandBase, CommandResultDisplay, getCommandName, PromptCommand), ink (Box, Text), skills/loadSkillsDir (estimateSkillFrontmatterTokens, getSkillsPath), utils/file (getDisplayPath), utils/format (formatTokens), utils/settings/constants (getSettingSourceName, SettingSource), utils/stringUtils (plural), ConfigurableShortcutHint, design-system/Dialog (Dialog)

## Logic
1. `SkillCommand` - type alias for CommandBase & PromptCommand
2. `SkillSource` - type for skill sources (SettingSource | 'plugin' | 'mcp')
3. `Props` - { onExit, commands }
4. `getSourceTitle` - returns title for skill source group
5. `getSourceSubtitle` - returns subtitle with paths or server names
6. `SkillsMenu` - UI component for skills dialog
7. Uses REACT_COMPILER runtime (_c) for memoization
8. Filters commands to find skills (prompt type from skills/commands_DEPRECATED/plugin/mcp)
9. Groups skills by source (policySettings, userSettings, projectSettings, localSettings, flagSettings, plugin, mcp)
10. Sorts each group alphabetically by command name
11. Renders each group with title and subtitle
12. Each skill shows name, optional plugin name, and estimated token count
13. Empty state shows creation hints and close shortcut
14. Uses Dialog with title "Skills" and skill count subtitle
15. onCancel calls onExit with dismiss message

## Exports
- `SkillsMenu` - skills menu dialog component

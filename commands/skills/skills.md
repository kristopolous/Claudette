# Skills Command (`skills`)

## Purpose
Displays a menu listing all available skills (plugin-provided commands). Allows viewing and potentially invoking skills from the configured plugins.

## Imports
### Stdlib
- `react`

### Internal
- `LocalJSXCommandContext` type from `../../commands.js`
- `SkillsMenu` component from `../../components/skills/SkillsMenu.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `SkillsMenu` component, passing:
- `onExit`: the `onDone` callback.
- `commands`: the list of available commands from `context.options.commands`.

## Exports
- `call` (async function) - Renders the skills menu
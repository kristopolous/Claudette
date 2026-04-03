# Skills Command (`skills`)

## Purpose
Displays a menu listing all available skills (plugin-provided commands). Allows viewing and potentially invoking skills from the configured plugins.

## Imports
### Stdlib
- REACT

### Internal
- `LocalJSXCommandContext` type from `.././commands`
- `SkillsMenu` component from `.././components/skills/SkillsMenu`
- `LocalJSXCommandOnDone` type from `.././types/command`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `SkillsMenu` component, passing:
- `onExit`: the `onDone` callback.
- `commands`: the list of available commands from `context.options.commands`.

## Exports
- `call` (async function) - Renders the skills menu
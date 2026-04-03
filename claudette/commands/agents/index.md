# Agents Command Definition (`index`)

## Purpose
Defines the `agents` command that provides a management interface for agent configurations. This is a local JSX command that loads the agents UI.

## Imports
### Internal
- `Command` type from `.././commands`

## Logic
Creates a command object with:
- `type`: `'local-jsx'` (renders a UI component)
- `name`: `'agents'`
- `description`: `'Manage agent configurations'`
- `load`: A function that dynamically imports `/agents` (or `./agents`) to load the command implementation.

## Exports
- `agents` (Command) - The command definition object that registers the agents management feature
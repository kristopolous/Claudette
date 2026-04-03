# Branch Command Definition (`index`)

## Purpose
Defines the `branch` command (with conditional `fork` alias) that creates a branched conversation. This command loads a local JSX component to interactively create a fork of the current transcript.

## Imports
### External
- BUILDFLAGS (`feature` for feature flagging)

### Internal
- `Command` type from `.././commands`

## Logic
Creates a command object:
- `type`: `'local-jsx'` (React component)
- `name`: `'branch'`
- `aliases`: `['fork']` when the `FORK_SUBAGENT` feature is disabled; otherwise `[]`
- `description`: `'Create a branch of the current conversation at this point'`
- `argumentHint`: `'[name]'` (optional custom title)
- `load`: Dynamic import of `/branch` (or `.ts`)

## Exports
- `branch` (Command) - The command definition
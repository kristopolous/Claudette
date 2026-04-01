# Compact Command Definition (`index`)

## Purpose
Defines the `/compact` command, which summarizes conversation history to reduce token usage while preserving key context.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `isEnvTruthy` from `../../utils/envUtils.js`

## Logic
Creates a command object:
- `type`: `'local'` (non-JSX command)
- `name`: `'compact'`
- `description`: Provides instructions about optional custom summarization instructions
- `isEnabled`: Returns false if `DISABLE_COMPACT` environment variable is truthy
- `supportsNonInteractive`: true
- `argumentHint`: `'<optional custom summarization instructions>'`
- `load`: Dynamic import of `./compact.js` (or `.ts`)

## Exports
- `compact` (Command) - The command definition (exported as default)
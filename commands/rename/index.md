## Purpose
Registers the /rename command.

## Imports
- **External**: Command type
- **Internal**: rename.tsx (lazy-loaded)

## Logic
Defines 'rename' command as local-jsx with:
- immediate: true (shows UI if needed)
- argumentHint: '[name]' (optional custom name)
- Loads './rename.js' on demand

Command allows renaming the current conversation session, with or without providing a name argument.

## Exports
- `default` - Command object for /rename

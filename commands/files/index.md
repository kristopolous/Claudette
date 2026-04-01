## Purpose
Registers the files command metadata and implements enablement logic.

## Imports
- **Internal**: `Command` type, `isEnvTruthy`

## Logic
Defines a 'local' command named 'files' with description "List all files currently in context". The command is only enabled for internal users (`USER_TYPE='ant'`) and supports non-interactive mode. Implementation is lazy-loaded from './files.js'.

## Exports
- `default` - The files command object

## Purpose
Registers the exit command metadata with immediate execution.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local-jsx' command named 'exit' with alias 'quit' and description "Exit the REPL". The command is marked `immediate: true` and loads implementation from './exit.js'.

## Exports
- `default` - The exit command object

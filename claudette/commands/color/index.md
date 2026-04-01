## Purpose
Registers the color command metadata with lazy loading.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local-jsx' command named 'color' with description "Set the prompt bar color for this session". The command is immediate, accepts an argument hint '<color|default>', and loads implementation from './color.js'.

## Exports
- `default` - The color command object

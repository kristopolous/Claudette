## Purpose
Provides lazy-loaded command metadata for the `color` command.

## Imports
- **Internal**: Command type, implementation from color.ts

## Logic
1. Defines command with type 'local-jsx'
2. Description: "Set the prompt bar color for this session"
3. Immediate: true (no confirmation)
4. Argument hint: '<color|default>'
5. Lazy loads implementation with `load: () => import('./color.js')`
6. Command allows users to customize their agent identity color

## Exports
- `default` - Command object

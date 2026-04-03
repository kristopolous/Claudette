## Purpose
Provides lazy-loaded command metadata for the `btw` (side question) command.

## Imports
- **Internal**: Command type, implementation from btw

## Logic
1. Defines command with type 'local-jsx' (renders UI component)
2. Description: "Ask a quick side question without interrupting the main conversation"
3. Immediate: true (no confirmation prompt)
4. Requires argument: '<question>'
5. Uses `load: () => import('/btw')` for lazy loading to reduce startup time
6. Command allows users to ask parallel questions mid-conversation

## Exports
- `default` - Command object with lazy loader

## Purpose
View hook configurations for tool events and set up automated workflows.

## Imports
- **External**: React
- **Internal**: HooksConfigMenu component, analytics, getTools utility, LocalJSXCommandCall type

## Logic
1. Local-jsx command that renders HooksConfigMenu
2. HooksConfigMenu displays:
   - List of available hook events (e.g., PostToolUse, PreToolUse, Stop)
   - Current hook configurations for each event
   - Ability to add/edit/remove hooks
3. Command logs analytics event ('tengu_hooks_command') on invocation
4. obtains toolNames from getTools(permissionContext) to show available tools
5. Users can configure shell commands to run automatically on tool events
6. Immediate: true (shows dialog immediately)
7. Command type: 'local-jsx'

## Exports
- `call` - async LocalJSXCommandCall rendering HooksConfigMenu

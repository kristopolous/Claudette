## Purpose
Show help and available commands in an interactive UI.

## Imports
- **External**: React
- **Internal**: HelpV2 component, LocalJSXCommandCall type, commands list from context.options

## Logic
1. Local-jsx command that renders HelpV2 component
2. HelpV2 receives full commands list from options.commands
3. Shows detailed help information:
   - Command names and descriptions
   - Usage hints
   - Aliases
   - Possibly examples
4. Interactive UI allows browsing/searching commands
5. Returns null via onDone when closed
6. Command type: 'local-jsx' with lazy load

## Exports
- `call` - async LocalJSXCommandCall returning HelpV2 React component

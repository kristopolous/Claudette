# Terminal Setup Command Definition (`index`)

## Purpose
Defines the `terminal-setup` command, which configures keybindings for multi-line input in supported terminals. The command is hidden on terminals that natively support the required keyboard protocol.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `env` from `../../utils/env.js`

### Constants
- `NATIVE_CSIU_TERMINALS`: Maps terminal identifiers (ghostty, kitty, iTerm.app, WezTerm, WarpTerminal) to display names.

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'terminal-setup'`
- `description`: Getter that returns:
  - For Apple_Terminal: `'Enable Option+Enter key binding for newlines and visual bell'`
  - For others: `'Install Shift+Enter key binding for newlines'`
- `isHidden`: Getter returns `true` if `env.terminal` is in `NATIVE_CSIU_TERMINALS` (native support), otherwise `false`.
- `load`: Dynamic import of `./terminalSetup.js` (or `.tsx`)

## Exports
- `terminalSetup` (Command) - The command definition (exported as default)
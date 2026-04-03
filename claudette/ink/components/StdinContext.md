# ink/components/StdinContext

## Purpose
Provides StdinContext UI context for stdin stream access.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink events emitter, ink terminal-querier

## Logic
1. `Props` - { stdin, setRawMode, isRawModeSupported, internal_exitOnCtrlC, internal_eventEmitter, internal_querier }
2. `stdin` - stdin stream passed to render() in options.stdin or process.stdin by default
3. Useful if app needs to handle user input
4. `setRawMode` - sets raw mode on stdin
5. Ink exposes this via own <StdinContext> to handle Ctrl+C
6. Should use Ink's setRawMode instead of process.stdin.setRawMode
7. If stdin stream does not support setRawMode, function does nothing
8. `isRawModeSupported` - boolean flag if current stdin supports setRawMode
9. Component using setRawMode might use isRawModeSupported to fall back in unsupported environments
10. `internal_exitOnCtrlC` - internal flag for exit on Ctrl+C
11. `internal_eventEmitter` - internal event emitter
12. `internal_querier` - query terminal and await responses (DECRQM, OSC 11, etc.)
13. Null only in never-reached default context value
14. `StdinContext` - UI context exposing input stream
15. Default value: stdin: process.stdin, internal_eventEmitter: new EventEmitter(), setRawMode() {}, isRawModeSupported: false, internal_exitOnCtrlC: true, internal_querier: null
16. displayName: 'InternalStdinContext'
17. `createContext` - UI context creator
18. `EventEmitter` - event emitter class
19. `TerminalQuerier` - terminal querier type

## Exports
- `Props` - stdin context props type
- `StdinContext` - stdin context (default export)

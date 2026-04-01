# Desktop Command Definition (`index`)

## Purpose
Defines the `desktop` command (alias: `app`), which continues the current session in Claude Desktop. Only available on supported platforms (macOS or Windows x64) and in claude-ai mode.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Platform support check (`isSupportedPlatform`):
- Returns true on macOS (`darwin`)
- Returns true on Windows x64 (`win32` + `arch === 'x64'`)
- False otherwise

Command object:
- `type`: `'local-jsx'`
- `name`: `'desktop'`
- `aliases`: `['app']`
- `description`: `'Continue the current session in Claude Desktop'`
- `availability`: `['claude-ai']`
- `isEnabled`: `isSupportedPlatform`
- `isHidden`: Getter that returns `!isSupportedPlatform()` (hides command on unsupported platforms)
- `load`: Dynamic import of `./desktop.js` (or `.tsx`)

## Exports
- `desktop` (Command) - The command definition (exported as default)
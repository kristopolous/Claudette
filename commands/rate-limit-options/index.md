# Rate Limit Options Command Definition (`index`)

## Purpose
Defines the internal `rate-limit-options` command used to present options when a rate limit is encountered. Hidden from help and only enabled for Claude AI subscribers.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `isClaudeAISubscriber` from `../../utils/auth.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'rate-limit-options'`
- `description`: `'Show options when rate limit is reached'`
- `isEnabled`: Returns true only if `isClaudeAISubscriber()` is true.
- `isHidden`: `true` (command is hidden from help listings; used internally)
- `load`: Dynamic import of `./rate-limit-options.js` (or `.tsx`)

## Exports
- `rateLimitOptions` (Command) - The command definition (exported as default)
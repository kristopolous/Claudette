# Remote Environment Command Definition (`index`)

## Purpose
Defines the `remote-env` command for configuring the default remote environment for teleport sessions. The command is only available to Claude AI subscribers and when the policy allows remote sessions.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `isPolicyAllowed` from `../../services/policyLimits/index.js`
- `isClaudeAISubscriber` from `../../utils/auth.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'remote-env'`
- `description`: `'Configure the default remote environment for teleport sessions'`
- `isEnabled`: Returns true only if `isClaudeAISubscriber()` and `isPolicyAllowed('allow_remote_sessions')` are both true.
- `isHidden`: Getter returns `!isClaudeAISubscriber() || !isPolicyAllowed('allow_remote_sessions')` (hides command when not available).
- `load`: Dynamic import of `./remote-env.js` (or `.tsx`)

## Exports
- Default command object (satisfies `Command`)
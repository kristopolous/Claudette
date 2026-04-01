# Upgrade Command Definition (`index`)

## Purpose
Defines the `upgrade` command to upgrade to Max for higher rate limits and more Opus. Available only in claude-ai mode and for non-enterprise users.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `getSubscriptionType` from `../../utils/auth.js`
- `isEnvTruthy` from `../../utils/envUtils.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'upgrade'`
- `description`: `'Upgrade to Max for higher rate limits and more Opus'`
- `availability`: `['claude-ai']`
- `isEnabled`: Returns false if `DISABLE_UPGRADE_COMMAND` is truthy or `getSubscriptionType() === 'enterprise'`.
- `load`: Dynamic import of `./upgrade.js` (or `.tsx`)

## Exports
- `upgrade` (Command) - The command definition (exported as default)
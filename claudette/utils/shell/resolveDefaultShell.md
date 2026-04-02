# resolveDefaultShell

## Purpose
Resolves the default shell for input-box `!` commands.

## Imports
- **Internal**: ../settings/settings

## Logic
1. Reads `defaultShell` from `getInitialSettings()`
2. Falls back to `'bash'` if not set
3. Platform default is `'bash'` everywhere — does NOT auto-flip Windows to PowerShell (would break existing Windows users with bash hooks)
4. Resolution order: `settings.defaultShell` → `'bash'`
5. Return type is `'bash' | 'powershell'`

## Exports
- `resolveDefaultShell` - returns the configured default shell, defaulting to 'bash'

## Source
`resolveDefaultShell`

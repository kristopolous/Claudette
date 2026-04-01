# Think-Back Command Definition (`index`)

## Purpose
Defines the `think-back` command, which generates and displays a "Year in Review" animation. Enabled only when the `tengu_thinkback` feature flag is active.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `checkStatsigFeatureGate_CACHED_MAY_BE_STALE` from `../../services/analytics/growthbook.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'think-back'`
- `description`: `'Your 2025 Claude Code Year in Review'`
- `isEnabled`: Returns true only if `checkStatsigFeatureGate_CACHED_MAY_BE_STALE('tengu_thinkback')` is true (feature flag).
- `load`: Dynamic import of `./thinkback.js` (or `.tsx`)

## Exports
- `thinkback` (Command) - The command definition (exported as default)
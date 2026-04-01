# Thinkback-Play Command Definition (`index`)

## Purpose
Defines the hidden `thinkback-play` command, which plays the thinkback animation. Used by the thinkback skill after generation. Enabled by the `tengu_thinkback` feature flag and hidden from help.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `checkStatsigFeatureGate_CACHED_MAY_BE_STALE` from `../../services/analytics/growthbook.js`

## Logic
Creates a command object:
- `type`: `'local'` (non-JSX, returns text)
- `name`: `'thinkback-play'`
- `description`: `'Play the thinkback animation'`
- `isEnabled`: Feature-gated via `checkStatsigFeatureGate_CACHED_MAY_BE_STALE('tengu_thinkback')`.
- `isHidden`: `true` (not shown in help)
- `supportsNonInteractive`: `false`
- `load`: Dynamic import of `./thinkback-play.js` (or `.ts`)

## Exports
- `thinkbackPlay` (Command) - The command definition (exported as default)
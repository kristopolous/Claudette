# Thinkback-Play Command (`thinkback-play`)

## Purpose
Hidden command that directly plays the thinkback animation. Used internally by the thinkback skill after generation completes. Looks up the installed plugin path and invokes the shared `playAnimation` function.

## Imports
### Stdlib
- `path` (`join`)

### Internal
- `LocalCommandResult` type from `../../commands.js`
- `loadInstalledPluginsV2` from `../../utils/plugins/installedPluginsManager.js`
- `OFFICIAL_MARKETPLACE_NAME` from `../../utils/plugins/officialMarketplace.js`
- `playAnimation` from `../thinkback/thinkback.js`

## Logic
The `call` async function (no arguments):
1. Determines the plugin ID based on `USER_TYPE` (internal vs official marketplace).
2. Loads the installed plugins configuration via `loadInstalledPluginsV2()`.
3. If the plugin is not installed, returns a text message suggesting to run `/think-back`.
4. If no valid `installPath`, returns a text error.
5. Constructs `skillDir` as `<installPath>/skills/thinkback`.
6. Calls `playAnimation(skillDir)` and returns `{ type: 'text', value: result.message }`.

## Exports
- `call` (async function) - Plays the thinkback animation
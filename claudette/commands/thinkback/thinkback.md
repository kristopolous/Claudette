# Think-Back Command (`think-back`)

## Purpose
Generates and displays a personalized "Year in Review" animation showcasing the user's Claudette activity. Handles installation of the thinkback plugin from the marketplace, then provides a menu to play the animation, edit content, fix errors, or regenerate. Gated by a Statsig feature flag.

## Imports
### External
- `execa` (for spawning node process)
- `fs/promises` (`readFile`)
- `path` (`join`)

### Stdlib
- `react` (including `useState`, `useEffect`, `useCallback`)

### Internal
- `CommandResultDisplay` type from `../../commands.js`
- `Select` from `../../components/CustomSelect/select.js`
- `Dialog` from `../../components/design-system/Dialog.js`
- `Spinner` from `../../components/Spinner.js`
- `instances` from `../../ink/instances.js`
- `Box`, `Text` from `../../ink.js`
- `enablePluginOp` from `../../services/plugins/pluginOperations.js`
- `logForDebugging` from `../../utils/debug.js`
- `isENOENT`, `toError` from `../../utils/errors.js`
- `execFileNoThrow` from `../../utils/execFileNoThrow.js`
- `pathExists` from `../../utils/file.js`
- `logError` from `../../utils/log.js`
- `getPlatform` from `../../utils/platform.js`
- `clearAllCaches` from `../../utils/plugins/cacheUtils.js`
- `isPluginInstalled` from `../../utils/plugins/installedPluginsManager.js`
- `addMarketplaceSource`, `clearMarketplacesCache`, `loadKnownMarketplacesConfig`, `refreshMarketplace` from `../../utils/plugins/marketplaceManager.js`
- `OFFICIAL_MARKETPLACE_NAME` from `../../utils/plugins/officialMarketplace.js`
- `loadAllPlugins` from `../../utils/plugins/pluginLoader.js`
- `installSelectedPlugins` from `../../utils/plugins/pluginStartupCheck.js`

## Logic
The `call` async function renders the `ThinkbackFlow` component with `onDone`.

`ThinkbackFlow` component:
- States: `installComplete` (bool), `installError` (string | null), `skillDir` (string | null), `hasGenerated` (boolean | null).
- `handleReady`: Sets `installComplete = true`.
- `handleError`: Sets `installError` and calls `onDone` with an error message suggesting `/plugin`.
- `useEffect` for installation:
  - `ThinkbackInstaller` renders during installation/checking; on success calls `handleReady`, on error calls `handleError`.
  - Uses marketplace and plugin management to ensure thinkback plugin is installed and enabled. State phases: 'checking', 'installing-marketplace', 'installing-plugin', 'enabling-plugin', 'ready', 'error'.
- After `installComplete`:
  - `useEffect` calls `getThinkbackSkillDir()` to find the `skills/thinkback` directory inside the installed plugin. If not found, triggers error.
  - Then checks for existence of `year_in_review.js` in that directory to set `hasGenerated`.
- Rendering:
  - `installError`: shows error and hint.
  - `!installComplete`: shows `ThinkbackInstaller` (with spinner and progress messages).
  - `!skillDir || hasGenerated === null`: shows loading spinner.
  - Ready: renders `ThinkbackMenu`.

`ThinkbackMenu` component:
- `options`: Based on `hasGenerated`:
  - If true: Play animation, Edit content (edit), Fix errors (fix), Regenerate (regenerate).
  - If false: Only "Let's go!" (regenerate).
- `handleSelect(value)`:
  - `'play'`: calls `playAnimation(skillDir)`, then `onDone(undefined, { display: 'skip' })`.
  - Other actions (`edit`, `fix`, `regenerate`): calls `onDone` with a prompt string (`EDIT_PROMPT`, `FIX_PROMPT`, `REGENERATE_PROMPT`) and `{ display: 'user', shouldQuery: true }` to instruct the AI to run the thinkback skill in the specified mode.
- `handleCancel`: `onDone(undefined, { display: 'skip' })`.

`playAnimation(skillDir)`:
- Ensures `year_in_review.js` and `player.js` exist; returns errors if missing.
- Gets the Ink terminal instance and enters alternate screen.
- Spawns `node player.js` with `stdio: 'inherit'` in the skill directory (reject: false).
- On completion (or interruption), exits alternate screen.
- If `year_in_review.html` exists, opens it in the browser using the platform-specific `open` command.
- Returns `{ success: true, message: 'Year in review animation complete!' }` or an error object.

Constants:
- `INTERNAL_MARKETPLACE_NAME`, `INTERNAL_MARKETPLACE_REPO`, `OFFICIAL_MARKETPLACE_REPO` (vary by user type).
- `getMarketplaceName()`, `getMarketplaceRepo()`, `getPluginId()`: Return appropriate identifiers.
- `SKILL_NAME = 'thinkback'`.
- `EDIT_PROMPT`, `FIX_PROMPT`, `REGENERATE_PROMPT`: System prompts for AI to invoke the thinkback skill with different modes.

Helper exports: `getThinkbackSkillDir()`, `playAnimation()`, `ThinkbackInstaller`, `ThinkbackMenu`, `ThinkbackFlow`.

## Exports
- `call` (async function) - Renders the think-back flow
- `playAnimation` (async function) - Plays the generated animation
- `ThinkbackFlow` (React component) - Main flow orchestrator
- `ThinkbackInstaller` (React component) - Plugin/marketplace installer UI
- `ThinkbackMenu` (React component) - Post-install action menu
- Various constants and helper functions
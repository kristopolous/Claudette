# Think-Back Command (`think-back`)

## Purpose
Generates and displays a personalized "Year in Review" animation showcasing the user's Claudette activity. Handles installation of the thinkback plugin from the marketplace, then provides a menu to play the animation, edit content, fix errors, or regenerate. Gated by a Statsig feature flag.

## Imports
### External
- `execa` (for spawning node process)
- `fs/promises` (`readFile`)
- `path` (`join`)

### Stdlib
- REACT (including `useState`, `useEffect`, `useCallback`)

### Internal
- `CommandResultDisplay` type from `.././commands`
- `Select` from `.././components/CustomSelect/select`
- `Dialog` from `../../components/designsystem/Dialog`
- `Spinner` from `.././components/Spinner`
- `instances` from `.././ink/instances`
- `Box`, `Text` from `.././ink`
- `enablePluginOp` from `.././services/plugins/pluginOperations`
- `logForDebugging` from `.././utils/debug`
- `isENOENT`, `toError` from `.././utils/errors`
- `execFileNoThrow` from `.././utils/execFileNoThrow`
- `pathExists` from `.././utils/file`
- `logError` from `.././utils/log`
- `getPlatform` from `.././utils/platform`
- `clearAllCaches` from `.././utils/plugins/cacheUtils`
- `isPluginInstalled` from `.././utils/plugins/installedPluginsManager`
- `addMarketplaceSource`, `clearMarketplacesCache`, `loadKnownMarketplacesConfig`, `refreshMarketplace` from `.././utils/plugins/marketplaceManager`
- `OFFICIAL_MARKETPLACE_NAME` from `.././utils/plugins/officialMarketplace`
- `loadAllPlugins` from `.././utils/plugins/pluginLoader`
- `installSelectedPlugins` from `.././utils/plugins/pluginStartupCheck`

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
  - Then checks for existence of year_in_review` in that directory to set `hasGenerated`.
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
- Ensures year_in_review` and player` exist; returns errors if missing.
- Gets the Ink terminal instance and enters alternate screen.
- Spawns `nodeplayer` with `stdio: 'inherit'` in the skill directory (reject: false).
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
- `ThinkbackFlow` (UI component) - Main flow orchestrator
- `ThinkbackInstaller` (UI component) - Plugin/marketplace installer UI
- `ThinkbackMenu` (UI component) - Post-install action menu
- Various constants and helper functions
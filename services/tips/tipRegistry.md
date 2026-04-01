# services/tips/tipRegistry

## Purpose
Provides tip registry for contextual tips shown during Claude Code startup spinner.

## Imports
- **Stdlib**: (none)
- **External**: `chalk`
- **Internal**: debug, fileHistory, settings, terminalSetup, DesktopUpsell, design-system color, OverageCreditUpsell, keybindings, ScheduleCronTool, auth, concurrentSessions, config, effort, env, fileStateCache, git, ide, model model, platform, plugins installedPluginsManager/marketplaceManager/officialMarketplace, sessionStorage, growthbook, API overageCreditGrant/referral, tipHistory, types

## Logic
1. `_isOfficialMarketplaceInstalledCache` - cached marketplace installation check
2. `isOfficialMarketplaceInstalled` - checks if official marketplace installed
3. `isMarketplacePluginRelevant` - checks if marketplace plugin relevant for tip
4. Checks official marketplace installed, plugin not already installed
5. Checks bashTools context for CLI signal matching
6. Tip signals: filePath regex, CLI command patterns
7. Integrates with IDE detection (VSCode, Cursor, Windsurf)
8. Model capability checks (effort support, main loop model)
9. Session context (agent color, custom title enabled)
10. Overages/referral eligibility checks
11. Plugin and marketplace state tracking
12. File history, worktree count, concurrent sessions context

## Exports
- `isOfficialMarketplaceInstalled` - checks marketplace installation
- `isMarketplacePluginRelevant` - checks plugin relevance for tip
- (Tip registry functions for contextual tip selection)

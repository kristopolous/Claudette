# utils/sandbox/sandbox-adapter

## Purpose
Adapter layer wrapping `@anthropic-ai/sandbox-runtime` with Claude CLI-specific integrations: settings conversion, path resolution, security hardening (bare-git scrub, settings protection, skills protection), worktree support, dynamic config refresh, and platform support checks.

## Imports
- **Stdlib**: `fs` (rmSync, statSync), `fs/promises` (readFile), `path` (join, resolve, sep)
- **External**: `@anthropic-ai/sandbox-runtime` (BaseSandboxManager, SandboxRuntimeConfigSchema, SandboxViolationStore, and types), `lodash-es` (memoize)
- **Internal**: `../../bootstrap/state.js` (getAdditionalDirectoriesForClaudeMd, getCwdState, getOriginalCwd), `../debug.js` (logForDebugging), `../path.js` (expandPath), `../platform.js` (getPlatform, Platform), `../settings/changeDetector.js` (settingsChangeDetector), `../settings/constants.js` (SETTING_SOURCES, SettingSource), `../settings/managedPath.js` (getManagedSettingsDropInDir), `../settings/settings.js` (getInitialSettings, getSettings_DEPRECATED, getSettingsFilePathForSource, getSettingsForSource, getSettingsRootPathForSource, updateSettingsForSource), `../settings/types.js` (SettingsJson), `src/tools/BashTool/toolName.js` (BASH_TOOL_NAME), `src/tools/FileEditTool/constants.js` (FILE_EDIT_TOOL_NAME), `src/tools/FileReadTool/prompt.js` (FILE_READ_TOOL_NAME), `src/tools/WebFetchTool/prompt.js` (WEB_FETCH_TOOL_NAME), `../errors.js` (errorMessage), `../permissions/filesystem.js` (getClaudeTempDir), `../permissions/PermissionRule.js` (PermissionRuleValue), `../ripgrep.js` (ripgrepCommand)

## Logic
1. **Path resolution** — `resolvePathPatternForSandbox` handles CC-specific path conventions: `//path` → absolute from root, `/path` → relative to settings file dir, `~/path` and relative passed through. `resolveSandboxFilesystemPath` handles sandbox.filesystem.* settings with standard path semantics (fix for #30067).
2. **Settings conversion** — `convertToSandboxRuntimeConfig` transforms Claude Code settings into SandboxRuntimeConfig: extracts network domains from WebFetch rules (respecting allowManagedDomainsOnly policy), builds filesystem allowWrite/denyWrite/allowRead/denyRead lists from permission rules and sandbox.filesystem settings, always includes cwd and Claude temp dir as writable, denies writes to settings.json files and .claude/skills directories, handles bare-git-repo security scrub paths, adds worktree main repo and --add-dir directories, configures ripgrep.
3. **Security hardening** — denies writes to all settings.json paths (original cwd, current cwd, managed drop-in dir), .claude/skills directories, and bare-git-repo files (HEAD, objects, refs, hooks, config) to prevent sandbox escape via git worktree exploitation (#29316).
4. **Platform support** — checks supported platform (macOS, Linux, WSL2+), memoized dependency checks, undocumented `enabledPlatforms` setting for platform-restricted rollout.
5. **Worktree support** — `detectWorktreeMainRepoPath` detects git worktrees by reading .git file, parses gitdir format to extract main repo path; cached for session.
6. **Dynamic config** — subscribes to settingsChangeDetector for live config updates; `refreshConfig()` for immediate sync refresh after permission changes.
7. **Initialization** — async init that resolves worktree path, builds runtime config, initializes BaseSandboxManager, subscribes to settings changes; wrapped SandboxAskCallback enforces allowManagedDomainsOnly policy.
8. **Cleanup** — `scrubBareGitRepoFiles()` deletes planted bare-repo files post-command; `reset()` clears all state and memoized caches.
9. **Glob warnings** — `getLinuxGlobPatternWarnings()` warns about glob patterns in permission rules on Linux/WSL (bubblewrap doesn't support globs).
10. **Policy locking** — `areSandboxSettingsLockedByPolicy()` checks if flagSettings or policySettings override local settings.

## Exports
- `SandboxManager` — ISandboxManager implementation wrapping BaseSandboxManager with CLI-specific features (initialize, isSandboxingEnabled, isSandboxEnabledInSettings, isPlatformInEnabledList, getSandboxUnavailableReason, isAutoAllowBashIfSandboxedEnabled, areUnsandboxedCommandsAllowed, isSandboxRequired, areSandboxSettingsLockedByPolicy, setSandboxSettings, getExcludedCommands, wrapWithSandbox, refreshConfig, reset, checkDependencies, plus forwarded BaseSandboxManager methods)
- `resolvePathPatternForSandbox(pattern, source)` — resolves CC-specific path patterns for sandbox-runtime
- `resolveSandboxFilesystemPath(pattern, source)` — resolves sandbox.filesystem.* paths with standard semantics
- `shouldAllowManagedSandboxDomainsOnly()` — checks policySettings for managed-domains-only mode
- `addToExcludedCommands(command, permissionUpdates?)` — adds command to excludedCommands in localSettings; extracts pattern from Bash permission rules if available
- `ISandboxManager` — interface defining all sandbox manager methods
- Re-exported types: SandboxAskCallback, SandboxDependencyCheck, FsReadRestrictionConfig, FsWriteRestrictionConfig, NetworkRestrictionConfig, NetworkHostPattern, SandboxViolationEvent, SandboxRuntimeConfig, IgnoreViolationsConfig
- Re-exported values: SandboxViolationStore, SandboxRuntimeConfigSchema

## Source
`sandbox-adapter`

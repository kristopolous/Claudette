# utils/computerUse/appNames

## Purpose
Filters and sanitizes installed-app data for computer use `request_access` tool description.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `InstalledAppLike` - { bundleId, displayName, path }
2. `PATH_ALLOWLIST` - only apps under /Applications/, /System/Applications/
3. Excludes /System/Library subpaths (CoreServices, PrivateFrameworks, Input Methods)
4. `NAME_PATTERN_BLOCKLIST` - filters background services by display name
5. Patterns: Helper, Agent, Service, Uninstaller, Updater, leading dot
6. `(?:$|\s\()` - matches keyword at end OR before ` (` (e.g., "Slack Helper (GPU)")
7. `ALWAYS_KEEP_BUNDLE_IDS` - commonly requested apps for CU automation
8. Bypasses path check and count cap
9. Includes browsers, communication, productivity apps
10. Keep <30 entries - each is guaranteed token in description
11. Residual risk: short adversarial names ("grant all") can't be filtered
12. Tool description framing + explicit user approval prevents auto-grant

## Exports
- `InstalledAppLike` - installed app type
- `PATH_ALLOWLIST` - allowed path prefixes
- `NAME_PATTERN_BLOCKLIST` - blocked name patterns
- `ALWAYS_KEEP_BUNDLE_IDS` - always-kept bundle IDs
- (App filtering functions)

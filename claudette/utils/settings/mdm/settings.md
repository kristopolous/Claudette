# utils/settings/mdm/settings

## Purpose
Provides MDM (Mobile Device Management) profile enforcement for Claude Code managed settings.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: debug, diagLogs, fileRead, fsOperations, json, startupProfiler, settings managedPath/types/validation, mdm constants/rawRead

## Logic
1. Reads enterprise settings from OS-level MDM configuration
2. macOS: `com.anthropic.claudecode` preference domain (MDM profiles at /Library/Managed Preferences/)
3. Windows: `HKLM\SOFTWARE\Policies\ClaudeCode` (admin-only) and `HKCU\SOFTWARE\Policies\ClaudeCode` (user-writable, lowest priority)
4. Linux: No MDM equivalent (uses /etc/claude-code/managed-settings.json instead)
5. Policy settings use "first source wins" - highest-priority source that exists provides all policy settings
6. Priority (highest to lowest): remote → HKLM/plist → managed-settings.json → HKCU
7. Architecture: constants.ts (shared constants), rawRead.ts (subprocess I/O), settings.ts (parsing, caching, first-source-wins)
8. `MdmResult` - { settings, errors }
9. `EMPTY_RESULT` - frozen empty result
10. `mdmCache`, `hkcuCache` - MDM and HKCU result caches
11. `mdmLoadPromise` - MDM load promise
12. `startMdmSettingsLoad` - kicks off async MDM/HKCU reads early in startup
13. Uses startup raw read if cli.tsx fired it, otherwise fires fresh one
14. `consumeRawReadResult` - parses raw read result
15. `getMdmSettings` - gets MDM settings from cache or loads
16. `getHkcuSettings` - gets HKCU settings from cache or loads
17. `refreshMdmSettings` - refreshes MDM settings
18. `setMdmSettingsCache` - sets MDM settings cache
19. `isMdmLoaded` - checks if MDM loaded
20. `waitForMdmLoad` - waits for MDM load

## Exports
- `MdmResult` - MDM result type
- `EMPTY_RESULT` - empty result constant
- `startMdmSettingsLoad` - starts MDM load
- `getMdmSettings` - gets MDM settings
- `getHkcuSettings` - gets HKCU settings
- `refreshMdmSettings` - refreshes MDM settings
- `setMdmSettingsCache` - sets MDM cache
- `isMdmLoaded` - checks if MDM loaded
- `waitForMdmLoad` - waits for MDM load

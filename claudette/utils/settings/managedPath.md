# utils/settings/managedPath

## Purpose
Provides managed settings file path utilities based on platform.

## Imports
- **Stdlib**: `path`
- **External**: `lodash-es/memoize`
- **Internal**: platform

## Logic
1. `getManagedFilePath` - memoized function getting managed settings directory path
2. Allows override via CLAUDE_CODE_MANAGED_SETTINGS_PATH env var (Ant-only, eliminated from external builds)
3. Platform-specific paths:
   - macOS: /Library/Application Support/ClaudeCode
   - Windows: C:\Program Files\ClaudeCode
   - Default (Linux): /etc/claude-code
4. `getManagedSettingsDropInDir` - memoized function getting managed-settings.d/ drop-in directory
5. managed-settings.json is merged first (base)
6. Files in managed-settings.d/ are merged alphabetically on top (drop-ins override base, later files win)
7. Path: join(getManagedFilePath(), 'managed-settings.d')

## Exports
- `getManagedFilePath` - gets managed settings file path
- `getManagedSettingsDropInDir` - gets managed settings drop-in directory

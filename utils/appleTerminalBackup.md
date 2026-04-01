# utils/appleTerminalBackup

## Purpose
Backs up and restores Apple Terminal preferences during setup.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: config, execFileNoThrow, log

## Logic
1. `markTerminalSetupInProgress` - marks setup in progress with backup path
2. Saves appleTerminalSetupInProgress and appleTerminalBackupPath to config
3. `markTerminalSetupComplete` - marks setup complete
4. Clears appleTerminalSetupInProgress flag
5. `getTerminalRecoveryInfo` - gets recovery info from config
6. Returns inProgress flag and backupPath
7. `getTerminalPlistPath` - gets Terminal.plist path
8. Path: ~/Library/Preferences/com.apple.Terminal.plist
9. `backupTerminalPreferences` - backs up Terminal preferences
10. Uses `defaults export com.apple.Terminal` command
11. Creates .bak backup file
12. Marks setup in progress with backup path
13. Returns backup path or null on failure
14. `RestoreResult` - restored/no_backup/failed with backupPath
15. `restoreTerminalPreferences` - restores from backup
16. `cleanupTerminalBackup` - cleans up backup file

## Exports
- `markTerminalSetupInProgress` - marks setup in progress
- `markTerminalSetupComplete` - marks setup complete
- `getTerminalRecoveryInfo` - gets recovery info
- `getTerminalPlistPath` - gets Terminal plist path
- `backupTerminalPreferences` - backs up preferences
- `restoreTerminalPreferences` - restores preferences
- `cleanupTerminalBackup` - cleans up backup

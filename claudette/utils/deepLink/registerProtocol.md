# utils/deepLink/registerProtocol

## Purpose
Registers claude-cli:// custom URI scheme with OS for deep linking.

## Imports
- **Stdlib**: `fs`, `os`, `path`
- **External**: (none)
- **Internal**: growthbook, analytics, debug, envUtils, errors, execFileNoThrow, settings, which, xdg, parseDeepLink

## Logic
1. `MACOS_BUNDLE_ID` - 'com.anthropic.claude-code-url-handler'
2. `APP_NAME` - 'Claudette URL Handler'
3. `DESKTOP_FILE_NAME` - 'claude-code-url-handler.desktop'
4. `MACOS_APP_NAME` - 'Claudette URL Handler.app'
5. `MACOS_APP_DIR` - ~/Applications/Claudette URL Handler.app
6. `MACOS_SYMLINK_PATH` - symlink to claude binary in app bundle
7. `linuxDesktopPath` - $XDG_DATA_HOME/applications/claude-code-url-handler.desktop
8. `WINDOWS_REG_KEY` - HKCU\Software\Classes\claude-cli
9. `WINDOWS_COMMAND_KEY` - shell\open\command subkey
10. `FAILURE_BACKOFF_MS` (24h) - backoff for registration failures
11. `linuxExecLine` - generates Exec line for .desktop file
12. `windowsCommandValue` - generates command value for registry
13. `registerMacos` - creates .app bundle with CFBundleURLTypes
14. Symlinks to already-installed claude binary (avoids separate signing)
15. macOS opens URL through app bundle, NAPI module reads Apple Event
16. `registerLinux` - creates .desktop file, registers with xdg-mime
17. `registerWindows` - writes registry keys for protocol handler
18. `isProtocolHandlerCurrent` - checks if handler is correctly registered
19. `ensureProtocolHandlerRegistered` - ensures handler is registered

## Exports
- `MACOS_BUNDLE_ID` - macOS bundle ID
- `registerMacos` - registers on macOS
- `registerLinux` - registers on Linux
- `registerWindows` - registers on Windows
- `isProtocolHandlerCurrent` - checks handler registration
- `ensureProtocolHandlerRegistered` - ensures registration

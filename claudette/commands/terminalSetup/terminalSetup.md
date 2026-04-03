# Terminal Setup Command (`terminal-setup`)

## Purpose
Configures terminal keybindings for convenient multi-line input:
- **Terminal.app (macOS)**: Enables Option+Enter as newline and disables audio bell.
- **VSCode, Cursor, Windsurf**: Installs Shift+Enter keybinding to send `ESC+Enter`.
- **Alacritty**: Adds Shift+Return binding to config.
- **Zed**: Adds terminal Shift-Enter binding tokeymapon.
Also optionally installs shell completions (internal) and marks onboarding complete. Skips setup on terminals that natively support the keyboard protocol (Ghostty, Kitty, iTerm2, WezTerm, Warp).

## Imports
### External
- STYLER (for colored output)
- `crypto` (`randomBytes` for backup suffixes)
- `fs/promises` (`mkdir`, `readFile`, `writeFile`, `copyFile`)
- `os` (`homedir`, `platform`)
- `path` (`dirname`, `join`)
- `url` (`pathToFileURL`)

### Internal
- `supportsHyperlinks` from `../../ink/supportshyperlinks`
- `color` from `.././ink`
- `maybeMarkProjectOnboardingComplete` from `.././projectOnboardingState`
- `ToolUseContext` and `LocalJSXCommandContext` types from `.././commands`
- `LocalJSXCommandOnDone` type from `.././types/command`
- `backupTerminalPreferences`, `checkAndRestoreTerminalBackup`, `getTerminalPlistPath`, `markTerminalSetupComplete` from `.././utils/appleTerminalBackup`
- `setupShellCompletion` from `.././utils/completionCache`
- `getGlobalConfig`, `saveGlobalConfig` from `.././utils/config`
- `env` from `.././utils/env`
- `isFsInaccessible` from `.././utils/errors`
- `execFileNoThrow` from `.././utils/execFileNoThrow`
- `addItemToJSONCArray`, `safeParseJSONC` from `.././utils/json`
- `logError` from `.././utils/log`
- `getPlatform` from `.././utils/platform`
- `jsonParse`, `jsonStringify` from `.././utils/slowOperations`

## Logic
The `call` async function receives `onDone`, `context`, and `_args`:

1. If terminal is in `NATIVE_CSIU_TERMINALS`, returns a message that native support exists; no setup needed.
2. If `!shouldOfferTerminalSetup()`: constructs a platform-specific message explaining that the current terminal doesn't support automated setup, lists supported terminals/IDEs, and suggests running the command directly in a supported terminal. Returns that message.
3. Otherwise:
   - Calls `setupTerminal(context.options.theme)` to perform terminal-specific configuration.
   - `setupTerminal` dispatches based on `env.terminal`:
     - `'Apple_Terminal'`: calls `enableOptionAsMetaForTerminal()` which modifies Terminal.app preferences via PlistBuddy and `defaults`, creates backup, disables bell, flushes cfprefsd, marks setup complete. Returns success message or throws with restore attempts on failure.
     - `'vscode' | 'cursor' | 'windsurf'`: calls `installBindingsForVSCodeTerminal()`, which:
       - Detects VSCode Remote SSH and provides manual instructions if needed.
       - Findskeybindingson in the appropriate user profile directory.
       - Backs up existing keybindings.
       - Checks for existing Shift+Enter binding; warns if found.
       - Adds a new binding for `workbench.action.terminal.sendSequence` with `text: "\u001b\r"`.
       - Writes updated JSONC and returns success with path.
     - `'alacritty'`: calls `installBindingsForAlacritty()`, which finds `alacritty.toml`, backs up, appends a `[[keyboard.bindings]]` section for Shift+Return, writes file, returns message.
     - `'zed'`: calls `installBindingsForZed()`, which creates/updates `~/config/zed/keymapon` with a terminal context binding for `shift-enter`.
   - After setup, saves a flag in global config (`shiftEnterKeyBindingInstalled` or `optionAsMetaKeyInstalled`) to remember installation.
   - Calls `maybeMarkProjectOnboardingComplete()`.
   - If `"external" === 'ant'` (internal check), installs shell completions via `setupShellCompletion()` and appends result.
   - Returns the aggregated result string.
4. `onDone(result)` or `onDone(message)` is called with the result; `call` returns `null`.

Supporting exports:
- `shouldOfferTerminalSetup()`: Returns true for terminals that support automated setup (specific macOS terminals, IDEs, Alacritty, Zed).
- `getNativeCSIuTerminalDisplayName()`: Returns user-friendly name if terminal natively supports CSI u.
- Various terminal-specific functions are exported for reuse.

## Exports
- `call` (async function) - Main command handler
- `shouldOfferTerminalSetup` (function) - Determines if setup can be automated
- `getNativeCSIuTerminalDisplayName` (function) - Returns native terminal display name
- `setupTerminal` (async function) - Performs terminal-specific setup
- `installBindingsForVSCodeTerminal` (async function) - VSCode/Cursor/Windsurf setup
- `enableOptionAsMetaForTerminal` (async function) - Terminal.app setup
- `installBindingsForAlacritty` (async function) - Alacritty setup
- `installBindingsForZed` (async function) - Zed setup
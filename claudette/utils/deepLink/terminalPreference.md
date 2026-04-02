# terminalPreference

## Purpose
Captures the current terminal from `TERM_PROGRAM` during interactive startup and stores it in global config, so the headless deep link handler (which runs without `TERM_PROGRAM` set) can use the user's actual preferred terminal instead of falling back to a static priority list.

## Imports
- **Internal**: `../config` (getGlobalConfig, saveGlobalConfig), `../debug` (logForDebugging)

## Logic
1. Only runs on macOS (`process.platform !== 'darwin'` returns early).
2. Reads `TERM_PROGRAM` env var and maps it to the app name used by `launchMacosTerminal` via `TERM_PROGRAM_TO_APP` mapping (e.g., `"iTerm.app"` → `"iTerm"`, `"Apple_Terminal"` → `"Terminal"`).
3. If the mapped app differs from the stored `deepLinkTerminal` config, saves it via `saveGlobalConfig`.
4. Called fire-and-forget from interactive startup (same pattern as `updateGithubRepoPathMapping`).
5. Separate module from `terminalLauncher.ts` so `interactiveHelpers.tsx` can import it without pulling the full launcher into the startup path (preserves LODESTONE tree-shaking).

Mapping: `iterm`/`iterm.app` → `iTerm`, `ghostty` → `Ghostty`, `kitty` → `kitty`, `alacritty` → `Alacritty`, `wezterm` → `WezTerm`, `apple_terminal` → `Terminal`.

## Exports
- `updateDeepLinkTerminalPreference` - void function, captures and stores terminal preference from `TERM_PROGRAM`

## Source
`claude-code/src/utils/deepLink/terminalPreference.ts`

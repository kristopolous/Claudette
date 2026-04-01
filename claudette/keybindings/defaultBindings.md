## Purpose
Defines the default keybindings that ship with Claudette, organized by UI context.

## Imports
- **Stdlib**: none
- **External**: `bun:bundle` (feature)
- **Internal**: `utils/semver` (satisfies), `utils/bundledMode` (isRunningWithBun), `utils/platform` (getPlatform), `types` (KeybindingBlock)

## Logic
Constructs an array of keybinding blocks for each UI context (Global, Chat, Autocomplete, Confirmation, etc.). Adapts certain bindings based on platform capabilities such as terminal VT mode support and available feature flags. Platform-specific keys like image paste and mode cycling are selected at module load time. Feature-gated bindings are conditionally included using runtime feature checks.

## Exports
- `DEFAULT_BINDINGS` - array of default keybinding blocks covering all UI contexts

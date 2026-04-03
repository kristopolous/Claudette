## Purpose
Provides a tab for configuring sandbox override behavior, allowing users to choose between strict sandbox mode and unsandboxed fallback.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink`, `types/command`, `utils/sandbox/sandbox-adapter`, `CustomSelect/select`, `design-system/Tabs`

## Logic
1. Checks if sandboxing is enabled and if settings are locked by policy
2. Returns early with appropriate messages if sandbox is disabled or settings are locked
3. Renders a select component with two override modes: open (allow unsandboxed fallback) and closed (strict sandbox mode)
4. On selection, updates sandbox settings via SandboxManager.setSandboxSettings with the allowUnsandboxedCommands flag
5. Displays mode descriptions and a link to documentation

## Exports
- `SandboxOverridesTab` - Renders the overrides configuration UI or early-returns status messages when sandbox is disabled/locked

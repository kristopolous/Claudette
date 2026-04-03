## Purpose
Displays a detailed view of sandbox dependency status, checking for required tools like ripgrep, bubblewrap, socat, and seccomp filters.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink`, `utils/platform`, `utils/sandbox/sandbox-adapter`

## Logic
1. Detects the current platform to determine which dependencies are relevant
2. On macOS, shows seatbelt as built-in and only checks for ripgrep
3. On Linux/WSL, checks for bubblewrap, socat, and seccomp filter availability
4. Displays each dependency with found/not-found status and platform-specific install hints
5. Filters out known dependency errors to display any remaining errors separately

## Exports
- `SandboxDependenciesTab` - Renders the dependency status panel with per-dependency checks and install instructions

## Purpose
Defines shortcuts that are intercepted by the OS, terminal, or shell and cannot be rebound by users.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `utils/platform.js` (getPlatform)

## Logic
Categorizes reserved shortcuts into non-rebindable (hardcoded in the application), terminal-reserved (intercepted by the terminal), and macOS-specific OS shortcuts. Assembles the appropriate set based on the current platform. Provides a normalization function that lowercases key strings and sorts modifiers for consistent comparison, handling chord sequences correctly by normalizing each step independently.

## Exports
- `ReservedShortcut` - type for a reserved shortcut with key, reason, and severity
- `NON_REBINDABLE` - shortcuts that are hardcoded and cannot be rebound
- `TERMINAL_RESERVED` - shortcuts intercepted by the terminal or OS
- `MACOS_RESERVED` - macOS-specific shortcuts intercepted by the OS
- `getReservedShortcuts` - returns all reserved shortcuts for the current platform
- `normalizeKeyForComparison` - normalizes a key string for case-insensitive, order-independent comparison

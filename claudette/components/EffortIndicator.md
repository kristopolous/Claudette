## Purpose
Provides utility functions for converting effort levels to visual symbols and generating effort change notification text.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `constants/figures`, `utils/effort`

## Logic
1. `effortLevelToSymbol` maps effort levels (low, medium, high, max) to their corresponding Unicode symbols from constants, with a defensive fallback to the high symbol for unknown values
2. `getEffortNotificationText` checks if the model supports effort, retrieves the displayed effort level, and formats it as a notification string with the symbol, level name, and a reference to the `/effort` command

## Exports
- `getEffortNotificationText` - returns a formatted effort notification string or undefined if the model does not support effort
- `effortLevelToSymbol` - converts an effort level string to its corresponding display symbol

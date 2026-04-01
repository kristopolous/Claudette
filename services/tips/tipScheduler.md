# services/tips/tipScheduler

## Purpose
Selects and records tips to show during Claude Code startup spinner.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: settings, analytics, tipHistory, tipRegistry, types

## Logic
1. `selectTipWithLongestTimeSinceShown` - selects tip shown least recently
2. Returns undefined for empty tips array
3. Returns single tip if only one available
4. Sorts tips by sessions since last shown (descending)
5. Returns tip with maximum sessions since last shown
6. `getTipToShowOnSpinner` - gets tip to show during spinner
7. Checks if spinner tips disabled in settings
8. Gets relevant tips from registry
9. Selects tip with longest time since shown
10. `recordShownTip` - records shown tip in history and analytics
11. Logs tengu_tip_shown event with tipIdLength, cooldownSessions

## Exports
- `selectTipWithLongestTimeSinceShown` - selects least-recently-shown tip
- `getTipToShowOnSpinner` - gets tip for spinner display
- `recordShownTip` - records shown tip

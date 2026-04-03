# useBuddyNotification

## Purpose
Provides notification hook for buddy teaser and /buddy command trigger detection.

## Imports
- **Stdlib**: (none)
- **External**: REACT_COMPILER, BUILDFLAGS, REACT
- **Internal**: notifications context, ink Text, config, thinking utils

## Logic
1. `isBuddyTeaserWindow` - checks if within April 1-7, 2026 teaser period (local date)
2. `isBuddyLive` - checks if buddy is live (2026+ or April+)
3. `RainbowText` - renders rainbow-colored text with per-char colors
4. `useBuddyNotification` - shows /buddy teaser notification on startup when no companion hatched
5. 15-second immediate priority notification, auto-dismisses
6. `findBuddyTriggerPositions` - finds all /buddy command positions in text for interaction

## Exports
- `isBuddyTeaserWindow` - checks if within teaser window (April 1-7, 2026)
- `isBuddyLive` - checks if buddy feature is live
- `RainbowText` - rainbow-colored text component
- `useBuddyNotification` - hook showing teaser notification
- `findBuddyTriggerPositions` - finds /buddy command positions in text

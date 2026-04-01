# services/tips/tipHistory

## Purpose
Tracks tip display history to avoid showing same tips repeatedly.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: config utils

## Logic
1. `recordTipShown` - records tip in global config history
2. Uses numStartups counter as timestamp proxy
3. Saves to tipsHistory object keyed by tipId
4. No-op if tip already recorded for current startup count
5. `getSessionsSinceLastShown` - calculates sessions since tip shown
6. Returns Infinity if tip never shown
7. Returns config.numStartups - lastShown startup count
8. Used for tip rotation to show least-recently-shown tips first

## Exports
- `recordTipShown` - records tip in history
- `getSessionsSinceLastShown` - gets sessions since tip shown

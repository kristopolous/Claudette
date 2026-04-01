# Passes Command Definition (`index`)

## Purpose
Defines the `passes` command for the referral program. The command is hidden when the user is not eligible or referral cache is unavailable.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `checkCachedPassesEligibility`, `getCachedReferrerReward` from `../../services/api/referral.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'passes'`
- `description`: Getter that returns:
  - `'Share a free week of Claudette with friends and earn extra usage'` if there is a cached reward
  - `'Share a free week of Claudette with friends'` otherwise
- `isHidden`: Getter that returns `!eligible || !hasCache` based on `checkCachedPassesEligibility()`
- `load`: Dynamic import of `./passes.js` (or `.tsx`)

## Exports
- Default command object (satisfies `Command`)
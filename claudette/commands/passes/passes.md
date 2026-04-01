# Passes Command (`passes`)

## Purpose
Displays the Passes (referral program) interface, allowing users to share a free week of Claude Code with friends. Tracks first visit to control upsell visibility. Supports earning extra usage through referrals.

## Imports
### Stdlib
- `react`

### Internal
- `Passes` component from `../../components/Passes/Passes.js`
- `logEvent` from `../../services/analytics/index.js`
- `getCachedRemainingPasses` from `../../services/api/referral.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`
- `getGlobalConfig`, `saveGlobalConfig` from `../../utils/config.js`

## Logic
The `call` async function:
1. Reads global config to check `hasVisitedPasses`.
2. If this is the first visit:
   - Fetches cached remaining passes count.
   - Saves `hasVisitedPasses: true` and records `passesLastSeenRemaining`.
3. Logs analytics event `tengu_guest_passes_visited` with `is_first_visit`.
4. Renders the `<Passes>` component with the `onDone` callback.

## Exports
- `call` (async function) - Renders the Passes referral UI
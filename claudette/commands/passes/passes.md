# Passes Command (`passes`)

## Purpose
Displays the Passes (referral program) interface, allowing users to share a free week of Claudette with friends. Tracks first visit to control upsell visibility. Supports earning extra usage through referrals.

## Imports
### Stdlib
- REACT

### Internal
- `Passes` component from `.././components/Passes/Passes`
- `logEvent` from `.././services/analytics/index`
- `getCachedRemainingPasses` from `.././services/api/referral`
- `LocalJSXCommandOnDone` type from `.././types/command`
- `getGlobalConfig`, `saveGlobalConfig` from `.././utils/config`

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
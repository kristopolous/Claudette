# Rate Limit Options Command (internal)

## Purpose
Internal command that displays a dialog with options when the rate limit is reached. Offers actions like upgrading plan, enabling extra usage, or canceling. Hidden from help and used programmatically.

## Imports
### Stdlib
- `react` (including `useState`, `useMemo`)

### Internal
- `CommandResultDisplay`, `LocalJSXCommandContext` types from `../../commands.js`
- `OptionWithDescription` type and `Select` component from `../../components/CustomSelect/select.js`
- `Dialog` from `../../components/design-system/Dialog.js`
- `getFeatureValue_CACHED_MAY_BE_STALE` from `../../services/analytics/growthbook.js`
- `logEvent` from `../../services/analytics/index.js`
- `useClaudeAiLimits` from `../../services/claudeAiLimitsHook.js`
- `ToolUseContext` type from `../../Tool.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`
- `getOauthAccountInfo`, `getRateLimitTier`, `getSubscriptionType` from `../../utils/auth.js`
- `hasClaudeAiBillingAccess` from `../../utils/billing.js`
- `extraUsageCall` (command call) and `extraUsage` (command module) from `../extra-usage/extra-usage.js` and index
- `upgrade` command module and `upgradeCall` from `../upgrade/` directory

## Logic
The `call` async function renders the `RateLimitOptionsMenu` component, providing `onDone` and `context` (which satisfies both `ToolUseContext` and `LocalJSXCommandContext`).

`RateLimitOptionsMenu` React component:
- Uses `useClaudeAiLimits()` to get `overageDisabledReason` and `overageStatus`.
- Gets subscription type (`getSubscriptionType`) and rate limit tier (`getRateLimitTier`).
- Checks `hasExtraUsageEnabled` via `getOauthAccountInfo()`.
- Computes flags: `isMax`, `isMax20x`, `isTeamOrEnterprise`.
- Reads GrowthBook feature `tengu_jade_anvil_4` (`buyFirst`).
- Builds `actionOptions` array based on state:
  - If extra usage is enabled and billing conditions allow, adds either "Request more"/"Request extra usage" (team/enterprise without billing access) or "Add funds to continue with extra usage"/"Switch to extra usage".
  - If upgrade is enabled and not max20x/team/enterprise, adds "Upgrade your plan".
- Adds cancel option "Stop and wait for limit to reset".
- If `buyFirst` is true, order is `[..., cancelOption]`; otherwise `[cancelOption, ...actionOptions]`.
- `handleSelect(value)`:
  - `"upgrade"`: logs event, calls `upgradeCall(onDone, context)`, sets `subCommandJSX` if returned.
  - `"extra-usage"`: logs event, calls `extraUsageCall(onDone, context)`, sets `subCommandJSX` if returned.
  - `"cancel"`: calls `handleCancel` (logs event, calls `onDone(undefined, { display: 'skip' })`).
- `handleCancel` as above.
- If `subCommandJSX` exists (sub-command rendered), returns it immediately.
- Otherwise, renders a `Select` dropdown with the options, inside a `Dialog` titled "What do you want to do?".

`call` returns the rendered component.

## Exports
- `call` (async function) - Renders the rate limit options menu
- `RateLimitOptionsMenu` (React component) - The menu UI
## Purpose
Shows a low-priority startup notification encouraging users with an existing Claude subscription to log in and activate it.

## Imports
- **External**: REACT
- **Internal**:
  - src/services/oauth/getOauthProfile` (getOauthProfileFromApiKey)
  - src/utils/auth` (isClaudeAISubscriber)
  - `.././ink` (Text)
  - `.././services/analytics/index` (logEvent)
  - `.././utils/config` (getGlobalConfig, saveGlobalConfig)
  - `/useStartupNotification` (useStartupNotification)

## Logic
- Hook uses `useStartupNotification` with async `_temp2` builder
- Checks `subscriptionNoticeCount` in global config; shows at most 3 times (MAX_SHOW_COUNT)
- `getExistingClaudeSubscription()`:
  - Exits early if already a subscriber (nothing to switch)
  - Fetches OAuth profile via API key; if none, returns null
  - Returns 'Max' or 'Pro' based on `profile.account.has_claude_max/pro`
- If subscription found:
  - Increments `subscriptionNoticeCount`
  - Logs analytics `tengu_switch_to_subscription_notice_shown`
  - Returns notification JSX: "Use your existing Claude {type} plan with Claudette · /login to activate"
- Not shown if no subscription found, already logged in, or limit reached

## Exports
- `useCanSwitchToExistingSubscription` - Hook (no parameters)

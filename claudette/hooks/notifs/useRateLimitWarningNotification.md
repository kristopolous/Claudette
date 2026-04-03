## Purpose
Shows rate limit warnings (high priority) and overage notifications (immediate) for Claude AI usage based on current model and subscription limits.

## Imports
- **External**: REACT (useEffect, useMemo, useRef, useState)
- **Internal**:
  - src/context/notifications` (useNotifications)
  - src/ink` (Text)
  - src/services/claudeAiLimits` (getRateLimitWarning, getUsingOverageText)
  - src/services/claudeAiLimitsHook` (useClaudeAiLimits)
  - src/utils/auth` (getSubscriptionType)
  - src/utils/billing` (hasClaudeAiBillingAccess)
  - `.././bootstrap/state` (getIsRemoteMode)

## Logic
Hook parameter: `model: string`
Two independent effects:
1. **Rate limit warning** (`useEffect`):
   - Computes `rateLimitWarning = getRateLimitWarning(claudeAiLimits, model)`
   - If warning changes (tracked by `shownWarningRef`), shows high-priority notification
2. **Overage notification** (`useEffect`):
   - When `isUsingOverage` true and not yet shown (and not team/enterprise without billing access):
     - Shows immediate notification using `usingOverageText`
     - Sets `hasShownOverageNotification` to true (persists until overage clears)
   - When overage clears, resets flag to false
- Both effects skip in remote mode

## Exports
- `useRateLimitWarningNotification` - Hook `(model: string) => void`

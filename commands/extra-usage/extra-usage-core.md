## Purpose
Core logic for /extra-usage - determines where to send user based on plan and access.

## Imports
- **External**: None
- **Internal**: API services (admin requests, usage), auth utils, browser opener, config

## Logic
Orchestrates extra usage setup flow:
1. Checks if user has billing access on team/enterprise
2. If unlimited overage already enabled → shows message
3. If team/enterprise without access → submits admin request or contacts admin
4. Else (pro/max or team with access) → opens browser to settings/usage or admin-settings/usage

Invalidates overage credit grant cache to fetch fresh state. Logs telemetry events for onboarding funnel.

## Exports
- `runExtraUsage` - Async function returning message or browser-opened result

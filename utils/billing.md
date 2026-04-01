# utils/billing

## Purpose
Provides billing access checks for cost reporting and Claude.ai billing.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: auth, config, envUtils

## Logic
1. `hasConsoleBillingAccess` - checks if user has console billing access
2. Respects DISABLE_COST_WARNINGS env var
3. Returns false for Claude.ai subscribers (separate billing)
4. Returns false for unauthenticated users
5. Checks orgRole and workspaceRole from oauthAccount
6. Returns true for admin/billing roles at workspace or org level
7. `setMockBillingAccessOverride` - sets mock access for /mock-limits testing
8. `hasClaudeAiBillingAccess` - checks Claude.ai billing access
9. Respects mockBillingAccessOverride for testing
10. Returns false for non-subscribers
11. Consumer plans (max/pro): always have billing access
12. Team/Enterprise: checks for admin/billing/owner/primary_owner roles
13. Uses getSubscriptionType for plan determination

## Exports
- `hasConsoleBillingAccess` - checks console billing access
- `setMockBillingAccessOverride` - sets mock billing access
- `hasClaudeAiBillingAccess` - checks Claude.ai billing access

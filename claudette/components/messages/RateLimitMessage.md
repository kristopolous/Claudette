## Purpose
Renders rate limit error messages with contextual upsell suggestions based on subscription type, tier, and billing access.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: ink (Box, Text), MessageResponse, claudeAiLimitsHook, rateLimitMocking, auth utils, billing utils, extra-usage command

## Logic
1. Determines subscription type (team/enterprise), rate limit tier, and whether upsell should be shown
2. Checks if currently rate limited using claudeAiLimits hook
3. Auto-opens rate limit options menu when appropriate (first time, currently limited)
4. Generates upsell message based on context:
   - Max 20x tier: suggests /extra-usage or /login
   - Team/enterprise: suggests /extra-usage with admin request if no billing access
   - Others: suggests /upgrade or /extra-usage
5. Renders the rate limit error text in red with dimmed upsell suggestion below

## Exports
- `RateLimitMessage` - UI component rendering rate limit errors with contextual upsell
- `getUpsellMessage` - Pure function generating upsell message string based on subscription params

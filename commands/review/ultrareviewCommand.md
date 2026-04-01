## Purpose
Command handler for /ultrareview - launches remote code review via CCR.

## Imports
- **External**: React, ContentBlockParam type from Anthropic SDK
- **Internal**: reviewRemote helpers, UltrareviewOverageDialog

## Logic
Checks billing/quotas via checkOverageGate() then either:
- Blocks if not enabled or low balance
- Shows overage confirmation dialog if needed
- Launches remote review via launchRemoteReview()

Wraps launch with abort signal handling. Returns ContentBlockParam[] for injection into conversation to narrate launch outcome.

## Exports
- `call` - LocalJSXCommandCall that executes ultrareview flow

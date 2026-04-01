## Purpose
Display the total cost and duration of the current Claudette session.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `formatTotalCost` (from cost-tracker), `currentLimits` (from services/claudeAiLimits), `isClaudeAISubscriber` (from utils/auth)

## Logic
1. Check if user is a Claude AI subscriber
2. If subscriber:
   - Show subscription usage message
   - If using overage, indicate that overage is being used
   - For Ant users (internal), also show detailed cost breakdown
3. If not subscriber, show standard cost information
4. Returns text response with cost information

## Exports
- `call` - async function that returns text response with session cost/duration

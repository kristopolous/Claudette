# tools/ScheduleCronTool/prompt.ts

## Purpose
Provides feature gating, tool names, descriptions, and system prompts for the cron scheduling system.

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS
- **Internal**: `getFeatureValue_CACHED_WITH_REFRESH`, `DEFAULT_CRON_JITTER_CONFIG`, `isEnvTruthy`

## Logic
Combines build-time and runtime feature flags to gate the cron scheduling system. The `isKairosCronEnabled` function checks the AGENT_TRIGGERS build flag, a local disable override, and a GrowthBook feature gate with 5-minute refresh. `isDurableCronEnabled` controls disk persistence separately. Build functions generate tool descriptions and detailed prompts that explain cron syntax, one-shot vs recurring jobs, jitter behavior, durability options, and auto-expiration rules.

## Exports
- `DEFAULT_MAX_AGE_DAYS` - maximum age in days for recurring tasks before auto-expiration
- `isKairosCronEnabled` - returns whether the cron scheduling system is enabled via feature flags
- `isDurableCronEnabled` - returns whether disk-persistent cron tasks are enabled
- `CRON_CREATE_TOOL_NAME` - the string "CronCreate"
- `CRON_DELETE_TOOL_NAME` - the string "CronDelete"
- `CRON_LIST_TOOL_NAME` - the string "CronList"
- `buildCronCreateDescription` - generates the create tool description based on durable mode
- `buildCronCreatePrompt` - generates the full create tool system prompt with usage instructions
- `CRON_DELETE_DESCRIPTION` - static description for the delete tool
- `buildCronDeletePrompt` - generates the delete tool system prompt based on durable mode
- `CRON_LIST_DESCRIPTION` - static description for the list tool
- `buildCronListPrompt` - generates the list tool system prompt based on durable mode

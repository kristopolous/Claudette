# cronJitterConfig

## Purpose
GrowthBook-backed cron jitter configuration. Separated from cronScheduler.ts so the scheduler can be bundled in the Agent SDK public build without pulling in analytics/growthbook.ts and its large transitive dependency set. Used via `getJitterConfig` callback in createCronScheduler (REPL contexts); daemon/SDK callers omit it and get defaults.

## Imports
- **Stdlib**: `zod/v4` (z)
- **External**: (none)
- **Internal**: `../services/analytics/growthbook` (getFeatureValue_CACHED_WITH_REFRESH), `./cronTasks` (CronJitterConfig type, DEFAULT_CRON_JITTER_CONFIG), `./lazySchema` (lazySchema)

## Logic
1. Reads `tengu_kairos_cron_config` feature flag from GrowthBook with cached refresh (JITTER_CONFIG_REFRESH_MS=60s)
2. Validates against Zod schema with defense-in-depth upper bounds:
   - `recurringFrac`: number 0-1
   - `recurringCapMs`: int 0-30min
   - `oneShotMaxMs`: int 0-30min
   - `oneShotFloorMs`: int 0-30min, must be <= oneShotMaxMs (refine check)
   - `oneShotMinuteMod`: int 1-60
   - `recurringMaxAgeMs`: int 0-30days, defaults to DEFAULT_CRON_JITTER_CONFIG value
3. Falls back to DEFAULT_CRON_JITTER_CONFIG on absent/malformed/out-of-bounds config (Zod rejects whole object on any violation)

## Exports
- `getCronJitterConfig()` - reads GrowthBook feature flag, validates via Zod schema, returns CronJitterConfig or DEFAULT_CRON_JITTER_CONFIG on failure. Called from check() every tick; cheap synchronous cache hit.

## Source
`cronJitterConfig`
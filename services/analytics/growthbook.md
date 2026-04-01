# analytics/growthbook

## Purpose
Implements GrowthBook feature flag client with remote evaluation and experiment tracking.

## Imports
- **Stdlib**: (none)
- **External**: `@growthbook/growthbook`, `lodash-es`
- **Internal**: bootstrap state, keys, config, debug, errors, http, log, signal, JSON utils, user, firstPartyEventLogger

## Logic
1. `GrowthBookUserAttributes` - user attributes for targeting (id, sessionId, deviceID, platform, org/account UUID, subscription, etc.)
2. `MalformedFeatureDefinition` - workaround for API using "value" instead of "defaultValue"
3. Singleton `client` with named handler refs for cleanup
4. `clientCreatedWithAuth` - tracks auth availability at client creation
5. `experimentDataByFeature` - stores experiment data for logging exposures
6. Remote eval feature value caching (SDK workaround)
7. `initializeGrowthBook` - creates client with API key and attributes
8. `resetGrowthBook` - clears client and handlers for re-initialization
9. `checkGate_CACHED_OR_BLOCKING` - blocking gate check with caching
10. `getFeatureValue_CACHED_MAY_BE_STALE` - cached feature value with background refresh
11. `logGrowthBookExperiment` - logs experiment exposure to 1P events

## Exports
- `GrowthBookUserAttributes` - user attributes type
- `initializeGrowthBook` - initializes GrowthBook client
- `resetGrowthBook` - resets client for re-initialization
- `checkGate_CACHED_OR_BLOCKING` - blocking gate check
- `getFeatureValue_CACHED_MAY_BE_STALE` - cached feature value
- `logGrowthBookExperiment` - logs experiment exposure

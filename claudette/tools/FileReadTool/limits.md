# FileReadTool/limits.ts

## Purpose

Defines and computes the output limits for the FileReadTool: maximum file size (bytes) and maximum token count. Supports dynamic configuration via environment variable and GrowthBook feature flags, with sensible defaults and memoization for consistency within a session.

## Imports

- **Stdlib**: None (except types)
- **External**: `lodash-es/memoize`
- **Internal**:
  - Analytics: `getFeatureValue_CACHED_MAY_BE_STALE` from GrowthBook
  - Utils: `MAX_OUTPUT_SIZE` from file utilities

## Logic

**Limits Overview** (documented in header comment):
- `maxSizeBytes`: Default 256 KB. Checks total file size before reading. If exceeded, throws pre-read error.
- `maxTokens`: Default 25000. Checks actual output token count after reading. If exceeded, throws post-read error.
- Known tradeoff: Earlier rejection (byte size) prevents wasted work; truncation reverted due to token inflation.

**Types**:
- `FileReadingLimits`: Interface with `maxTokens`, `maxSizeBytes`, and optional `includeMaxSizeInPrompt`, `targetedRangeNudge`

**Functions**:
- `getDefaultFileReadingLimits(): FileReadingLimits` (memoized):
  - Queries GrowthBook feature `'tengu_amber_wren'` for partial overrides
  - Computes `maxSizeBytes`: GrowthBook value if valid number > 0; else `MAX_OUTPUT_SIZE`
  - Computes `maxTokens`: precedence: env var > GrowthBook valid number > `DEFAULT_MAX_OUTPUT_TOKENS`
  - Copies optional boolean flags from GrowthBook (`includeMaxSizeInPrompt`, `targetedRangeNudge`)
  - Returns stable limits object; memoization ensures GrowthBook refresh doesn't change cap mid-session

**Constants**:
- `DEFAULT_MAX_OUTPUT_TOKENS = 25000`

## Exports

- `DEFAULT_MAX_OUTPUT_TOKENS: number`
- `FileReadingLimits: type`
- `getDefaultFileReadingLimits(): FileReadingLimits`

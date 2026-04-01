# vcr

## Purpose
Provides VCR (Video Cassette Recorder) fixture management for test caching.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: `lodash-es/isPlainObject`, `lodash-es/mapValues`
- **Internal**: cost-tracker, modelCost, message types, cwd, env, envUtils, errors, messages, JSON utils

## Logic
1. `shouldUseVCR` - enables VCR in test mode or ant with FORCE_VCR
2. `withFixture` - generic fixture management helper
3. Creates SHA1 hash of input (12 char slice) for fixture filename
4. Fixture path: fixtures/{fixtureName}-{hash}.json
5. Reads cached fixture if exists
6. Throws error in CI if fixture missing (unless VCR_RECORD=1)
7. Creates and writes new fixture on first run
8. `withTokenCountVCR` - wraps token counting with VCR
9. `addToTotalSessionCost` - tracks session costs
10. `calculateUSDCost` - calculates USD cost from tokens
11. Normalizes messages for API format
12. Supports CLAUDE_CODE_TEST_FIXTURES_ROOT env override

## Exports
- `shouldUseVCR` - checks if VCR should be used
- `withFixture` - generic fixture management
- `withTokenCountVCR` - token counting with VCR

# utils/effort

## Purpose
Provides effort level configuration and model capability detection.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: thinking, settings, auth, growthbook, model providers/modelSupportOverrides, envUtils, SDK runtimeTypes

## Logic
1. `EffortLevel` - 'low' | 'medium' | 'high' | 'max'
2. `EFFORT_LEVELS` - array of valid effort levels
3. `EffortValue` - EffortLevel | number
4. `modelSupportsEffort` - checks if model supports effort parameter
5. Respects CLAUDE_CODE_ALWAYS_ENABLE_EFFORT env var
6. Checks 3P model capability override
7. Supports opus-4-6, sonnet-4-6
8. Excludes haiku, older sonnet/opus variants
9. Defaults true for unknown 1P models, false for 3P
10. `modelSupportsMaxEffort` - checks if model supports 'max' effort
11. Per API docs, 'max' is Opus 4.6 only for public models
12. Checks 3P model capability override
13. `isEffortLevel` - type guard for effort level string
14. `parseEffortValue` - parses effort value from unknown
15. `isValidNumericEffort` - validates numeric effort (1-100)
16. `resolveEffortValue` - resolves effort value with defaults
17. `resolveAppliedEffort` - resolves applied effort for model
18. `getEffortLevelFromSettings` - gets effort from settings

## Exports
- `EffortLevel` - effort level type
- `EffortValue` - effort value type
- `EFFORT_LEVELS` - valid effort levels array
- `modelSupportsEffort` - checks effort support
- `modelSupportsMaxEffort` - checks max effort support
- `isEffortLevel` - effort level type guard
- `parseEffortValue` - parses effort value
- `isValidNumericEffort` - validates numeric effort
- `resolveEffortValue` - resolves effort value
- `resolveAppliedEffort` - resolves applied effort
- `getEffortLevelFromSettings` - gets effort from settings

# analytics/config

## Purpose
Provides shared analytics configuration for determining when analytics should be disabled.

## Imports
- **Stdlib**: `process`
- **External**: (none)
- **Internal**: envUtils, privacyLevel

## Logic
1. `isAnalyticsDisabled` - checks if analytics operations should be disabled
2. Disabled in: test environment (NODE_ENV === 'test'), third-party cloud providers (Bedrock/Vertex/Foundry), privacy level no-telemetry or essential-traffic
3. `isFeedbackSurveyDisabled` - checks if feedback survey should be suppressed
4. Unlike isAnalyticsDisabled, does NOT block on 3P providers
5. Survey is local UI prompt with no transcript data
6. Enterprise customers capture responses via OTEL

## Exports
- `isAnalyticsDisabled` - function checking if analytics disabled
- `isFeedbackSurveyDisabled` - function checking if survey suppressed

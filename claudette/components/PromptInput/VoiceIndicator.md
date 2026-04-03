## Purpose
Renders visual indicators for voice mode states including listening, processing with shimmer animation, and warmup hint.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `react`, `react/compiler-runtime`
- **Internal**: `hooks/useSettings`, `ink`, `Spinner/utils`

## Logic
1. Gated behind VOICE_MODE feature flag, returns null when disabled
2. VoiceIndicator delegates to VoiceIndicatorImpl which switches on voiceState
3. Recording state shows dimmed "listening…" text
4. Processing state shows ProcessingShimmer with animated color interpolation between dim and bright gray using a sine wave with 2-second period
5. Idle state returns null
6. VoiceWarmupHint shows static "keep holding…" text during the activation warmup window
7. ProcessingShimmer respects prefersReducedMotion setting, falling back to static warning text when enabled

## Exports
- `VoiceIndicator` - component that renders voice state indicator (recording/processing/idle)
- `VoiceWarmupHint` - component showing static hint during voice activation warmup

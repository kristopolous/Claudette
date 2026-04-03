# components/LogoV2/VoiceModeNotice

## Purpose
Provides voice mode availability notice component.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `react`, `react/compiler-runtime`
- **Internal**: config, settings settings, voice voiceModeEnabled, LogoV2 AnimatedAsterisk/Opus1mMergeNotice

## Logic
1. `MAX_SHOW_COUNT` (3) - max times to show notice
2. `VoiceModeNotice` - React component for voice mode notice
3. Uses React compiler runtime (_c) for memoization
4. Positive ternary pattern for feature gating (see docs/feature-gating.md)
5. All strings must be inside guarded branch for dead-code elimination
6. Returns VoiceModeNoticeInner if feature("VOICE_MODE") enabled, else null
7. `VoiceModeNoticeInner` - inner component for voice mode notice
8. Captures eligibility once at mount - no reactive subscriptions
9. Sits at top of message list, enters scrollback quickly
10. Any re-render after in scrollback would force full terminal reset
11. If user runs /voice this session, notice stays visible
12. Won't show next session since voiceEnabled will be true on disk
13. Uses useState for show state
14. Checks: isVoiceModeEnabled() && getInitialSettings().voiceEnabled !== true && (getGlobalConfig().voiceNoticeSeenCount ?? 0) < MAX_SHOW_COUNT && !shouldShowOpus1mMergeNotice()
15. useEffect increments voiceNoticeSeenCount in global config
16. Captures outside updater so StrictMode's second invocation is no-op
17. Returns null if !show
18. Renders Box with AnimatedAsterisk and Text: "Voice mode is now available · /voice to enable"
19. `feature` - feature flag checker
20. `useEffect`, `useState` - React hooks
21. `Box`, `Text` - ink components
22. `getGlobalConfig`, `saveGlobalConfig` - config functions
23. `getInitialSettings` - gets initial settings
24. `isVoiceModeEnabled` - checks voice mode enabled
25. `AnimatedAsterisk` - animated asterisk component
26. `shouldShowOpus1mMergeNotice` - checks if should show Opus 1M merge notice

## Exports
- `VoiceModeNotice` - voice mode notice component

# components/LogoV2/LogoV2

## Purpose
Provides main LogoV2 component for terminal header display with feeds.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, hooks useTerminalSize/useMainLoopModel, ink stringWidth, logoV2Utils, format, file, LogoV2 Clawd/FeedColumn/feedConfigs/CondensedLogo/GuestPassesUpsell/OverageCreditUpsell/EmergencyTip/VoiceModeNotice/Opus1mMergeNotice, config, systemTheme, settings settings, debug, projectOnboardingState, OffscreenFreeze, releaseNotes, API dumpPrompts, envUtils, startupProfiler, sandbox sandbox-adapter, state AppState, effort, model model, stringUtils

## Logic
1. `LEFT_PANEL_MAX_WIDTH` (50) - left panel max width
2. `LogoV2` - UI component for main logo display
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Gets activities via getRecentActivitySync
5. Gets username from getGlobalConfig().oauthAccount?.displayName
6. Uses useTerminalSize for columns
7. Checks shouldShowProjectOnboarding
8. Checks SandboxManager.isSandboxingEnabled
9. Uses useShowGuestPassesUpsell, useShowOverageCreditUpsell for upsell visibility
10. Uses useAppState for agent and effortValue
11. Gets config via getGlobalConfig
12. Gets changelog via getRecentReleaseNotesSync(3)
13. Gets layout mode via getLayoutMode
14. Calculates layout dimensions via calculateLayoutDimensions
15. Calculates optimal left width via calculateOptimalLeftWidth
16. Formats welcome message via formatWelcomeMessage
17. Truncates path via truncatePath
18. Gets recent activity via getRecentActivitySync
19. Gets recent release notes via getRecentReleaseNotesSync
20. Gets logo display data via getLogoDisplayData
21. Uses truncate for text truncation
22. Uses getDisplayPath for display path
23. Creates feeds via createRecentActivityFeed, createWhatsNewFeed, createProjectOnboardingFeed, createGuestPassesFeed, createOverageCreditFeed
24. Uses useEffect, useState for state management
25. Gets steps, shouldShowProjectOnboarding, incrementProjectOnboardingSeenCount from projectOnboardingState
26. Uses CondensedLogo for condensed layout
27. Uses OffscreenFreeze for offscreen freeze
28. Checks checkForReleaseNotesSync for release notes
29. Gets dump prompts path via getDumpPromptsPath
30. Uses isEnvTruthy for env check
31. Gets startup perf log path via getStartupPerfLogPath
32. Checks isDetailedProfilingEnabled for profiling
33. Uses EmergencyTip, VoiceModeNotice, Opus1mMergeNotice for notices
34. Uses feature('KAIROS') || feature('KAIROS_CHANNELS') for ChannelsNotice
35. Uses ChannelsNoticeModule for channels notice
36. Uses plural for pluralization
37. Uses getEffortSuffix for effort suffix
38. Uses renderModelSetting for model rendering
39. `getLayoutMode`, `calculateLayoutDimensions`, `calculateOptimalLeftWidth`, `formatWelcomeMessage`, `truncatePath`, `getRecentActivitySync`, `getRecentReleaseNotesSync`, `getLogoDisplayData` - logo utilities
40. `Clawd` - Clawd component
41. `FeedColumn` - feed column component
42. `createRecentActivityFeed`, `createWhatsNewFeed`, `createProjectOnboardingFeed`, `createGuestPassesFeed` - feed config functions
43. `getGlobalConfig`, `saveGlobalConfig` - config functions
44. `resolveThemeSetting` - resolves theme setting
45. `getInitialSettings` - gets initial settings
46. `isDebugMode`, `isDebugToStdErr`, `getDebugLogPath` - debug functions
47. `getSteps`, `shouldShowProjectOnboarding`, `incrementProjectOnboardingSeenCount` - onboarding functions
48. `CondensedLogo` - condensed logo component
49. `OffscreenFreeze` - offscreen freeze component
50. `checkForReleaseNotesSync` - checks release notes
51. `getDumpPromptsPath` - gets dump prompts path
52. `isEnvTruthy` - checks env truthy
53. `getStartupPerfLogPath`, `isDetailedProfilingEnabled` - profiling functions
54. `EmergencyTip`, `VoiceModeNotice`, `Opus1mMergeNotice` - notice components
55. `ChannelsNoticeModule` - channels notice module
56. `SandboxManager` - sandbox manager
57. `useShowGuestPassesUpsell`, `incrementGuestPassesSeenCount` - guest passes functions
58. `useShowOverageCreditUpsell`, `incrementOverageCreditUpsellSeenCount`, `createOverageCreditFeed` - overage credit functions
59. `plural` - pluralizes string
60. `useAppState` - gets app state
61. `getEffortSuffix` - gets effort suffix
62. `useMainLoopModel` - gets main loop model
63. `renderModelSetting` - renders model setting

## Exports
- `LogoV2` - LogoV2 component

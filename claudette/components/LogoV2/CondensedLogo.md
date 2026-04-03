# components/LogoV2/CondensedLogo

## Purpose
Provides condensed logo component for terminal header display.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: hooks useMainLoopModel/useTerminalSize, ink stringWidth, ink, state AppState, effort, format, fullscreen, logoV2Utils, model model, OffscreenFreeze, LogoV2 AnimatedClawd/Clawd/GuestPassesUpsell/OverageCreditUpsell

## Logic
1. `CondensedLogo` - UI component for condensed logo
2. Uses REACT_COMPILER runtime (_c) for memoization
3. Uses useTerminalSize for columns
4. Uses useAppState for agent and effortValue
5. Uses useMainLoopModel for model
6. Gets modelDisplayName via renderModelSetting
7. Gets version, cwd, billingType, agentNameFromSettings via getLogoDisplayData
8. agentName = agent ?? agentNameFromSettings
9. Uses useShowGuestPassesUpsell, useShowOverageCreditUpsell for upsell visibility
10. useEffect to incrementGuestPassesSeenCount if showGuestPassesUpsell
11. useEffect to incrementOverageCreditUpsellSeenCount if showOverageCreditUpsell && !showGuestPassesUpsell
12. textWidth = Math.max(columns - 15, 20)
13. truncatedVersion = truncate(version, Math.max(textWidth - 13, 6))
14. effortSuffix = getEffortSuffix(model, effortValue)
15. formatModelAndBilling for modelDisplayName + effortSuffix, billingType, textWidth
16. cwdAvailableWidth calculation based on agentName presence
17. Renders AnimatedClawd or Clawd based on state
18. Renders version, cwd, model, billing info
19. Renders GuestPassesUpsell or OverageCreditUpsell if visible
20. `useMainLoopModel` - gets main loop model
21. `useTerminalSize` - gets terminal size
22. `stringWidth` - gets string width
23. `useAppState` - gets app state
24. `getEffortSuffix` - gets effort suffix
25. `truncate` - truncates text
26. `isFullscreenEnvEnabled` - checks fullscreen enabled
27. `formatModelAndBilling`, `getLogoDisplayData`, `truncatePath` - logo utilities
28. `renderModelSetting` - renders model setting
29. `OffscreenFreeze` - offscreen freeze component
30. `AnimatedClawd`, `Clawd` - clawd components
31. `GuestPassesUpsell`, `incrementGuestPassesSeenCount`, `useShowGuestPassesUpsell` - guest passes utilities
32. `incrementOverageCreditUpsellSeenCount`, `OverageCreditUpsell`, `useShowOverageCreditUpsell` - overage credit utilities

## Exports
- `CondensedLogo` - condensed logo component

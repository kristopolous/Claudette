# components/LogoV2/EmergencyTip

## Purpose
Provides emergency tip component for displaying dynamic config tips at top of feed.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink, growthbook, config

## Logic
1. `CONFIG_NAME` - 'tengu-top-of-feed-tip'
2. `EmergencyTip` - UI component for emergency tip
3. Uses useMemo for tip via getTipOfFeed (memoized to prevent re-reads)
4. Uses useMemo for lastShownTip from getGlobalConfig().lastShownEmergencyTip
5. Only shows if tip.tip && tip.tip !== lastShownTip
6. useEffect saves tip to global config if shouldShow
7. Checks if current.lastShownEmergencyTip === tip.tip to avoid redundant saves
8. Returns null if !shouldShow
9. Renders Box with paddingLeft={2}, flexDirection="column"
10. Renders Text with color based on tip.color:
    - 'warning' → color: 'warning'
    - 'error' → color: 'error'
    - else → dimColor: true
11. `TipOfFeed` - { tip: string, color?: 'dim' | 'warning' | 'error' }
12. `DEFAULT_TIP` - { tip: '', color: 'dim' }
13. `getTipOfFeed` - gets tip from dynamic config with caching
14. Returns cached value immediately, updates in background
15. Uses getDynamicConfig_CACHED_MAY_BE_STALE<TipOfFeed>
16. `useEffect`, `useMemo` - UI hooks
17. `Box`, `Text` - ink components
18. `getDynamicConfig_CACHED_MAY_BE_STALE` - gets dynamic config
19. `getGlobalConfig`, `saveGlobalConfig` - config functions

## Exports
- `EmergencyTip` - emergency tip component

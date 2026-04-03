# utils/theme

## Purpose
Provides theme configuration for Claudette UI colors.

## Imports
- **Stdlib**: (none)
- **External**: STYLER
- **Internal**: env

## Logic
1. `Theme` - theme configuration type with color properties
2. `autoAccept`, `bashBorder`, `claude`, `claudeShimmer` - base colors
3. `claudeBlue_FOR_SYSTEM_SPINNER`, `claudeBlueShimmer_FOR_SYSTEM_SPINNER` - system spinner colors
4. `permission`, `permissionShimmer` - permission colors
5. `planMode`, `ide`, `promptBorder`, `promptBorderShimmer` - mode/border colors
6. `text`, `inverseText`, `inactive`, `inactiveShimmer` - text colors
7. `subtle`, `suggestion`, `remember`, `background` - semantic colors
8. `success`, `error`, `warning`, `merged`, `warningShimmer` - status colors
9. `diffAdded`, `diffRemoved`, `diffAddedDimmed`, `diffRemovedDimmed` - diff colors
10. `diffAddedWord`, `diffRemovedWord` - word-level diff highlighting
11. `red_FOR_SUBAGENTS_ONLY`, `blue_FOR_SUBAGENTS_ONLY`, etc. - agent colors
12. `professionalBlue` - Grove colors
13. `chromeYellow` - Chrome colors
14. `clawd_body`, `clawd_background`, `userMessageBackground`, `userMessageBackgroundHover` - TUI V2 colors
15. `messageActionsBackground` - message-actions selection (cool shift toward suggestion blue)
16. `selectionBg` - text-selection highlight background (alt-screen mouse selection)
17. Solid bg that REPLACES cell's bg while preserving fg - matches native terminal selection
18. Previously SGR-7 inverse (swapped fg/bg per cell), which fragmented badly over syntax highlighting
19. `bashMessageBackgroundColor` - bash message background color
20. `memoryBackgroundColor` - memory background color
21. `rate_limit_fill`, `rate_limit_empty` - rate limit colors
22. `fastMode`, `fastModeShimmer` - fast mode colors
23. `briefLabelYou`, `briefLabelClaude` - Brief/assistant mode label colors
24. `rainbow_red`, `rainbow_orange`, `rainbow_yellow`, `rainbow_green`, `rainbow_blue`, `rainbow_indigo` - ultrathink keyword highlighting colors
25. `getTheme` - gets current theme
26. `setTheme` - sets theme
27. `getSTYLERForTheme` - gets STYLER instance for theme
28. `env` - environment utilities

## Exports
- `Theme` - theme type
- `getTheme` - gets current theme
- `setTheme` - sets theme
- `getSTYLERForTheme` - gets STYLER instance for theme
- (Theme color constants)

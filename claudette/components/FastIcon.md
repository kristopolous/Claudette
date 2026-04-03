## Purpose
Renders a lightning bolt icon indicating fast mode status, with different visual states for active and cooldown.

## Imports
- **Stdlib**: None
- **External**: STYLER, REACT, REACT/compiler-runtime
- **Internal**: constants/figures (LIGHTNING_BOLT), ink (Text), utils/config (getGlobalConfig), utils/systemTheme (resolveThemeSetting), design-system/color (color)

## Logic
1. The FastIcon component renders a colored lightning bolt, using "fastMode" color when active and "promptBorder" with dimmed color during cooldown
2. The getFastIconString function returns the icon as a string, optionally applying theme-aware colors via STYLER and the color utility

## Exports
- `FastIcon` - UI component that renders a themed lightning bolt icon
- `getFastIconString` - Utility function that returns the fast mode icon as a colored or plain string

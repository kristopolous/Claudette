# systemTheme

## Purpose
Detects the terminal's dark/light theme for the 'auto' theme setting. Uses the terminal's actual background color (via OSC 11) rather than the OS appearance setting.

## Imports
- **Internal**: ./theme.js

## Logic
1. Initial detection falls back to `$COLORFGBG` env var (synchronous, set by some terminals at launch) — rxvt convention: bg 0–6 or 8 = dark, bg 7 or 9–15 = light
2. The async OSC 11 watcher calls `setCachedSystemTheme` to update the cache when the response arrives
3. `themeFromOscColor` parses OSC color responses in XParseColor format (`rgb:R/G/B` with 1–4 hex digits per component, or `#RRGGBB`/`#RRRRGGGGBBBB`)
4. Luminance calculated via ITU-R BT.709: `0.2126*r + 0.7152*g + 0.0722*b`; > 0.5 = light
5. `hexComponent` normalizes variable-length hex to [0, 1] range by dividing by `16^n - 1`

## Exports
- `SystemTheme` - type alias: `'dark' | 'light'`
- `getSystemThemeName()` - returns cached system theme; detects from `$COLORFGBG` on first call, defaults to `'dark'`
- `setCachedSystemTheme(theme)` - updates the cached theme (called by the OSC 11 watcher)
- `resolveThemeSetting(setting)` - resolves a `ThemeSetting` (which may be `'auto'`) to a concrete `ThemeName`
- `themeFromOscColor(data)` - parses an OSC color response string into `'dark'` or `'light'`; returns undefined for unrecognized formats

## Source
`systemTheme`

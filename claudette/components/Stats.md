## Purpose
Displays usage statistics including activity heatmaps, model breakdowns, token charts, and fun comparisons.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS (feature), asciichart, chalk, figures, REACT, REACT/compiler-runtime, strip-ansi
- **Internal**: ../commands (CommandResultDisplay), ./hooks/useTerminalSize (useTerminalSize), ./ink/colorize (applyColor), ./ink/stringWidth (stringWidth), ./ink/styles (Color), ./ink (Ansi, Box, Text, useInput), ./keybindings/useKeybinding (useKeybinding), ./utils/config (getGlobalConfig), ./utils/format (formatDuration, formatNumber), ./utils/heatmap (generateHeatmap), ./utils/model/model (renderModelName), ./utils/screenshotClipboard (copyAnsiToClipboard), ./utils/stats (aggregateClaudeCodeStatsForRange, ClaudeCodeStats, DailyModelTokens, StatsDateRange), ./utils/systemTheme (resolveThemeSetting), ./utils/theme (getTheme, themeColorToAnsi), ./design-system/Pane (Pane), ./design-system/Tabs (Tab, Tabs, useTabHeaderFocus), ./Spinner (Spinner)

## Logic
Loads all-time stats via a promise and uses React 19 use() for suspense. Supports date range filtering (7d, 30d, all) with a stats cache to avoid re-suspending. Displays an Overview tab with activity heatmap, favorite model, token counts, sessions, streaks, and shot distribution. Displays a Models tab with a token-per-day ASCII chart and scrollable model list. Handles keyboard navigation for tabs, date ranges, and model list scrolling. Supports screenshot export that renders stats to ANSI and copies to clipboard. Generates fun factoids comparing token usage to famous books and session durations to real-world activities.

## Exports
- `Stats` - Main stats component that loads data and renders the stats dialog with Overview and Models tabs

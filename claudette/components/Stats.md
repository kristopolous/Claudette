## Purpose
Displays usage statistics including activity heatmaps, model breakdowns, token charts, and fun comparisons.

## Imports
- **Stdlib**: none
- **External**: bun:bundle (feature), asciichart, chalk, figures, react, react/compiler-runtime, strip-ansi
- **Internal**: ../commands.js (CommandResultDisplay), ../hooks/useTerminalSize.js (useTerminalSize), ../ink/colorize.js (applyColor), ../ink/stringWidth.js (stringWidth), ../ink/styles.js (Color), ../ink.js (Ansi, Box, Text, useInput), ../keybindings/useKeybinding.js (useKeybinding), ../utils/config.js (getGlobalConfig), ../utils/format.js (formatDuration, formatNumber), ../utils/heatmap.js (generateHeatmap), ../utils/model/model.js (renderModelName), ../utils/screenshotClipboard.js (copyAnsiToClipboard), ../utils/stats.js (aggregateClaudeCodeStatsForRange, ClaudeCodeStats, DailyModelTokens, StatsDateRange), ../utils/systemTheme.js (resolveThemeSetting), ../utils/theme.js (getTheme, themeColorToAnsi), ./design-system/Pane.js (Pane), ./design-system/Tabs.js (Tab, Tabs, useTabHeaderFocus), ./Spinner.js (Spinner)

## Logic
Loads all-time stats via a promise and uses React 19 use() for suspense. Supports date range filtering (7d, 30d, all) with a stats cache to avoid re-suspending. Displays an Overview tab with activity heatmap, favorite model, token counts, sessions, streaks, and shot distribution. Displays a Models tab with a token-per-day ASCII chart and scrollable model list. Handles keyboard navigation for tabs, date ranges, and model list scrolling. Supports screenshot export that renders stats to ANSI and copies to clipboard. Generates fun factoids comparing token usage to famous books and session durations to real-world activities.

## Exports
- `Stats` - Main stats component that loads data and renders the stats dialog with Overview and Models tabs

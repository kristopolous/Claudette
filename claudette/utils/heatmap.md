# heatmap

## Purpose
Generates a GitHub-style contribution heatmap for terminal display, showing daily message activity over the past N weeks with intensity levels based on percentiles.

## Imports
- **External**: STYLER
- **Internal**: `./stats` (DailyActivity type), `./statsCache` (toDateString)

## Logic
1. **Percentile calculation** — extracts message counts from activity data, filters to non-zero days, sorts, and computes p25/p50/p75 thresholds for intensity mapping.
2. **Grid generation** — builds a 7×N grid (days of week × weeks). Width is capped at 52 weeks (1 year) and adapts to terminal width. Date range ends at today, starts N weeks back aligned to Sunday.
3. **Intensity mapping** — each cell's intensity (0-4) is determined by comparing the day's message count against percentiles: 0=none, 1=<p25, 2=<p50, 3=<p75, 4=≥p75.
4. **Rendering** — outputs month labels (evenly spaced), day labels (Mon/Wed/Fri only), grid cells using block characters (· ░ ▒ ▓ █) colored in Claude orange (#da7756), and a legend row.

## Exports
- `HeatmapOptions` — config type with optional `terminalWidth` (default 80) and `showMonthLabels` (default true).
- `generateHeatmap` — takes `DailyActivity[]` and options, returns a formatted string with the heatmap grid, labels, and legend.

## Purpose
Displays API usage statistics including session limits, weekly limits, and extra usage with progress bars for subscription plans.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `commands/extra-usage/index`, `cost-tracker`, `utils/auth`, `hooks/useTerminalSize`, `ink`, `keybindings/useKeybinding`, `services/api/usage`, `utils/format`, `utils/log`, `utils/slowOperations`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/ProgressBar`, `components/LogoV2/OverageCreditUpsell`

## Logic
Fetches utilization data on mount and displays rate limit bars for current session (5-hour), current week (all models), and current week (Sonnet only, for Max/Team plans). Each bar shows utilization percentage, progress bar, and reset time. An ExtraUsageSection displays extra usage credits for Pro/Max subscribers. Supports retry keybinding on error and shows a message when usage data is unavailable for the current plan.

## Exports
- `Usage` - UI component that renders usage statistics with progress bars for session and weekly rate limits

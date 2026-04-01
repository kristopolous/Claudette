## Purpose
Guides new users through initial setup including theme selection, authentication, API key approval, security notes, and terminal configuration.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `src/services/analytics/index`, `../commands/terminalSetup/terminalSetup`, `../hooks/useExitOnCtrlCDWithKeybindings`, `../ink`, `../keybindings/useKeybinding`, `../utils/auth`, `../utils/authPortable`, `../utils/config`, `../utils/env`, `../utils/envUtils`, `../utils/preflightChecks`, `../utils/theme`, `./ApproveApiKey`, `./ConsoleOAuthFlow`, `./CustomSelect/select`, `./LogoV2/WelcomeV2`, `./PressEnterToContinue`, `./ThemePicker`, `./ui/OrderedList`

## Logic
Manages a multi-step onboarding flow with conditional steps based on OAuth availability and API key status. Steps include preflight checks, theme selection, API key approval, OAuth authentication, security notes, and optional terminal setup. Tracks current step index, handles navigation between steps, logs analytics events, and manages exit-on-ctrl-c behavior.

## Exports
- `Onboarding` - orchestrates the complete new-user setup experience
- `SkippableStep` - wrapper that conditionally renders children based on skip flag

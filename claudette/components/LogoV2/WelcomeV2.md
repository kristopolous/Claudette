# components/LogoV2/WelcomeV2

## Purpose
Provides welcome screen component for Claudette startup display.

## Imports
- **Stdlib**: (none)
- **External**: `react`, `react/compiler-runtime`
- **Internal**: ink, env

## Logic
1. `WELCOME_V2_WIDTH` (58) - welcome screen width
2. `WelcomeV2` - React component for welcome screen
3. Uses React compiler runtime (_c) for memoization
4. Uses useTheme for theme
5. Checks env.terminal === "Apple_Terminal" for special handling
6. If Apple Terminal: renders AppleTerminalWelcomeV2 with theme
7. If light theme (light, light-daltonized, light-ansi): renders light theme welcome
8. Uses memoized Text components for ASCII art
9. Renders "Welcome to Claudette" with version
10. Renders Clawd ASCII art with block characters
11. If dark theme: renders dark theme welcome
12. Uses color="clawd_body" for Clawd body
13. Uses dimColor for background elements
14. `AppleTerminalWelcomeV2` - Apple Terminal specific welcome
15. Uses bg-fill trick for Apple Terminal compatibility
16. `env` - environment utilities
17. `useTheme` - gets current theme
18. `Box`, `Text` - ink components
19. `MACRO.VERSION` - version constant

## Exports
- `WelcomeV2` - welcome screen component

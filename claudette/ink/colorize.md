# ink/colorize

## Purpose
Provides color utilities for terminal text styling with chalk.

## Imports
- **Stdlib**: (none)
- **External**: `chalk`
- **Internal**: ink styles

## Logic
1. `boostChalkLevelForXtermJs` - boosts chalk level for xterm.js terminals
2. xterm.js (VS Code, Cursor, code-server, Coder) supports truecolor since 2017
3. code-server/Coder containers often don't set COLORTERM=truecolor
4. chalk's supports-color doesn't recognize TERM_PROGRAM=vscode
5. Falls through to -256color regex → level 2
6. At level 2, chalk.rgb() downgrades to nearest 6×6×6 cube color
7. Gated on level === 2 (not < 3) to respect NO_COLOR / FORCE_COLOR=0
8. Must run BEFORE tmux clamp
9. `clampChalkLevelForTmux` - clamps chalk level for tmux
10. tmux parses truecolor SGR correctly but client-side emitter only re-emits if outer terminal advertises Tc/RGB
11. Default tmux config doesn't set this
12. Clamping to level 2 makes chalk emit 256-color which tmux passes through cleanly
13. Users with `terminal-overrides ,*:Tc` get technically-unnecessary downgrade
14. $TMUX is pty-lifecycle env var set by tmux itself
15. `CHALK_BOOSTED_FOR_XTERMJS`, `CHALK_CLAMPED_FOR_TMUX` - exported flags
16. `ColorType` - 'foreground' | 'background'
17. `RGB_REGEX`, `ANSI_REGEX` - color regex patterns
18. `colorize` - applies color to string
19. Handles ansi: prefix for ANSI colors
20. `chalk` - chalk library
21. `Color`, `TextStyles` - style types

## Exports
- `ColorType` - color type
- `RGB_REGEX`, `ANSI_REGEX` - color regexes
- `colorize` - applies color
- `CHALK_BOOSTED_FOR_XTERMJS` - chalk boosted flag
- `CHALK_CLAMPED_FOR_TMUX` - chalk clamped flag

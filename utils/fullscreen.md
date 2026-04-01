# utils/fullscreen

## Purpose
Provides fullscreen mode detection and tmux control mode detection.

## Imports
- **Stdlib**: `child_process`
- **External**: (none)
- **Internal**: bootstrap state, debug, envUtils, execFileNoThrow

## Logic
1. `tmuxControlModeProbed` - cached result from tmux display-message probe
2. `isTmuxControlModeEnvHeuristic` - checks iTerm2 tmux integration mode
3. Checks TMUX env, TERM_PROGRAM='iTerm.app', TERM not screen-*/tmux-*
4. In -CC mode, iTerm2 renders tmux panes as native splits
5. TERM_PROGRAM stays iTerm.app, TERM stays xterm-* (not screen-*)
6. `probeTmuxControlModeSync` - sync probe via tmux display-message
7. Uses #{client_control_mode} to detect control mode
8. Sync (spawnSync) to avoid race with React render
9. ~5ms subprocess cost, only when TMUX set and TERM_PROGRAM unset
10. Caches result to avoid re-probing (15+ calls per render)
11. `isFullscreenEnvEnabled` - checks if fullscreen mode enabled
12. `isTmuxControlMode` - checks if in tmux control mode
13. `isTmuxCcDisabled` - checks if tmux -CC is disabled
14. `checkedTmuxMouseHint` - tracks if mouse hint checked
15. `loggedTmuxCcDisable` - tracks if tmux -CC disable logged

## Exports
- `isFullscreenEnvEnabled` - checks fullscreen mode
- `isTmuxControlMode` - checks tmux control mode
- `isTmuxCcDisabled` - checks tmux -CC disabled
- (Fullscreen detection functions)

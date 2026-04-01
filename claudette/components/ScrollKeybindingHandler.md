## Purpose
Handles keyboard and mouse scroll navigation for the fullscreen layout message scroll box with adaptive wheel acceleration.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `../context/notifications`, `../hooks/useCopyOnSelect`, `../ink/components/ScrollBox`, `../ink/hooks/use-selection`, `../ink/selection`, `../ink/terminal`, `../ink/termio/osc`, `../ink`, `../keybindings/useKeybinding`, `../utils/debug`

## Logic
Implements complex scroll handling including keyboard page/line navigation, mouse wheel acceleration with bounce detection for distinguishing mouse from trackpad, drag-to-scroll autoscroll with anchor tracking, selection management during scroll operations, and modal pager key support. Uses exponential decay curves for wheel acceleration tuned to different terminal types (native vs xterm.js). Handles selection translation during page jumps to keep highlights on correct content.

## Exports
- `ScrollKeybindingHandler` - component that manages all scroll-related keyboard and mouse interactions
- `shouldClearSelectionOnKey` - determines if a keypress should clear text selection
- `selectionFocusMoveForKey` - maps a keypress to a selection focus move for keyboard extension
- `computeWheelStep` - calculates rows to scroll for one wheel event with acceleration
- `readScrollSpeedBase` - reads CLAUDE_CODE_SCROLL_SPEED environment variable
- `initWheelAccel` - creates initial wheel acceleration state
- `dragScrollDirection` - computes autoscroll direction for a drag selection
- `jumpBy` - scrolls by a delta amount and returns sticky state
- `scrollUp` - scrolls up with boundary clamping
- `modalPagerAction` - maps keystrokes to modal pager actions
- `applyModalPagerAction` - applies a modal pager action to a ScrollBox

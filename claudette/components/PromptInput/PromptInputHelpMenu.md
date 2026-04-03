## Purpose
Renders a help menu displaying available keyboard shortcuts and input mode hints for the prompt input.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, REACT, REACT_COMPILER
- **Internal**: `ink`, `utils/platform`, `keybindings/loadUserBindings`, `keybindings/useShortcutDisplay`, `services/analytics/growthbook`, `utils/fastMode`, `utils`

## Logic
1. Fetches display strings for all relevant keyboard shortcuts using useShortcutDisplay
2. Formats shortcut strings by replacing "+" with " + " for readability
3. Renders three columns of hints: input mode symbols (bash, commands, files, background, side questions), keyboard shortcuts (transcript, todos, undo, stash, cycle mode, model picker, fast mode, external editor, image paste), and utility hints (clear input, suspend, customize keybindings)
4. Conditionally shows terminal panel shortcut based on feature flag
5. Conditionally shows fast mode shortcut based on availability and enabled state
6. Conditionally shows ctrl+z suspend hint on non-Windows platforms
7. Conditionally shows keybinding customization hint when enabled
8. Supports dimColor, fixedWidth, gap, and paddingX props for layout customization

## Exports
- `PromptInputHelpMenu` - component that renders keyboard shortcut hints organized in three columns

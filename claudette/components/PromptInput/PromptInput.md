## Purpose
Main prompt input component that handles text entry, mode switching, suggestions, history navigation, image/text pasting, keybindings, and renders the complete input UI with footer.

## Imports
- **Stdlib**: `path`
- **External**: BUILDFLAGS, `chalk`, REACT, `strip-ansi`
- **Internal**: Extensive imports including `context/notifications`, `hooks/*`, `state/AppState`, `ink`, `keybindings/*`, `utils/*`, `commands/*`, `services/*`, `tasks/*`, `tools/*`, `types/*`, and sibling PromptInput components

## Logic
1. Manages input state including cursor position, mode (prompt/bash), vim mode, and pasted contents (images and text)
2. Handles text input changes with mode detection from leading characters (! for bash)
3. Processes image and text pastes with truncation for large content and reference-based storage
4. Manages suggestion system via useTypeahead for command/file/agent autocompletion
5. Handles prompt suggestions from forked agents with acceptance tracking and speculation support
6. Implements history navigation with arrow keys and search mode
7. Registers keybindings for undo, newline, external editor, stash, model picker, thinking toggle, mode cycling, image paste, and fast mode
8. Manages footer pill navigation for tasks, teams, bridge, tmux, and companion indicators
9. Handles text highlighting for commands, mentions, thinking triggers, ultraplan/ultrareview keywords, buddy triggers, token budgets, Slack channels, and image references
10. Routes input to viewed agents in teammate mode or processes as leader submission
11. Renders dialogs for model picker, fast mode, thinking toggle, teams, bridge, background tasks, quick open, global search, and history picker
12. Composes the full UI: queued commands, stash notice, mode indicator, text input, footer with suggestions/notifications/help menu
13. Supports fullscreen mode with absolute-positioned notifications and portal dialogs

## Exports
- `default` - memoized PromptInput component accepting extensive props for input state, callbacks, agent/team context, and UI configuration

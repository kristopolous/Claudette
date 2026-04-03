## Purpose
Step component for selecting the target repository when installing GitHub App.

## Imports
- **External**: REACT
- **Internal**: `TextInput`, `useTerminalSize`, `Box`, `Text`, `useKeybindings`

## Logic
Provides a form to input repository URL/name, with option to use the current repository if detected. Validates input on submit (non-empty). Shows error if empty. Handles toggling between current repo and custom input. Navigates with keybindings.

## Exports
- `ChooseRepoStep` - UI component (props: currentRepo, useCurrentRepo, repoUrl, onRepoUrlChange, onToggleUseCurrentRepo, onSubmit)

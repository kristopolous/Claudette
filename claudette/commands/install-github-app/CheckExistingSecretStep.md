## Purpose
Step component for handling existing secret when installing GitHub App.

## Imports
- **External**: REACT
- **Internal**: `TextInput`, `useTerminalSize`, `Box`, `color`, `Text`, `useKeybindings`

## Logic
Allows user to decide whether to use an existing ANTHROPIC_API_KEY secret in the repository or create a new secret with a custom name. Toggles between two states: using existing secret (skips input) or entering a new secret name (alphanumeric with underscores). Shows validation and handles submission.

## Exports
- `CheckExistingSecretStep` - UI component (props: useExistingSecret, secretName, onToggleUseExistingSecret, onSecretNameChange, onSubmit)

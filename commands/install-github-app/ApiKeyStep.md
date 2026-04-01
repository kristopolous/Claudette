## Purpose
Step component for choosing API key authentication method during GitHub App installation.

## Imports
- **External**: `react`
- **Internal**: `TextInput`, `useTerminalSize`, `Box`, `color`, `Text`, `useTheme`, `useKeybindings`

## Logic
Renders a selection UI with three options: use existing ANTHROPIC_API_KEY, create a new API key, or create OAuth token (if available). Manages selection state, handles key navigation (↑/↓, Enter), and conditionally shows a masked text input for entering a new API key. Integrates into the multi-step install flow.

## Exports
- `ApiKeyStep` - React component (props: existingApiKey, useExistingKey, apiKeyOrOAuthToken, onApiKeyChange, onToggleUseExistingKey, onSubmit, onCreateOAuthToken?, selectedOption?, onSelectOption?)

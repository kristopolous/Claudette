## Purpose
Provides a wizard step for entering the agent system prompt.

## Imports
- **External**: REACT, REACT/compiler-runtime, useCallback, useState
- **Internal**: ink (Box, Text),keybindings/useKeybinding,utils/promptEditor (editPromptInEditor),ConfigurableShortcutHint, designsystem/Byline, designsystem/KeyboardShortcutHint,TextInput, wizard/index (useWizard), wizard/WizardDialogLayout, types (AgentWizardData type)

## Logic
Renders a multi-line text input for the system prompt with validation requiring non-empty input. Supports external editor integration via keybinding. Trims input, validates, updates wizard data, and advances on submit. Displays a hint to be comprehensive for best results.

## Exports
- `PromptStep` - renders a system prompt input step with validation and external editor support

### Helpful Prompt Templates

_No prompt templates found in this file. It is a React UI component for the agent creation wizard._

### Helpful Prompt Templates

_No prompt templates found in this file. It is a React UI component for the agent creation wizard._

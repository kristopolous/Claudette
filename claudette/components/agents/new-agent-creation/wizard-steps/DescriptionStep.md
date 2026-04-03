## Purpose
Provides a wizard step for entering the agent description that tells the inference provider when to use the agent.

## Imports
- **External**: REACT, REACT/compiler-runtime, useCallback, useState
- **Internal**: ink (Box, Text),keybindings/useKeybinding,utils/promptEditor (editPromptInEditor),ConfigurableShortcutHint, designsystem/Byline, designsystem/KeyboardShortcutHint,TextInput, wizard/index (useWizard), wizard/WizardDialogLayout, types (AgentWizardData type)

## Logic
Renders a text input for the "when to use" description with validation requiring non-empty input. Supports external editor integration via keybinding. Trims input, validates, updates wizard data, and advances on submit.

## Exports
- `DescriptionStep` - renders a description input step with validation and external editor support

## Purpose
Provides a wizard step for entering the agent type identifier.

## Imports
- **External**: react, react/compiler-runtime, useState
- **Internal**: ink (Box, Text), keybindings/useKeybinding, tools/AgentTool/loadAgentsDir (AgentDefinition type), ConfigurableShortcutHint, design-system/Byline, design-system/KeyboardShortcutHint, TextInput, wizard/index (useWizard), wizard/WizardDialogLayout, validateAgent (validateAgentType), types (AgentWizardData type)

## Logic
Renders a text input for the agent type identifier with validation against naming rules (alphanumeric with hyphens, 3-50 characters). Validates input, checks for duplicates against existing agents, updates wizard data, and advances on submit.

## Exports
- `TypeStep` - renders an agent type identifier input step with validation
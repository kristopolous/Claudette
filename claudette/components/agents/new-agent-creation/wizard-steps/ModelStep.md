## Purpose
Provides a wizard step for selecting the inference model for an agent.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ConfigurableShortcutHint, design-system/Byline, design-system/KeyboardShortcutHint, wizard/index (useWizard), wizard/WizardDialogLayout, ModelSelector, types (AgentWizardData type)

## Logic
Wraps the ModelSelector component in a wizard dialog layout. Updates wizard data with the selected model and advances to the next step upon completion.

## Exports
- `ModelStep` - renders a model selection step using ModelSelector
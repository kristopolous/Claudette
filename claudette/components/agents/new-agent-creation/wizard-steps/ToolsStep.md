## Purpose
Provides a wizard step for selecting which tools the agent should have access to.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: Tool (Tools type),ConfigurableShortcutHint, designsystem/Byline, designsystem/KeyboardShortcutHint,wizard/index (useWizard), wizard/WizardDialogLayout, ToolSelector, types (AgentWizardData type)

## Logic
Wraps the ToolSelector component in a wizard dialog layout. Passes through the initial tools selection from wizard data to preserve the "all tools" semantic. Updates wizard data with selected tools and advances on completion.

## Exports
- `ToolsStep` - renders a tool selection step using ToolSelector

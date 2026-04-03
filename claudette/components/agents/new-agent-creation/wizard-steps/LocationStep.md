## Purpose
Provides a wizard step for choosing where the agent configuration will be stored.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink (Box),utils/settings/constants (SettingSource type),ConfigurableShortcutHint,CustomSelect/select (Select), designsystem/Byline, designsystem/KeyboardShortcutHint, wizard/index (useWizard), wizard/WizardDialogLayout, types (AgentWizardData type)

## Logic
Presents two location options: project (.claude/agents/) or personal (~/.claude/agents/). Updates wizard data with the selected location source and advances to the next step.

## Exports
- `LocationStep` - renders a storage location selection step

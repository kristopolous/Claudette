## Purpose
Provides a wizard step for selecting the agent background color.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink (Box),keybindings/useKeybinding,tools/AgentTool/agentColorManager (AgentColorName type),ConfigurableShortcutHint, designsystem/Byline, designsystem/KeyboardShortcutHint,wizard/index (useWizard), wizard/WizardDialogLayout, ColorPicker, types (AgentWizardData type)

## Logic
Wraps the ColorPicker component in a wizard dialog layout. On color selection, assembles the final agent definition from all accumulated wizard data and updates the wizard state before advancing.

## Exports
- `ColorStep` - renders a color selection step that finalizes the agent definition

## Purpose
Provides a wizard step for configuring agent memory scope and persistence.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink (Box), keybindings/useKeybinding, memdir/paths (isAutoMemoryEnabled), tools/AgentTool/agentMemory (AgentMemoryScope type, loadAgentMemoryPrompt), ConfigurableShortcutHint, CustomSelect/select, design-system/Byline, design-system/KeyboardShortcutHint, wizard/index (useWizard), wizard/WizardDialogLayout, types (AgentWizardData type)

## Logic
Presents memory scope options (user, project, local, none) with different ordering based on whether the agent is user-scoped or project-scoped. Updates wizard data with the selected memory and composes the system prompt with memory instructions when applicable.

## Exports
- `MemoryStep` - renders a memory configuration step with scope selection
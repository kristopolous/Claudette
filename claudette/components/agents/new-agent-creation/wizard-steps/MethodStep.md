## Purpose
Provides a wizard step for choosing between AI-generated and manual agent creation methods.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink (Box), ConfigurableShortcutHint, CustomSelect/select (Select), design-system/Byline, design-system/KeyboardShortcutHint, wizard/index (useWizard), wizard/WizardDialogLayout, types (AgentWizardData type)

## Logic
Presents two creation method options: generate with inference provider (recommended) or manual configuration. Selecting generate advances to the generation step; selecting manual skips ahead to the manual configuration flow at step 3.

## Exports
- `MethodStep` - renders a creation method selection step
## Purpose
Renders a wizard step inside a dialog with navigation footer, step counter, and themed styling.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `utils/theme`, `components/design-system/Dialog`, `components/wizard/useWizard`, `components/wizard/WizardNavigationFooter`

## Logic
1. Consumes wizard context via useWizard hook to access current step index, total steps, title, and step counter visibility
2. Computes the dialog title with optional step counter suffix (e.g. "Wizard (1/3)")
3. Renders a Dialog component with the computed title, subtitle, cancel handler, and color theme
4. Renders a WizardNavigationFooter below the dialog with optional custom instructions

## Exports
- `WizardDialogLayout` - Component that wraps wizard step content in a themed dialog with navigation footer

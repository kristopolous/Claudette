## Purpose
Provides a UI context provider that manages wizard state including step navigation, data sharing between steps, and completion/cancellation callbacks.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `hooks/useExitOnCtrlCDWithKeybindings`, `components/wizard/types`

## Logic
1. Creates a UI context for sharing wizard state across step components
2. Manages state for current step index, wizard data, completion status, and navigation history
3. Provides navigation functions (goNext, goBack, goToStep, cancel) with history tracking
4. Calls onComplete callback with accumulated wizard data when all steps are finished
5. Renders the current step component or provided children within the context provider

## Exports
- `WizardContext` - UI context holding the wizard state value
- `WizardProvider` - Provider component that manages wizard state and renders step components

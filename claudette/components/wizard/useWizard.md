## Purpose
Provides a typed hook for consuming the wizard context, ensuring useWizard is called within a WizardProvider.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `components/wizard/types`, `components/wizard/WizardProvider`

## Logic
1. Consumes the WizardContext via React.useContext
2. Throws an error if called outside of a WizardProvider to enforce correct usage
3. Returns the typed context value containing wizard state and navigation functions

## Exports
- `useWizard` - Generic hook that returns the wizard context value with proper typing

## Purpose
Displays an onboarding dialog for IDE integration, highlighting key features and extension installation status.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `utils/envDynamic`, `ink`, `keybindings/useKeybinding`, `utils/config`, `utils/env`, `utils/ide`, `components/design-system/Dialog`

## Logic
1. Detects the IDE type and determines whether it is a JetBrains-based IDE
2. Displays the IDE name, installed extension/plugin version, and a list of key features (open files context, selected lines context, diff review in IDE, quick launch, file/line referencing)
3. Registers keybindings to dismiss the dialog on Enter or Escape
4. Marks the dialog as shown in global config, keyed by terminal type, to avoid showing it again

## Exports
- `IdeOnboardingDialog` - UI component that renders the IDE onboarding experience with feature highlights and installation status
- `hasIdeOnboardingDialogBeenShown` - returns true if the onboarding dialog has already been shown for the current terminal

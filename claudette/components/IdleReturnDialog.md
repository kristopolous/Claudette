## Purpose
Displays a dialog when the user returns after being idle, offering options to continue, clear context, or dismiss the prompt.

## Imports
- **Stdlib**: None
- **External**: react, react/compiler-runtime
- **Internal**: ink (Box, Text), utils/format (formatTokens), CustomSelect/index (Select), design-system/Dialog (Dialog)

## Logic
1. Formats the idle duration into a human-readable string (minutes or hours+minutes)
2. Formats the total input tokens using the formatTokens utility
3. Renders a Dialog with the idle message, a hint about clearing context for new tasks, and a Select component with options to continue, clear, dismiss, or never ask again

## Exports
- `IdleReturnDialog` - React component that shows an idle return dialog with action options

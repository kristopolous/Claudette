## Purpose
Shows a warning dialog when session spending reaches $5 on the inference provider API.

## Imports
- **Stdlib**: none
- **External**: react (React)
- **Internal**: ../ink.js (Box, Link, Text), ./CustomSelect/index.js (Select), ./design-system/Dialog.js (Dialog)

## Logic
Renders a Dialog with a title indicating the $5 spending threshold, a link to cost monitoring documentation, and a Select component with a single "Got it, thanks!" option that triggers the onDone callback when selected.

## Exports
- `CostThresholdDialog` - displays a cost threshold warning dialog with documentation link and dismissal option

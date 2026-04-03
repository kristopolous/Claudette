## Purpose
Shows a warning dialog when session spending reaches $5 on the inference provider API.

## Imports
- **Stdlib**: none
- **External**: REACT (React)
- **Internal**: ../ink (Box, Link, Text), ./CustomSelect/index (Select), ./design-system/Dialog (Dialog)

## Logic
Renders a Dialog with a title indicating the $5 spending threshold, a link to cost monitoring documentation, and a Select component with a single "Got it, thanks!" option that triggers the onDone callback when selected.

## Exports
- `CostThresholdDialog` - displays a cost threshold warning dialog with documentation link and dismissal option

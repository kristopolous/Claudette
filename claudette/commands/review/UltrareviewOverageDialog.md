## Purpose
Modal dialog for confirming extra usage billing before launching ultrareview.

## Imports
- **External**: React
- **Internal**: Dialog component, Select custom dropdown

## Logic
Shows warning about free reviews exhausted and that further reviews bill as Extra Usage. Provides two options:
- "Proceed with Extra Usage billing" - confirms and launches review
- "Cancel" - aborts

Manages abort controller to cancel launch if user escapes during the ~5s startup. Uses Select component for choice.

## Exports
- `UltrareviewOverageDialog` - Dialog component for billing confirmation

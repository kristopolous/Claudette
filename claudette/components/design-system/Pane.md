## Purpose
A bordered region of the terminal that appears below the REPL prompt, used by slash-command screens with a colored top divider line.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `useIsInsideModal`, `Box`, `Theme`, `Divider`

## Logic
When rendered inside a modal, skips the divider to avoid double-framing. Otherwise renders a colored `Divider` above the children with padding. Adjusts paddingX based on context.

## Exports
- `Pane` - renders a content region with an optional colored top border divider

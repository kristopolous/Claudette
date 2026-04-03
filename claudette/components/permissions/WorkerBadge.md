## Purpose
Renders a colored badge showing the worker's name for permission prompts to indicate which swarm worker is requesting the permission.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `constants/figures`, `ink`, `utils/ink`

## Logic
Converts a color string to an ink color and renders a row containing a black circle icon followed by the worker's name prefixed with "@" in bold, all styled with the provided color.

## Exports
- `WorkerBadge` - renders a colored badge with a circle icon and the worker's name
- `WorkerBadgeProps` - type defining the name and color props for the badge component

## Purpose
Displays a badge showing a pull request number with color-coded review status and a clickable link.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `../ink`, `../utils/ghPrStatus`

## Logic
Maps the PR review state (approved, changes_requested, pending, merged) to a color. Renders a "PR" label followed by a clickable link containing the PR number, with styling based on review status and bold flag.

## Exports
- `PrBadge` - renders a color-coded pull request badge with link

## Purpose
Renders a horizontal tab bar for project tags with overflow handling and truncation within available width.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `ink`, `stringWidth`, `truncateToWidth`

## Logic
1. Calculates width for each tab accounting for padding, hash prefix, and truncation limits
2. Determines a window of visible tabs centered around the selected index that fits within available width
3. Expands the window outward from the selected tab, alternating left and right expansion
4. Displays overflow indicators with counts for hidden tabs on either side
5. Truncates long tag names to fit within per-tab max width constraints
6. Renders resume label, left overflow arrow, visible tabs with selection highlighting, and right overflow hint

## Exports
- `TagTabs` - renders a tab bar with overflow navigation, selection highlighting, and width-aware truncation

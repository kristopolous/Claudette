## Purpose
Displays a read-only list of configured hooks for a given event and matcher pair, allowing users to select and view hook details.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: entrypoints/agentSdkTypes, utils/hooks/hooksConfigManager, utils/hooks/hooksSettings, ink, components/CustomSelect/select, components/design-system/Dialog

## Logic
1. Constructs a title from the selected event and optional matcher
2. Shows a "no hooks configured" message with guidance when the hooks list is empty
3. Maps each hook config to a select option with label, value, and source description
4. Renders a Select component for hook navigation within a Dialog wrapper

## Exports
- `SelectHookMode` - renders a selectable list of hooks for a specific event-matcher combination in read-only mode

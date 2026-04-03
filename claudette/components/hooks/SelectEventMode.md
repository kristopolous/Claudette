## Purpose
Serves as the entry point of the hooks configuration menu, displaying a list of available hook events for browsing.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime, figures
- **Internal**: entrypoints/agentSdkTypes, utils/hooks/hooksConfigManager, utils/stringUtils, ink, components/CustomSelect/select, components/design-system/Dialog

## Logic
1. Computes a subtitle showing the total configured hook count
2. Displays a policy restriction warning when hooks are limited to managed settings only
3. Shows a read-only notice with a link to documentation
4. Maps hook events to Select options, displaying event names with hook counts and metadata summaries
5. Renders events in a Select component within a Dialog wrapper

## Exports
- `SelectEventMode` - renders the initial event selection screen for the read-only hooks configuration menu

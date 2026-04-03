## Purpose
Displays a list of configured matchers for a selected hook event, allowing users to drill into each matcher's hooks.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: entrypoints/agentSdkTypes, ink, utils/hooks/hooksSettings, utils/stringUtils, components/CustomSelect/select, components/design-system/Dialog

## Logic
1. Enriches each matcher with its hook sources and hook count by looking up hooks in the grouped data
2. Shows a "no hooks configured" message when there are no matchers for the event
3. Maps matchers to Select options with source labels, matcher names, and hook count descriptions
4. Renders a Select component for matcher navigation within a Dialog wrapper

## Exports
- `SelectMatcherMode` - renders a selectable list of matchers for a specific hook event in read-only mode

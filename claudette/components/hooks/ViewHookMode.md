## Purpose
Displays read-only details for a single configured hook, including event, matcher, type, source, and content.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink, utils/hooks/hooksSettings, components/design-system/Dialog

## Logic
1. Renders hook metadata fields: event, matcher (conditional), type, source, and optional plugin name
2. Determines the content field label and value based on hook type (command, prompt, agent, http)
3. Displays the hook content in a bordered box
4. Shows optional status message if present
5. Includes a note directing users to editsettingson or ask the inference provider for modifications

## Exports
- `ViewHookMode` - renders a read-only detail view for a single hook configuration

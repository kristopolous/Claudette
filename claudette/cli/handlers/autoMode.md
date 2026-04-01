# autoMode

## Purpose
Implements auto mode classifier subcommands for dumping default/merged rules and critiquing user-written rules.

## Imports
- **Stdlib**: `process`
- **External**: (none)
- **Internal**: error utils, model utils, yoloClassifier, settings, sideQuery, JSON utils

## Logic
1. `autoModeDefaultsHandler` - dumps default external auto mode rules as JSON
2. `autoModeConfigHandler` - dumps effective config (user settings merged with defaults)
3. Per-section REPLACE semantics - non-empty user section replaces defaults entirely
4. `autoModeCritiqueHandler` - uses side query to LLM-critique user rules
5. Checks for clarity, completeness, conflicts, and actionability
6. Returns early if no custom rules found
7. Formats rules summary for critique prompt

## Exports
- `autoModeDefaultsHandler` - prints default auto mode rules
- `autoModeConfigHandler` - prints effective merged config
- `autoModeCritiqueHandler` - critiques user rules via LLM side query

## Purpose
UI component for rendering TeamCreate tool use message.

## Imports
- **Stdlib**: REACT
- **Internal**: `Input` type from TeamCreateTool

## Logic
Exports `renderToolUseMessage(input)`: Returns a string `create team: {input.team_name}` showing the team name being created. If input missing or no team_name, likely returns null or string with undefined; function expects `team_name` field.

Simple one-line summary used in the UI to indicate team creation action.

## Exports
- `renderToolUseMessage(input)`

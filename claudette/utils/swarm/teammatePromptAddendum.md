# teammatePromptAddendum

## Purpose
Defines a system prompt addendum appended to the full main agent system prompt for teammates. Explains visibility constraints and communication requirements for agent team members.

## Imports
- None (dependency-free constant)

## Logic
Exports a template literal string that instructs teammate agents:
- They must use the `SendMessage` tool to communicate (plain text responses are not visible to others).
- Use `to: "<name>"` for direct messages or `to: "*"` sparingly for team-wide broadcasts.
- The user interacts primarily with the team lead; teammates coordinate through the task system and messaging.

## Exports
- `TEAMMATE_SYSTEM_PROMPT_ADDENDUM` — string constant containing the teammate communication instructions

## Source
`teammatePromptAddendum`

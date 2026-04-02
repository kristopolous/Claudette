# skillLoadedEvent

## Purpose
Emits a `tengu_skill_loaded` analytics event for each prompt-type skill available at session startup, enabling analytics on skill availability across sessions.

## Imports
- **Internal**: ../../commands, ../../services/analytics/index, ../../tools/SkillTool/prompt

## Logic
1. Fetches all skill tool commands via `getSkillToolCommands(cwd)`.
2. Computes the skill character budget from the context window size via `getCharBudget(contextWindowTokens)`.
3. For each skill of type `'prompt'`, emits a `tengu_skill_loaded` event with:
   - `_PROTO_skill_name` (PII-tagged, routes to privileged BQ column)
   - `skill_source` and `skill_loaded_from` (origin metadata)
   - `skill_budget` (character budget for the session)
   - `skill_kind` (if present)
4. Non-prompt skills are skipped.

## Exports
- `logSkillsLoaded(cwd, contextWindowTokens)` - async function that emits `tengu_skill_loaded` events for all available prompt-type skills

## Source
`skillLoadedEvent`

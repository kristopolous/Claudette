## Purpose
Generates the system prompt and manages context budgeting for the Skill tool that discovers and invokes available skills.

## Imports
- **Stdlib**: `Math`, `Number`, `process.env`, `Set`, `Promise`
- **External**: `lodash-es`
- **Internal**: `Command`, `getCommandName`, `getSkillToolCommands`, `getSlashCommandToolSkills`, `COMMAND_NAME_TAG`, `stringWidth`, `logEvent`, `count`, `logForDebugging`, `toError`, `truncate`, `logError`

## Logic
Calculates a character budget (1% of context window) for listing skills, then formats command descriptions within that budget. Bundled skills always get full descriptions while non-bundled ones may be truncated or reduced to names-only under tight budgets. The main prompt instructs the model to check for matching skills before performing tasks, with rules about invocation order and duplicate prevention. Analytics events log truncation behavior.

## Exports
- `SKILL_BUDGET_CONTEXT_PERCENT` - percentage of context window allocated to skill listings (0.01)
- `CHARS_PER_TOKEN` - estimated characters per token (4)
- `DEFAULT_CHAR_BUDGET` - fallback character budget (8000)
- `MAX_LISTING_DESC_CHARS` - per-entry description hard cap (250)
- `getCharBudget` - calculates character budget from context window tokens or environment override
- `formatCommandsWithinBudget` - formats command descriptions to fit within the character budget
- `getPrompt` - memoized function returning the Skill tool system prompt
- `getSkillToolInfo` - returns total and included command counts
- `getLimitedSkillToolCommands` - returns commands included in the Skill tool prompt
- `clearPromptCache` - clears the memoized prompt cache
- `getSkillInfo` - returns total and included skill counts with error handling

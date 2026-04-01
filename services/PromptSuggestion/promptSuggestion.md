# PromptSuggestion/promptSuggestion

## Purpose
Implements prompt suggestion feature that generates suggested next prompts for users.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, AppState, message types, agentSwarmsEnabled, array utils, envUtils, errors, forkedAgent, hooks, log, messages, settings, teammate, growthbook, analytics, claudeAiLimits, PromptSuggestion speculation

## Logic
1. `PromptVariant` - type: user_intent, stated_intent
2. `getPromptVariant` - returns current prompt variant (default: user_intent)
3. `shouldEnablePromptSuggestion` - checks if feature should be enabled
4. Env var overrides: CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION (falsy/truthy)
5. GrowthBook gate: tengu_chomp_inflection (default false)
6. Disabled in non-interactive mode (print mode, piped input, SDK)
7. Disabled for swarm teammates (only leader shows suggestions)
8. `currentAbortController` - tracks current suggestion generation for cancellation
9. Uses forked agent pattern for suggestion generation
10. Integrates with speculation feature for predictive suggestions
11. Logs analytics events for enablement and usage tracking

## Exports
- `PromptVariant` - prompt variant type
- `getPromptVariant` - gets current prompt variant
- `shouldEnablePromptSuggestion` - checks if suggestion enabled
- (Prompt suggestion generation functions)

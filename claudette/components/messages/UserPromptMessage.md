## Purpose
Renders user prompt messages with text truncation for large inputs and optional brief layout mode.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk, BUILDFLAGS
- **Internal**: ink (Box), HighlightedThinkingText, messageActions, appState, bootstrap state, growthbook analytics, envUtils utils, log utils, stringUtils utils

## Logic
1. Determines brief layout mode based on feature flags (KAIROS, KAIROS_BRIEF), environment, and app state
2. Truncates display text to 10,000 characters max using head/tail approach (2,500 chars from each end) with hidden line count
3. Logs error if text is empty
4. In brief layout: renders with "You" label and optional timestamp, no background color
5. In normal layout: renders with HighlightedThinkingText and user message background

## Exports
- `UserPromptMessage` - React component rendering user prompts with truncation and brief mode support

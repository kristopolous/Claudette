# EnterPlanModeTool/prompt.ts

## Purpose

Exports a function `getEnterPlanModeToolPrompt()` that returns the prompt/instructions for the EnterPlanModeTool. Provides two variants: "external" (general users) and "ant" (Ant design team), selected via `USER_TYPE` environment variable. Guides the AI on when to enter plan mode for implementation planning.

## Imports

- **Stdlib**: `process` (for environment variable)
- **External**: None
- **Internal**:
  - Utilities: `isPlanModeInterviewPhaseEnabled` (from planModeV2)
  - Constants: `ASK_USER_QUESTION_TOOL_NAME` (from AskUserQuestionTool prompt)

## Logic

- **`WHAT_HAPPENS_SECTION`**: Reusable string describing the 6 steps that occur during plan mode (exploration, understanding, design, presentation, clarifying questions, exit)
- **`getEnterPlanModeToolPromptExternal(): string`**:
  - Returns prompt for general users
  - Emphasizes proactive use for non-trivial implementation tasks
  - Provides 7 detailed conditions when to use (new features, multiple approaches, code modifications, architectural decisions, multi-file changes, unclear requirements, user preferences matter)
  - Lists when NOT to use (simple fixes, single functions, detailed instructions, pure research)
  - Includes the "What Happens" section conditionally (omitted if interview phase enabled)
  - Contains GOOD/BAD examples
- **`getEnterPlanModeToolPromptAnt(): string`**:
  - Returns prompt for Ant design team (more conservative)
  - Focuses on "genuine ambiguity" and "high-impact restructuring"
  - More restrictive conditions (architectural ambiguity, unclear requirements, high-impact restructuring)
  - Skips plan mode when implementation path is clear; encourages using `AskUserQuestion` for specific questions instead
- **`getEnterPlanModeToolPrompt(): string`**:
  - Main export function
  - Checks `process.env.USER_TYPE === 'ant'` and returns appropriate variant
  - Omits "What Happens" section when `isPlanModeInterviewPhaseEnabled()` is true (detailed workflow delivered via attachment)

## Exports

- `getEnterPlanModeToolPrompt(): string`

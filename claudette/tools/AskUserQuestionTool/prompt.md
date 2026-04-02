# AskUserQuestionTool/prompt.ts

## Purpose

Provides prompt text and constants for the AskUserQuestion tool, which gathers user preferences through multiple-choice questions.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: `EXIT_PLAN_MODE_TOOL_NAME` (to reference in usage notes)

## Logic

This module exports a collection of constants used by the AskUserQuestion tool:
- `ASK_USER_QUESTION_TOOL_NAME`: tool identifier
- `ASK_USER_QUESTION_TOOL_CHIP_WIDTH`: UI width (12 characters)
- `DESCRIPTION`: tool's purpose statement
- `PREVIEW_FEATURE_PROMPT`: markdown and HTML explanations of the optional `preview` field for visual comparisons (ASCII/HTML mockups, code snippets, diagrams); includes layout notes and single-select limitation
- `ASK_USER_QUESTION_TOOL_PROMPT`: usage instructions covering multi-select, recommendation labeling, and a plan-mode note clarifying when to use this vs `ExitPlanModeTool`

## Exports

- `ASK_USER_QUESTION_TOOL_NAME: string`
- `ASK_USER_QUESTION_TOOL_CHIP_WIDTH: number`
- `DESCRIPTION: string`
- `PREVIEW_FEATURE_PROMPT: { markdown: string; html: string }`
- `ASK_USER_QUESTION_TOOL_PROMPT: string`

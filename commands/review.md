## Purpose
Review a pull request by analyzing its diff and providing code review feedback.

## Imports
- **External**: None
- **Internal**: None (simple prompt command)

## Logic
1. Takes optional PR number as argument
2. Generates prompt instructing Claude to:
   - List PRs if no number provided
   - View PR details if number provided
   - Get diff with gh pr diff
   - Analyze code quality, style, improvements, issues, risks
   - Focus on correctness, conventions, performance, tests, security
   - Format review with clear sections and bullet points
3. Command type: 'prompt' (delegates to Claude for actual review)
4. Simple implementation with static LOCAL_REVIEW_PROMPT template

## Exports
- `review` - default export, prompt Command
- `ultrareview` - separate local-jsx command for remote advanced review (CCR)

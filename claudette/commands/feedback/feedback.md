## Purpose
Submit feedback about Claudette (bug reports, suggestions).

## Imports
- **External**: React
- **Internal**: Feedback component, types (CommandResultDisplay, LocalJSXCommandContext, Message), renderFeedbackComponent helper

## Logic
1. Local-jsx command that renders Feedback component
2. Feedback form allows users to:
   - Provide description of issue/suggestion
   - Include conversation context
   - Possibly attach background task information
3. `renderFeedbackComponent` helper:
   - Takes onDone, abortSignal, messages, initialDescription, backgroundTasks
   - Returns Feedback UI component
4. `call` function: extracts optional args as initialDescription, renders feedback component
5. Command is disabled/excluded in various scenarios:
   - Bedrock/Vertex/Foundry deployments
   - DISABLE_FEEDBACK_COMMAND or DISABLE_BUG_COMMAND env set
   - Essential traffic only mode
   - Ant users
   - Policy disallows product feedback (isPolicyAllowed('allow_product_feedback'))
6. Aliases: ['bug']
7. Argument hint: '[report]' (prefill description)

## Exports
- `call` - async LocalJSXCommandCall returning Feedback component
- `renderFeedbackComponent` - helper for embedding feedback UI

## Purpose
Renders a successful tool use result with optional classifier approval indicators and post-tool-use hooks.

## Imports
- **External**: `react`, BUILDFLAGS, `figures`
- **Internal**: `components/SentryErrorBoundary`, `ink`, `state/AppState`, `Tool`, `types/message`, `utils/classifierApprovals`, `utils/messages`, `components/MessageResponse`, `components/messages/HookProgressMessage`

## Logic
Captures classifier and yolo approval state on mount via useState lazy initializers, then deletes the entries from the approval map via useEffect to prevent linear growth. Validates the tool result against the tool's output schema to guard against corrupt deserialized data from resumed transcripts. Delegates rendering to the tool's custom result renderer, then conditionally appends auto-approval indicators for bash or transcript classifier features. Wraps the PostToolUse hook progress message in a SentryErrorBoundary.

## Exports
- `UserToolSuccessMessage` - renders a successful tool result with optional approval badges and post-execution hooks

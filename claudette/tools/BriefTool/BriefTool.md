## Purpose
Tool for sending messages to the user, serving as the primary visible output channel for the assistant.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - State: `getKairosActive`, `getUserMsgOptIn`
  - Analytics: `getFeatureValue_CACHED_WITH_REFRESH`, `logEvent`
  - Tool: `buildTool`, `ToolDef`, `ValidationResult`
  - Utils: `isEnvTruthy`, `lazySchema`, `plural`
  - Local: `resolveAttachments`, `validateAttachmentPaths`
  - Constants: `BRIEF_TOOL_NAME`, `BRIEF_TOOL_PROMPT`, `DESCRIPTION`, `LEGACY_BRIEF_TOOL_NAME`
  - UI: `renderToolResultMessage`, `renderToolUseMessage`

## Logic
1. Feature-gated on KAIROS or KAIROS_BRIEF build flags
2. Activation requires opt-in via --brief flag, defaultView setting, /brief command, or env var
3. Validates attachment file paths before sending
4. Resolves attachments (potentially via REPL bridge) if present
5. Logs analytics event with proactive status and attachment count
6. Returns message with resolved attachment metadata and sentAt timestamp
7. Supports both normal replies and proactive notifications

## Exports
- `BriefTool` - Main tool definition
- `isBriefEntitled()` - Checks if user is allowed to use Brief (GB gate + build flags)
- `isBriefEnabled()` - Unified activation gate (entitled AND opted-in)
- `Output` - Type for output (message, attachments, sentAt)
- `Input` - Type for input (message, attachments, status)

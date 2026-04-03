## Purpose
Renders UI messages for the Skill tool across different states including use, progress, result, rejection, and error.

## Imports
- **Stdlib**: None
- **External**: `@anthropic-ai/sdk/resources/index.mjs`, REACT, `zod/v4`
- **Internal**: `SubAgentProvider`, `FallbackToolUseErrorMessage`, `FallbackToolUseRejectedMessage`, `Command`, `Byline`, `Message`, `MessageResponse`, `Box`, `Text`, `Tools`, `ProgressMessage`, `buildSubagentLookups`, `EMPTY_LOOKUPS`, `plural`, `inputSchema`, `Output`, `Progress`

## Logic
Provides UI component renderers for each lifecycle stage of the Skill tool. The result message displays skill load status with tool count and model info. The use message resolves the skill name to a display name, handling legacy command paths. The progress message shows up to 3 recent messages with sub-agent context, hiding overflow in non-verbose mode. Rejection and error messages wrap the progress output with appropriate fallback components.

## Exports
- `renderToolResultMessage` - renders the skill load result showing status, tool count, and model
- `renderToolUseMessage` - renders the skill name being invoked, resolving command display names
- `renderToolUseProgressMessage` - renders progress messages from skill sub-agents with overflow handling
- `renderToolUseRejectedMessage` - renders rejected state with progress and fallback rejection message
- `renderToolUseErrorMessage` - renders error state with progress and fallback error message

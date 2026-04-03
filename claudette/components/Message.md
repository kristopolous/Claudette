## Purpose
Renders different message types (user, assistant, system, tool use, etc.) by delegating to specialized sub-components based on message type and content.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, BUILDFLAGS (feature), `@anthropic-ai/sdk` (BetaContentBlock, ImageBlockParam, TextBlockParam, ThinkingBlockParam, ToolResultBlockParam, ToolUseBlockParam types)
- **Internal**: `ink` (Box), `hooks/useTerminalSize`, `types/connectorText` (ConnectorTextBlock, isConnectorTextBlock), `types/message` (various message types), `utils/advisor` (AdvisorBlock, isAdvisorBlock), `utils/fullscreen` (isFullscreenEnvEnabled), `utils/log` (logError), `utils/messages` (buildMessageLookups), `components/CompactSummary`, `components/messages/AdvisorMessage`, `components/messages/AssistantRedactedThinkingMessage`, `components/messages/AssistantTextMessage`, `components/messages/AssistantThinkingMessage`, `components/messages/AssistantToolUseMessage`, `components/messages/AttachmentMessage`, `components/messages/CollapsedReadSearchContent`, `components/messages/CompactBoundaryMessage`, `components/messages/GroupedToolUseContent`, `components/messages/SystemTextMessage`, `components/messages/UserImageMessage`, `components/messages/UserTextMessage`, `components/messages/UserToolResultMessage`, `components/OffscreenFreeze`, `components/shell/ExpandShellOutputContext`

## Logic
1. Switches on message type to delegate rendering to the appropriate sub-component
2. For attachment messages, renders AttachmentMessage
3. For assistant messages, maps content blocks through AssistantMessageBlock which further dispatches to tool use, text, thinking, redacted thinking, or advisor components
4. For user messages, maps content params to UserTextMessage, UserImageMessage, or UserToolResultMessage based on param type
5. For system messages, handles compact boundaries, snip boundaries/markers, local commands, and general system text
6. For grouped tool use and collapsed read/search, renders their respective content components
7. Uses memoization with areMessagePropsEqual to optimize re-renders based on UUID, thinking block changes, verbose toggle, bash output status, transcript mode, and container width

## Exports
- `Message` - memoized component that renders any message type by delegating to specialized sub-components
- `hasThinkingContent` - checks if a message contains thinking or redacted thinking blocks
- `areMessagePropsEqual` - equality check for Message props to determine if re-render is needed

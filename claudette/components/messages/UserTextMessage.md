## Purpose
Dispatches user text messages to appropriate specialized components based on content tags (bash, commands, memory, teammate, plan, etc.).

## Imports
- **Stdlib**: None
- **External**: REACT, @anthropic-ai/sdk, BUILDFLAGS
- **Internal**: MessageResponse, InterruptedByUser, UserBashInputMessage, UserBashOutputMessage, UserCommandMessage, UserLocalCommandOutputMessage, UserMemoryInputMessage, UserPlanMessage, UserPromptMessage, UserResourceUpdateMessage, UserTeammateMessage, UserAgentNotificationMessage, xml constants, messages constants, messages utils, agentSwarmsEnabled utils

## Logic
1. Checks for empty content and delegates to UserPlanMessage if planContent is provided
2. Filters out tick tags and local command caveats
3. Routes based on content prefixes/tags:
   - bash-stdout/stderr → UserBashOutputMessage
   - local-command-stdout/stderr → UserLocalCommandOutputMessage
   - interrupt messages → InterruptedByUser
   - bash-input → UserBashInputMessage
   - command-message → UserCommandMessage
   - user-memory-input → UserMemoryInputMessage
   - teammate-message → UserTeammateMessage (if agent swarms enabled)
   - task-notification → UserAgentNotificationMessage
   - mcp-resource/polling-update → UserResourceUpdateMessage
   - Various feature-gated handlers (GitHub webhooks, fork boilerplate, cross-session, channels)
4. Falls through to UserPromptMessage for plain user text

## Exports
- `UserTextMessage` - UI component dispatching user text content to specialized message renderers

## Purpose
Determines whether to display a friction banner that encourages users to flag issues when they express dissatisfaction with Claude's responses.

## Imports
- **Stdlib**: None
- **External**: `react` (`useMemo`, `useRef`)
- **Internal**: `BASH_TOOL_NAME` (tool identifier), `Message` (type), `getUserMessageText` (utility)

## Logic
This hook combines two analyses to decide when to show a banner:

1. **Session compatibility check** (`isSessionContainerCompatible`): Scans all assistant messages to ensure the session doesn't use MCP tools or dangerous external commands (curl, wget, ssh, kubectl, docker, aws, gcloud, git push/pull/fetch, gh pr/issue, etc.). Sessions with these are excluded from the banner.

2. **Friction signal detection** (`hasFrictionSignal`): Scans user messages backwards for patterns indicating negative feedback: corrections ("that's wrong", "not what I asked"), frustration ("why did you", "you should have"), or explicit retries ("try again", "undo that").

The hook is only active for Anthropic employees (`USER_TYPE === 'ant'`). It uses refs to maintain state across renders (`lastTriggeredAt`, `activeForSubmit`) and memoizes the expensive message scans. A cooldown of 30 minutes prevents repeated triggers; the banner remains visible until the user submits another message after the trigger.

## Exports
- `isSessionContainerCompatible` - checks if session avoids external commands and MCP tools
- `hasFrictionSignal` - detects negative user feedback patterns in messages
- `useIssueFlagBanner` - main hook returning whether the banner should be shown

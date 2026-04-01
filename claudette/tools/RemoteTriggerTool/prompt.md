## Purpose
Provides the description and prompt text for the Remote Trigger tool that manages scheduled remote Claude Code agents via the claude.ai CCR API.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic
Defines static strings describing the remote trigger tool's capabilities including listing, getting, creating, updating, and running scheduled triggers. Documents that authentication is handled in-process so the OAuth token never reaches the shell. Lists the available API actions and their corresponding HTTP methods and endpoints.

## Exports
- `REMOTE_TRIGGER_TOOL_NAME` - the tool name identifier
- `DESCRIPTION` - brief description of managing scheduled remote agents
- `PROMPT` - detailed prompt with available actions (list, get, create, update, run) and their API endpoints

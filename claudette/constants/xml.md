## Purpose
Defines XML tag constants used to wrap skill metadata, command data, terminal output, task notifications, and inter-agent messages in the conversation protocol.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Exports string constants for XML tags that structure various message types including bash input/output, task notifications, ultraplan sessions, remote reviews, teammate messages, channel messages, cross-session messages, and fork boilerplate. Also provides arrays of terminal-related tags and common help/info argument patterns.

## Exports
- `COMMAND_NAME_TAG` - XML tag for command name metadata
- `COMMAND_MESSAGE_TAG` - XML tag for command message metadata
- `COMMAND_ARGS_TAG` - XML tag for command arguments metadata
- `BASH_INPUT_TAG` - XML tag for terminal/bash command input
- `BASH_STDOUT_TAG` - XML tag for bash stdout content
- `BASH_STDERR_TAG` - XML tag for bash stderr content
- `LOCAL_COMMAND_STDOUT_TAG` - XML tag for local command stdout
- `LOCAL_COMMAND_STDERR_TAG` - XML tag for local command stderr
- `LOCAL_COMMAND_CAVEAT_TAG` - XML tag for local command caveats
- `TERMINAL_OUTPUT_TAGS` - array of all terminal-related tag names
- `TICK_TAG` - XML tag for tick markers
- `TASK_NOTIFICATION_TAG` - XML tag for background task completion notifications
- `TASK_ID_TAG` - XML tag for task identifier
- `TOOL_USE_ID_TAG` - XML tag for tool use identifier
- `TASK_TYPE_TAG` - XML tag for task type
- `OUTPUT_FILE_TAG` - XML tag for output file path
- `STATUS_TAG` - XML tag for status value
- `SUMMARY_TAG` - XML tag for summary text
- `REASON_TAG` - XML tag for reason text
- `WORKTREE_TAG` - XML tag for worktree marker
- `WORKTREE_PATH_TAG` - XML tag for worktree path
- `WORKTREE_BRANCH_TAG` - XML tag for worktree branch
- `ULTRAPLAN_TAG` - XML tag for ultraplan mode sessions
- `REMOTE_REVIEW_TAG` - XML tag for remote review results
- `REMOTE_REVIEW_PROGRESS_TAG` - XML tag for remote review progress heartbeats
- `TEAMMATE_MESSAGE_TAG` - XML tag for swarm inter-agent communication
- `CHANNEL_MESSAGE_TAG` - XML tag for external channel messages
- `CHANNEL_TAG` - XML tag for channel identifier
- `CROSS_SESSION_MESSAGE_TAG` - XML tag for cross-session UDS messages
- `FORK_BOILERPLATE_TAG` - XML tag for fork child rules/format boilerplate
- `FORK_DIRECTIVE_PREFIX` - prefix text stripped by the fork renderer
- `COMMON_HELP_ARGS` - array of common help argument patterns
- `COMMON_INFO_ARGS` - array of common info/state request argument patterns

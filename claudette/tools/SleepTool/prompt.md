## Purpose
Defines the name, description, and detailed prompt for the Sleep tool that allows the model to wait for a specified duration.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `constants/xml` (for TICK_TAG)

## Logic
Exports the Sleep tool's name, a brief description, and a comprehensive prompt that explains when and how to use the tool. The prompt covers use cases (user requests, idle time, waiting), behavior during sleep (periodic check-ins via tick tags), concurrency with other tools, advantages over shell sleep commands, and cost/cache considerations.

## Exports
- `SLEEP_TOOL_NAME` - Constant string 'Sleep' used as the tool's identifier
- `DESCRIPTION` - Brief description: 'Wait for a specified duration'
- `SLEEP_TOOL_PROMPT` - Detailed prompt explaining usage, behavior, and best practices for the Sleep tool

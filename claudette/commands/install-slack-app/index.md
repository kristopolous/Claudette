## Purpose
Registers the install-slack-app command metadata and lazy-loads the implementation.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local' command named 'install-slack-app' with description "Install the Claude Slack app". The command is only available to 'claude-ai' users and does not support non-interactive mode. Implementation is loaded from './install-slack-app.js' on demand.

## Exports
- `default` - The installSlackApp command object

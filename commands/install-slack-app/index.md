## Purpose
Provides lazy-loaded command metadata for the `install-slack-app` command.

## Imports
- **Internal**: Command type, install-slack-app implementation

## Logic
1. Command with type 'local'
2. Name: 'install-slack-app', description: 'Install the Claude Slack app'
3. `availability: ['claude-ai']` (only for Claude AI subscribers)
4. `supportsNonInteractive: false` (requires interactive browser launch)
5. Lazy loads via `load: () => import('./install-slack-app.js')`
6. Opens Slack marketplace for Claude app integration

## Exports
- `default` - installSlackApp Command object

## Purpose
Provides lazy-loaded command metadata for the `feedback` command with conditional enable.

## Imports
- **Internal**: Command type, feedback implementation, policy limits, envUtils, privacyLevel

## Logic
1. Command with type 'local-jsx'
2. Name: 'feedback', description: 'Submit feedback about Claude Code'
3. Aliases: ['bug']
4. Argument hint: '[report]' (optional initial description)
5. `isEnabled` returns false when:
   - Using Bedrock/Vertex/Foundry (claude-code-use-* env vars)
   - DISABLE_FEEDBACK_COMMAND or DISABLE_BUG_COMMAND set
   - Essential traffic only mode
   - USER_TYPE === 'ant' (internal)
   - Policy disallows product feedback
6. Lazy loads via `load: () => import('./feedback.js')`
7. Command provides feedback form UI

## Exports
- `default` - Command object with conditional enable

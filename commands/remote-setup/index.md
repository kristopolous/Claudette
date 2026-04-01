## Purpose
Registers the /web-setup command for connecting Claude CLI to the web.

## Imports
- **External**: Command type
- **Internal**: GrowthBook feature flags, policy limits

## Logic
Defines 'web-setup' command with:
- type: 'local-jsx'
- availability: ['claude-ai'] (only on claude.ai)
- isEnabled: when 'tengu_cobalt_lantern' feature flag true AND 'allow_remote_sessions' policy allowed
- isHidden: when policy disallows remote sessions
- load: imports './remote-setup.js' lazily

Used for onboarding users to claude.ai/code by connecting their GitHub account.

## Exports
- `default` - Command object for /web-setup

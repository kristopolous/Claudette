## Purpose
Provides system prompt prefix selection and API request attribution header generation.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS
- **Internal**: `services/analytics/growthbook`, `utils/debug`, `utils/envUtils`, `utils/model/providers`, `utils/workloadContext`

## Logic
Selects the appropriate system prompt prefix based on API provider and session type (interactive vs non-interactive). Generates attribution headers for API requests that include version, fingerprint, entrypoint, client attestation placeholder, and workload routing hints.

## Exports
- `CLISyspromptPrefix` - type union of all possible CLI system prompt prefix values
- `CLI_SYSPROMPT_PREFIXES` - readonly set of all possible CLI system prompt prefix values
- `getCLISyspromptPrefix` - returns the appropriate system prompt prefix based on provider and session configuration
- `getAttributionHeader` - generates the x-anthropic-billing-header string with version, entrypoint, attestation, and workload info

### Helpful Prompt Templates

- **Default CLI sysprompt prefix** - "You are Claude Code, Anthropic's official CLI for Claude."

- **Agent SDK Claude Code preset prefix** - "You are Claude Code, Anthropic's official CLI for Claude, running within the Claude Agent SDK."

- **Agent SDK prefix** - "You are a Claude agent, built on Anthropic's Claude Agent SDK."

### Helpful Prompt Templates

- **Default CLI sysprompt prefix** - "You are Claude Code, Anthropic's official CLI for Claude."

- **Agent SDK Claude Code preset prefix** - "You are Claude Code, Anthropic's official CLI for Claude, running within the Claude Agent SDK."

- **Agent SDK prefix** - "You are a Claude agent, built on Anthropic's Claude Agent SDK."

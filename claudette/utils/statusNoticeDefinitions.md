# statusNoticeDefinitions

## Purpose
Defines a collection of status notice definitions that are conditionally displayed in the UI as warnings or info messages. Each notice has an `isActive` predicate and a `render` function that produces React elements.

## Imports
- **Stdlib**: REACT, `figures`, `path`
- **External**: none
- **Internal**: `../ink`, `./claudemd`, `./cwd`, `./format`, `./config`, `./auth`, `../tools/AgentTool/loadAgentsDir`, `./statusNoticeHelpers`, `./ide`, `./jetbrains`

## Logic
Defines six individual notice objects and exports them as an array:
1. **large-memory-files** (warning): Active when memory files exceed `MAX_MEMORY_CHARACTER_COUNT`. Renders file paths with character counts and a `/memory` hint.
2. **claude-ai-external-token** (warning): Active for Claude.ai subscribers using `ANTHROPIC_AUTH_TOKEN` or `apiKeyHelper` instead of their subscription token. Suggests unsetting the env var or running `/logout`.
3. **api-key-conflict** (warning): Active when an API key is set via env var or keychain helper while also being a Claude.ai subscriber. Suggests unsetting the conflicting source.
4. **both-auth-methods** (warning): Active when both an API key and an auth token are set simultaneously (from different sources). Provides targeted remediation advice based on which auth method the user intends to use.
5. **large-agent-descriptions** (warning): Active when cumulative agent description tokens exceed `AGENT_DESCRIPTIONS_THRESHOLD` (15,000). Uses `getAgentDescriptionsTotalTokens()` from statusNoticeHelpers. Suggests `/agents` to manage.
6. **jetbrains-plugin-install** (info): Active when running in a JetBrains built-in terminal with auto-install enabled and the plugin is not yet installed. Renders a link to the JetBrains Marketplace docs.

`getActiveNotices()` filters the definitions array by running each notice's `isActive` predicate against the provided context.

## Exports
- `StatusNoticeType` - type alias for `'warning' | 'info'`
- `StatusNoticeContext` - type for context passed to notices (config, agentDefinitions, memoryFiles)
- `StatusNoticeDefinition` - type for a notice with id, type, isActive predicate, and render function
- `statusNoticeDefinitions` - array of all six notice definitions
- `getActiveNotices` - filters definitions to return only active notices for a given context

## Source
`statusNoticeDefinitions`

# utils/envUtils

## Purpose
Provides environment variable utilities and path helpers.

## Imports
- **Stdlib**: `os`, `path`
- **External**: `lodash-es/memoize`
- **Internal**: (none)

## Logic
1. `getClaudeConfigHomeDir` - gets Claude config home directory
2. Memoized with CLAUDE_CONFIG_DIR as key
3. Defaults to ~/.claude, normalizes to NFC
4. `getTeamsDir` - gets teams subdirectory path
5. `hasNodeOption` - checks if NODE_OPTIONS contains specific flag
6. Splits on whitespace for exact match (avoids false positives)
7. `isEnvTruthy` - checks if env var is truthy
8. Truthy values: '1', 'true', 'yes', 'on' (case-insensitive)
9. `isEnvDefinedFalsy` - checks if env var is defined as falsy
10. Falsy values: '0', 'false', 'no', 'off' (case-insensitive)
11. `isBareMode` - checks for --bare / CLAUDE_CODE_SIMPLE mode
12. Skips hooks, LSP, plugin sync, skill dir-walk, attribution, background prefetches
13. Auth strictly from ANTHROPIC_API_KEY env or apiKeyHelper
14. Checks argv directly for --bare flag (before main.tsx sets env var)
15. `parseEnvVars` - parses KEY=VALUE array to object
16. `formatEnvVars` - formats object to KEY=VALUE array

## Exports
- `getClaudeConfigHomeDir` - gets config home directory
- `getTeamsDir` - gets teams directory
- `hasNodeOption` - checks NODE_OPTIONS flag
- `isEnvTruthy` - checks truthy env var
- `isEnvDefinedFalsy` - checks defined falsy env var
- `isBareMode` - checks bare mode
- `parseEnvVars` - parses env vars
- `formatEnvVars` - formats env vars

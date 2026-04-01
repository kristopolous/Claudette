# utils/embeddedTools

## Purpose
Detects if build has bfs/ugrep embedded in bun binary (ant-native only).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: envUtils

## Logic
1. `hasEmbeddedSearchTools` - checks if embedded search tools available
2. Checks EMBEDDED_SEARCH_TOOLS env var
3. Excludes SDK entrypoints (sdk-ts, sdk-py, sdk-cli, local-agent)
4. When true:
   - `find` and `grep` shadowed by shell functions invoking bun with argv0='bfs'/'ugrep'
   - Dedicated Glob/Grep tools removed from tool registry
   - Prompt guidance steering away from find/grep omitted
5. Set as build-time define in scripts/build-with-plugins.ts
6. `embeddedSearchToolsBinaryPath` - gets path to bun binary with embedded tools
7. Returns process.execPath
8. Only meaningful when hasEmbeddedSearchTools() is true

## Exports
- `hasEmbeddedSearchTools` - checks for embedded search tools
- `embeddedSearchToolsBinaryPath` - gets embedded tools binary path

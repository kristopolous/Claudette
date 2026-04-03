# utils/embeddedTools

## Purpose

Detects if the build has bfs/ugrep embedded in the binary (internal builds only).

## Imports

- **Stdlib**: (none)
- **External**: (none)
- **Internal**: envUtils

## Logic

1. `hasEmbeddedSearchTools` - checks if embedded search tools available
2. Checks EMBEDDED_SEARCH_TOOLS env var
3. Excludes SDK entrypoints (sdk-ts, sdk-py, sdk-cli, local-agent)
4. When true:
   - `find` and `grep` shadowed by shell functions invoking the binary with argv0='bfs'/'ugrep'
   - Dedicated Glob/Grep tools removed from tool registry
   - Prompt guidance steering away from find/grep omitted
5. Set as build-time define in build scripts
6. `embeddedSearchToolsBinaryPath` - gets path to binary with embedded tools
7. Returns process.execPath
8. Only meaningful when hasEmbeddedSearchTools() is true

## Exports

- `hasEmbeddedSearchTools` - checks for embedded search tools
- `embeddedSearchToolsBinaryPath` - gets embedded tools binary path

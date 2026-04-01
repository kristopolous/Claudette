# services/teamMemorySync/teamMemSecretGuard

## Purpose
Prevents model from writing secrets into team memory files shared with collaborators.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: teamMemPaths, secretScanner (dynamic imports)

## Logic
1. `checkTeamMemSecrets` - checks file write/edit for secrets
2. Returns error message if secrets detected, null if safe
3. Called from FileWriteTool and FileEditTool validateInput
4. Feature-gated with feature('TEAMMEM')
5. Dynamic imports to keep inert when build flag off
6. Checks if filePath is team memory path via isTeamMemPath
7. Scans content via scanForSecrets
8. Returns formatted error with matched secret labels
9. Error message explains team memory is shared with collaborators
10. Instructs user to remove sensitive content and retry
11. secretScanner assembles sensitive prefixes at runtime (ANT_KEY_PFX)

## Exports
- `checkTeamMemSecrets` - checks content for secrets in team memory paths

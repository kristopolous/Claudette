## Purpose
Provides lazy-loaded command metadata for the `diff` command.

## Imports
- **Internal**: Command type, implementation from diff.js

## Logic
1. Default export with type 'local-jsx'
2. Name: 'diff'
3. Description: 'View uncommitted changes and per-turn diffs'
4. Lazy loads via `load: () => import('./diff.js')`
5. Renders DiffDialog component showing git changes and conversation diffs

## Exports
- `default` - Command object

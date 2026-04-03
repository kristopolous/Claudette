# utils/claudemd

## Purpose
Manages CLAUDE.md memory file loading with priority ordering and @include support.

## Imports
- **Stdlib**: `path`
- **External**: BUILDFLAGS, `ignore`, `lodash-es/memoize`, `marked`, `picomatch`
- **Internal**: analytics, bootstrap state, memdir memdir/paths, growthbook, config, debug, diagLogs, envUtils, errors, file, fileStateCache, frontmatterParser, fsOperations, git, hooks, memory types, path, permissions filesystem, settings constants/settings, teamMemoryOps

## Logic
1. Loading order (reverse priority): managed → user → project → local
2. Managed: /etc/claude-code/CLAUDE.md - global for all users
3. User: ~/.claude/CLAUDE.md - private global for user
4. Project: CLAUDE.md, .claude/CLAUDE.md, .claude/rules/*.md - checked into codebase
5. Local: CLAUDE.local.md - private project-specific
6. Files closer to cwd have higher priority (loaded later)
7. `@include` directive: @path, @./relative, @~/home, @/absolute
8. @path without prefix treated as relative (@./path)
9. Works in leaf text nodes only (not code blocks)
10. Included files added as separate entries before including file
11. Circular references prevented by tracking processed files
12. Non-existent files silently ignored
13. `getMemoryFiles` - loads memory files with priority ordering
14. `filterInjectedMemoryFiles` - filters for injection
15. `getManagedAndUserConditionalRules` - gets conditional rules
16. `isAutoManagedMemoryFile` - checks auto-managed memory file
17. `isAutoManagedMemoryPattern` - checks auto-managed pattern
18. `isMemoryDirectory` - checks memory directory
19. `isShellCommandTargetingMemory` - checks shell command targeting memory

## Exports
- `getMemoryFiles` - loads memory files
- `filterInjectedMemoryFiles` - filters for injection
- `getManagedAndUserConditionalRules` - gets conditional rules
- `isAutoManagedMemoryFile` - checks auto-managed file
- `isAutoManagedMemoryPattern` - checks auto-managed pattern
- `isMemoryDirectory` - checks memory directory
- `isShellCommandTargetingMemory` - checks shell targeting memory

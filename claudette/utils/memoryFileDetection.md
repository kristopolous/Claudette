# utils/memoryFileDetection

## Purpose
Detects whether file paths, globs, or shell commands target Claude-managed memory files (auto-memory, agent memory, session memory/transcripts, team memory) vs user-managed files (CLAUDE.md, rules). Used for collapse/badge logic and telemetry scoping.

## Imports
- **Stdlib**: `path` (normalize, posix, win32)
- **External**: BUILDFLAGS (feature flag)
- **Internal**: `../memdir/paths.js`, `../tools/AgentTool/agentMemory.js`, `./envUtils.js`, `./windowsPaths.js`, `../memdir/teamMemPaths.js` (conditional require)

## Logic
1. `IS_WINDOWS` platform check drives case-insensitive path comparison
2. `toPosix()` normalizes path separators to forward slashes
3. `toComparable()` produces a stable string-comparable form (lowercased on Windows)
4. `detectSessionFileType()` checks if a path is under `~/.claude` and matches session-memory/*.md or projects/*.jsonl patterns
5. `detectSessionPatternType()` checks if a glob/pattern string indicates session file access (for Grep/Glob tools)
6. `isAutoMemFile()` checks if auto-memory is enabled and the path is within the memdir
7. `memoryScopeForPath()` determines if a path belongs to 'personal' or 'team' memory scope (team checked first since it's a subdirectory of memdir)
8. `isAgentMemFile()` (private) checks if path is within agent memory directory
9. `isAutoManagedMemoryFile()` returns true for auto-memory, team memory, session files, and agent memory — excludes user-managed files like CLAUDE.md
10. `isMemoryDirectory()` checks if a directory path is memory-related, handling path traversal security, agent memory, team memory, session memory, and config dir checks
11. `isShellCommandTargetingMemory()` extracts absolute path tokens from shell commands (Bash/PowerShell) and checks each against memory detection functions; handles MinGW /c/... paths on Windows
12. `isAutoManagedMemoryPattern()` checks if a glob pattern targets auto-managed memory files (excludes user-managed)

## Exports
- `detectSessionFileType(filePath)` - Returns `'session_memory' | 'session_transcript' | null`
- `detectSessionPatternType(pattern)` - Returns `'session_memory' | 'session_transcript' | null` for glob patterns
- `isAutoMemFile(filePath)` - Returns `boolean`, true if path is within memdir and auto-memory is enabled
- `MemoryScope` - Type alias: `'personal' | 'team'`
- `memoryScopeForPath(filePath)` - Returns `MemoryScope | null`
- `isAutoManagedMemoryFile(filePath)` - Returns `boolean`, true for any Claude-managed memory file
- `isMemoryDirectory(dirPath)` - Returns `boolean`, true if directory is memory-related
- `isShellCommandTargetingMemory(command)` - Returns `boolean`, true if shell command references memory paths
- `isAutoManagedMemoryPattern(pattern)` - Returns `boolean`, true if glob targets auto-managed memory

# tasks/DreamTask/DreamTask

## Purpose
Defines DreamTask for background memory consolidation operations.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Task types, message types, agent types

## Logic
1. DreamTask implements Task interface for memory consolidation
2. Runs as forked subagent via /dream prompt
3. Periodic background execution based on time and session thresholds
4. Updates memory files in auto-memory directory
5. Uses FileRead/FileEdit tools for memory operations
6. Tracked in task state for monitoring
7. Integrates with task framework for lifecycle management

## Exports
- `DreamTask` - task definition for memory consolidation
- (Dream task state and management types)

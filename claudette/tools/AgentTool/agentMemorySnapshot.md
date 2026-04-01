# tools/AgentTool/agentMemorySnapshot

## Purpose
Manages agent memory snapshot persistence and synchronization.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `zod/v4`
- **Internal**: cwd, debug, lazySchema, JSON utils, agentMemory

## Logic
1. `SNAPSHOT_BASE` - agent-memory-snapshots directory
2. `SNAPSHOT_JSON` - snapshot.json metadata file
3. `SYNCED_JSON` - .snapshot-synced.json sync tracking file
4. `snapshotMetaSchema` - { updatedAt: string }
5. `syncedMetaSchema` - { syncedFrom: string }
6. `getSnapshotDirForAgent` - gets snapshot directory for agent
7. `readJsonFile` - reads and validates JSON file with schema
8. `copySnapshotToLocal` - copies snapshot files to local agent memory
9. Skips SNAPSHOT_JSON, copies all other files
10. `saveSyncedMeta` - saves sync metadata
11. `loadSyncedMeta` - loads sync metadata
12. `shouldSyncSnapshot` - checks if sync needed
13. `syncSnapshotIfNeeded` - syncs if snapshot newer than synced
14. `saveAgentMemorySnapshot` - saves current memory to snapshot
15. `loadAgentMemoryFromSnapshot` - loads memory from snapshot

## Exports
- `getSnapshotDirForAgent` - gets snapshot directory for agent
- `checkAgentMemorySnapshot` - checks if sync needed
- `initializeFromSnapshot` - initializes local memory from snapshot
- `replaceFromSnapshot` - replaces local memory with snapshot
- `markSnapshotSynced` - marks snapshot as synced

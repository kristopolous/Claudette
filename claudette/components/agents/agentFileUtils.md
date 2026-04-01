## Purpose
A utility module that handles the serialization, path resolution, and filesystem CRUD operations for agent definition files (Markdown with YAML frontmatter).

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: None
- **Internal**: `utils/settings/constants`, `utils/settings/managedPath`, `tools/AgentTool/agentMemory`, `tools/AgentTool/loadAgentsDir`, `utils/cwd`, `utils/effort`, `utils/envUtils`, `utils/errors`, `components/agents/types`

## Logic
1. **Serialization**: Converts agent configuration (name, description, tools, model, color, memory scope, effort) into a Markdown string. It uses YAML frontmatter for metadata and preserves the system prompt as the main file content.
2. **Path Resolution**: 
    - Maps agent "sources" (e.g., user, project, policy) to specific directories on the host system.
    - Handles mapping between internal agent identifiers and physical filenames on disk.
    - Differentiates between absolute and relative paths for display and storage.
3. **Filesystem Operations**:
    - **Creation**: Ensures the destination directory exists and writes a new agent file, with optional collision detection.
    - **Update**: Modifies the metadata or system prompt of an existing agent file.
    - **Deletion**: Removes the agent's definition file from the filesystem.
4. **Data Integrity**: Uses low-level file handles with explicit data synchronization (`datasync`) to ensure changes are fully committed to physical storage.
5. **Access Control**: Prevents modification or deletion of "built-in" agents, which are treated as read-only resources.

## Exports
- `formatAgentAsMarkdown` - Serializes agent data into a compliant file format.
- `getNewAgentFilePath` / `getActualAgentFilePath` - Resolve filesystem locations for agents.
- `saveAgentToFile` - Writes a new agent definition to disk.
- `updateAgentFile` - Updates an existing agent's configuration.
- `deleteAgentFromFile` - Removes an agent from storage.

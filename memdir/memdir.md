# memdir.ts

Memory directory management for persistent, file-based memory systems.

## Overview

This module provides the core functionality for managing Claude's persistent memory system. It handles:
- Building memory prompts with behavioral instructions
- Truncating MEMORY.md content to line and byte caps
- Ensuring memory directories exist
- Dispatching between different memory modes (auto, team, KAIROS daily-log)

## Constants

### `ENTRYPOINT_NAME`
```typescript
export const ENTRYPOINT_NAME = 'MEMORY.md'
```
The index filename for memory entries.

### `MAX_ENTRYPOINT_LINES`
```typescript
export const MAX_ENTRYPOINT_LINES = 200
```
Maximum lines allowed in MEMORY.md before truncation.

### `MAX_ENTRYPOINT_BYTES`
```typescript
export const MAX_ENTRYPOINT_BYTES = 25_000
```
Maximum bytes (~125 chars/line at 200 lines) before truncation. Targets long-line indexes that slip past the line cap.

### `DIR_EXISTS_GUIDANCE`
```typescript
export const DIR_EXISTS_GUIDANCE =
  'This directory already exists — write to it directly with the Write tool (do not run mkdir or check for its existence).'
```
Guidance text appended to memory directory prompts.

### `DIRS_EXIST_GUIDANCE`
```typescript
export const DIRS_EXIST_GUIDANCE =
  'Both directories already exist — write to them directly with the Write tool (do not run mkdir or check for their existence).'
```
Guidance for when both directories exist.

## Types

### `EntrypointTruncation`
```typescript
export type EntrypointTruncation = {
  content: string
  lineCount: number
  byteCount: number
  wasLineTruncated: boolean
  wasByteTruncated: boolean
}
```
Result of truncating MEMORY.md content.

## Functions

### `truncateEntrypointContent(raw: string): EntrypointTruncation`
Truncates MEMORY.md content to the line AND byte caps, appending a warning that names which cap fired. Line-truncates first (natural boundary), then byte-truncates at the last newline before the cap so we don't cut mid-line.

**Parameters:**
- `raw` - Raw MEMORY.md content

**Returns:** `EntrypointTruncation` with truncated content and metadata about which truncation occurred.

### `ensureMemoryDirExists(memoryDir: string): Promise<void>`
Ensures a memory directory exists. Idempotent — called from loadMemoryPrompt (once per session via systemPromptSection cache). Uses `fs.mkdir` recursively and swallows EEXIST errors; logs other errors for debugging.

**Parameters:**
- `memoryDir` - Path to the memory directory

### `logMemoryDirCounts(memoryDir: string, baseMetadata: Record<string, number | boolean | AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS>): void`
Logs memory directory file/subdir counts asynchronously. Fire-and-forget — doesn't block prompt building.

**Parameters:**
- `memoryDir` - Path to the memory directory
- `baseMetadata` - Base metadata to include in the analytics event

### `buildMemoryLines(displayName: string, memoryDir: string, extraGuidelines?: string[], skipIndex = false): string[]`
Builds the typed-memory behavioral instructions (without MEMORY.md content). Constrains memories to a closed four-type taxonomy (user / feedback / project / reference).

**Parameters:**
- `displayName` - Display name for the memory section (e.g., "auto memory")
- `memoryDir` - Path to the memory directory
- `extraGuidelines` - Optional additional guidelines to append
- `skipIndex` - If true, omits the index-building instructions (for agent memory)

**Returns:** Array of prompt lines.

### `buildMemoryPrompt(params: { displayName: string, memoryDir: string, extraGuidelines?: string[] }): string`
Builds the typed-memory prompt with MEMORY.md content included. Used by agent memory.

**Parameters:**
- `params.displayName` - Display name for the memory section
- `params.memoryDir` - Path to the memory directory
- `params.extraGuidelines` - Optional additional guidelines

**Returns:** Complete memory prompt string.

### `buildAssistantDailyLogPrompt(skipIndex = false): string`
Builds the assistant-mode daily-log prompt for KAIROS feature. Assistant sessions write memories append-only to date-named log files rather than maintaining MEMORY.md as a live index.

**Parameters:**
- `skipIndex` - If true, omits the MEMORY.md section

**Returns:** Daily log prompt string.

### `buildSearchingPastContextSection(autoMemDir: string): string[]`
Builds the "Searching past context" section if the `tengu_coral_fern` feature gate is enabled. Provides instructions for searching topic files and session transcript logs.

**Parameters:**
- `autoMemDir` - Path to the auto memory directory

**Returns:** Array of prompt lines, or empty array if feature is disabled.

### `loadMemoryPrompt(): Promise<string | null>`
Loads the unified memory prompt for inclusion in the system prompt. Dispatches based on which memory systems are enabled:
- auto + team: combined prompt (both directories)
- auto only: memory lines (single directory)
- KAIROS: daily-log prompt

**Returns:** Memory prompt string, or `null` when auto memory is disabled.

## Memory Types

The memory system uses a four-type taxonomy defined in `memoryTypes.ts`:
- **User** - Facts about the user, their role, preferences
- **Feedback** - User corrections and preferences
- **Project** - Project context not derivable from code
- **Reference** - External system pointers

## MEMORY.md Format

MEMORY.md is an index file (not a memory itself). Each entry should be one line under ~150 characters:
```
- [Title](file.md) — one-line hook
```

Individual memories are stored in separate topic files with frontmatter.

## Feature Gates

- `TEAMMEM` - Team memory feature
- `KAIROS` - Assistant daily-log mode
- `tengu_coral_fern` - Enable past context search section
- `tengu_moth_copse` - Skip index instructions
- `tengu_herring_clock` - Team memory disabled telemetry

## See Also

- [memoryTypes.md](./memoryTypes.md) - Memory type definitions and examples
- [paths.md](./paths.md) - Memory path resolution
- [teamMemPaths.md](./teamMemPaths.md) - Team memory path utilities
- [teamMemPrompts.md](./teamMemPrompts.md) - Combined memory prompt builder

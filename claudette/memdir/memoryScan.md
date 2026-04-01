## Purpose
Scans a memory directory for markdown files and extracts their frontmatter headers for use in memory selection and display.

## Imports
- **Stdlib**: fs/promises, path
- **External**: none
- **Internal**: utils/frontmatterParser, utils/readFileInRange, memoryTypes

## Logic
Recursively reads a memory directory for .md files excluding MEMORY.md, then reads the first 30 lines of each file to parse frontmatter. Extracts filename, file path, modification time, description, and memory type from each file. Results are sorted newest-first and capped at 200 files. Uses Promise.allSettled for resilience so individual file read failures do not block the entire scan. Also provides a formatter that renders memory headers as a text manifest with type tags, timestamps, and descriptions for use in model prompts.

## Exports
- `MemoryHeader` - type representing a memory file's metadata including filename, path, mtime, description, and type
- `scanMemoryFiles` - async function that scans a memory directory and returns up to 200 memory headers sorted newest-first
- `formatMemoryManifest` - formats an array of memory headers into a human-readable text manifest

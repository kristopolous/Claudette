## Purpose
Optimizes a diff of terminal patches by merging, deduplicating, and canceling redundant operations in a single pass.

## Imports
- **Internal**: `ink/frame`

## Logic
Iterates through a diff array and applies optimization rules: removes empty stdout patches, merges consecutive cursorMove patches, removes no-op cursorMove(0,0) patches, concatenates adjacent styleStr patches, deduplicates consecutive hyperlinks with the same URI, cancels cursor hide/show pairs, and removes clear patches with count 0. Collapses consecutive cursorTo operations keeping only the last. Returns the optimized diff with fewer patches to write to the terminal.

## Exports
- `optimize` - applies all optimization rules to a diff and returns the reduced result

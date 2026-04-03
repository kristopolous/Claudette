# utils/memory/types

## Purpose
Provides memory type definitions.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS
- **Internal**: (none)

## Logic
1. `MEMORY_TYPE_VALUES` - array of memory type values
2. Values: User, Project, Local, Managed, AutoMem
3. TeamMem included when TEAMMEM feature enabled
4. `MemoryType` - type derived from MEMORY_TYPE_VALUES

## Exports
- `MEMORY_TYPE_VALUES` - memory type values array
- `MemoryType` - memory type

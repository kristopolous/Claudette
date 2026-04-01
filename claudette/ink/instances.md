# ink/instances

## Purpose
Provides storage for all Ink instances to ensure consecutive render() calls use same instance.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink ink

## Logic
1. `instances` - Map<NodeJS.WriteStream, Ink>
2. Stores all instances of Ink
3. Ensures consecutive render() calls use same instance
4. Prevents creating new instance on each render
5. Map stored in separate file because render.js creates instances
6. instance.js should delete itself from map on unmount
7. `Ink` - Ink class

## Exports
- `instances` - instances map (default export)

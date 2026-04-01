# ink/line-width-cache

## Purpose
Provides line width caching for streaming text rendering.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink stringWidth

## Logic
1. During streaming, text grows but completed lines are immutable
2. Caching stringWidth per-line avoids re-measuring hundreds of unchanged lines on every token
3. ~50x reduction in stringWidth calls
4. `cache` - Map<string, number> for caching line widths
5. `MAX_CACHE_SIZE` (4096) - max cache size
6. `lineWidth` - gets cached or computed line width
7. Returns cached value if exists
8. Computes width via stringWidth if not cached
9. Evicts cache when size >= MAX_CACHE_SIZE (simple full-clear)
10. Cache repopulates in one frame after clear
11. `stringWidth` - gets string width

## Exports
- `cache` - line width cache
- `MAX_CACHE_SIZE` - max cache size constant
- `lineWidth` - gets line width

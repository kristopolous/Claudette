# debugFilter

## Purpose
Parse and apply debug filter strings to control which debug messages are shown based on category inclusion/exclusion.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/memoize`
- **Internal**: (none)

## Logic
1. `DebugFilter` type: `{ include: string[], exclude: string[], isExclusive: boolean }`
2. `parseDebugFilter` - memoized parser that splits comma-separated filter string
3. Filters starting with `!` are exclusive (exclude mode), others are inclusive (include mode)
4. Mixed inclusive/exclusive filters return null (error case)
5. Empty/whitespace-only filter strings return null (show all)
6. `extractDebugCategories` - extracts categories from message using multiple patterns:
   - `"category: message"` → `["category"]`
   - `"[CATEGORY] message"` → `["category"]`
   - `MCP server "name": message` → `["mcp", "name"]`
   - `"[ANT-ONLY] 1P event: tengu_timer"` → `["ant-only", "1p"]`
   - Secondary categories after first pattern (e.g., `"AutoUpdaterWrapper: Installation type: development"`)
7. All categories normalized to lowercase, duplicates removed
8. `shouldShowDebugCategories` - checks if categories match filter:
   - No filter → show all
   - No categories → hide (security default)
   - Exclusive mode → show if NONE of categories in exclude list
   - Inclusive mode → show if ANY category in include list
9. `shouldShowDebugMessage` - combines extraction + filtering in one call

## Exports
- `DebugFilter` - type: `{ include: string[], exclude: string[], isExclusive: boolean }`
- `parseDebugFilter(filterString?)` - memoized parser, returns `DebugFilter | null`
- `extractDebugCategories(message)` - returns `string[]` of lowercase categories
- `shouldShowDebugCategories(categories, filter)` - returns `boolean`
- `shouldShowDebugMessage(message, filter)` - returns `boolean`

## Source
`debugFilter`

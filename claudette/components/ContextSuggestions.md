## Purpose
Displays a list of context optimization suggestions with severity icons and estimated token savings.

## Imports
- **Stdlib**: None
- **External**: `react`, `figures`
- **Internal**: `ink`, `StatusIcon`, `formatTokens`, `ContextSuggestion` type

## Logic
1. Returns null if no suggestions are provided
2. Renders a bold "Suggestions" header followed by each suggestion
3. Each suggestion displays a severity status icon, title, optional token savings estimate, and detail text
4. Token savings are formatted with a human-readable token count and arrow indicator

## Exports
- `ContextSuggestions` - renders context optimization suggestions with severity, title, token savings, and detail descriptions

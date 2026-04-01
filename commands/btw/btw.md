## Purpose
Ask a quick side question without interrupting the main conversation.

## Imports
- **External**: `usehooks-ts` (useInterval), React
- **Internal**: Markdown component, SpinnerGlyph, arrow key constants, size hooks, context utilities, ScrollBox, side question runner, system prompt utilities

## Logic
1. Takes required `<question>` argument; shows usage if missing
2. Increments btwUseCount in global config for analytics
3. Renders BtwSideQuestion component that:
   - Shows question prompt with "/btw " prefix
   - Automatically sends question to Claude as a side query
   - Displays loading spinner while waiting
   - Shows response (or error) in scrollable Markdown box
   - Supports keyboard: ↑/↓ (scroll), Space/Enter/Escape (dismiss)
   - Uses buildCacheSafeParams to reuse prompt cache prefix
4. The side question runs in parallel without disrupting the main conversation
5. Returns null (immediate) while the async response renders inline

## Exports
- `call` - async LocalJSXCommandCall that returns React component or null

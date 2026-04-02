# tokenBudget

## Purpose
Parses token budget shorthand (e.g. `+500k`) and verbose (e.g. `use 2M tokens`) syntax from text. Returns the numeric token count or positions of budget mentions for highlighting/stripping.

## Imports
- **Stdlib**: (none)

## Logic
Three regex patterns match budget syntax:
1. `SHORTHAND_START_RE` — anchored to start of string (`^\s*\+500k`)
2. `SHORTHAND_END_RE` — anchored to end of string (`\s\+500k\s*[.!?]?\s*$`)
3. `VERBOSE_RE` — matches anywhere (`\buse/spend N tokens\b`)

Suffix multipliers: k=1,000, m=1,000,000, b=1,000,000,000. `findTokenBudgetPositions` avoids double-counting when input is just `+500k` (both start and end regex match).

## Exports
- `parseTokenBudget(text)` — returns parsed token count as number, or null if no budget syntax found
- `findTokenBudgetPositions(text)` — returns array of `{start, end}` positions for all budget mentions in text
- `getBudgetContinuationMessage(pct, turnTokens, budget)` — returns a formatted string like "Stopped at 80% of token target (1,200,000 / 1,500,000). Keep working — do not summarize."
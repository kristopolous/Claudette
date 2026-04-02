# keyword

## Purpose
Detects `ultraplan` and `ultrareview` keyword trigger positions in user text, with extensive false-positive filtering. Used by PromptInput to highlight the keyword and show a "will launch" notification.

## Imports
(none)

## Logic
1. `findKeywordTriggerPositions` is the core algorithm. It finds keyword positions while skipping false positives:
   - **Paired delimiters**: Skips occurrences inside backticks, double quotes, angle brackets (tag-like only), curly braces, square brackets, and single quotes (with apostrophe detection — opening quote must be preceded by non-word char).
   - **Path/identifier context**: Skips if preceded or followed by `/`, `\`, or `-`, or followed by `.` + word char (file extension). Prevents `src/ultraplan/foo.ts`, `ultraplan.tsx`, `--ultraplan-mode` from triggering.
   - **Question mark**: Skips if followed by `?` (a question about the feature shouldn't invoke it).
   - **Slash commands**: Returns empty if text starts with `/` (slash command input, not keyword detection).
2. Delimiter pairing uses a single-pass scan tracking `openQuote` state. Innermost bracket matching for `[` (handles `[Pasted text #N]` placeholders).
3. `replaceUltraplanKeyword` replaces the first triggerable occurrence with just the suffix (e.g. `ultraplan` → `plan`, `Ultraplan` → `Plan`), preserving the user's casing. Returns empty string if the result would be all-whitespace.

## Exports
- `findUltraplanTriggerPositions(text)` — returns array of `{word, start, end}` for ultraplan triggers
- `findUltrareviewTriggerPositions(text)` — returns array of `{word, start, end}` for ultrareview triggers
- `hasUltraplanKeyword(text)` — returns true if text contains a valid ultraplan trigger
- `hasUltrareviewKeyword(text)` — returns true if text contains a valid ultrareview trigger
- `replaceUltraplanKeyword(text)` — replaces first ultraplan trigger with `plan` (preserving casing)

## Purpose
Expands tab characters in text to spaces based on tab stops, inspired by Ghostty's tabstop implementation.

## Imports
- **Stdlib**: None specified
- **External**: None specified
- **Internal**: stringWidth function from stringWidth module, createTokenizer function from termio/tokenize module

## Logic
1. Checks if text contains tab characters; if not, returns original text
2. Creates a tokenizer and feeds it the text to get tokens
3. Processes tokens sequentially:
   - For sequence tokens (like ANSI escape codes), appends them directly to result
   - For text tokens, splits by tabs and newlines
   - For tabs, calculates needed spaces to reach next tab stop (default 8 columns)
   - For newlines, resets column counter
   - For regular text, appends text and advances column by string width
4. Returns the expanded text with tabs replaced by appropriate spaces

## Exports
- `expandTabs` - Function that takes text and optional tab interval, returns string with tabs expanded to spaces
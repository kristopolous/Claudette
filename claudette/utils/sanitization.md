# sanitization

## Purpose
Unicode sanitization for hidden character attack mitigation. Protects against ASCII smuggling and hidden prompt injection vulnerabilities using invisible Unicode characters (Tag characters, format controls, private use areas, noncharacters).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `partiallySanitizeUnicode(prompt)` - iteratively sanitizes a string until no more changes occur or max iterations (10) reached; applies NFKC normalization, then removes dangerous Unicode categories via two methods: (a) regex with Unicode property classes `[\p{Cf}\p{Co}\p{Cn}]` and (b) explicit character ranges for zero-width spaces, directional formatting, directional isolates, BOM, and BMP private use; crashes with error if max iterations reached
2. `recursivelySanitizeUnicode(value)` - overloaded function that sanitizes strings, arrays, and objects recursively; for strings calls partiallySanitizeUnicode; for arrays maps recursively; for objects sanitizes both keys and values; returns primitive values (numbers, booleans, null, undefined) unchanged
3. Referenced attack: HackerOne #3086545 targeting Claude Desktop's MCP implementation

## Exports
- `partiallySanitizeUnicode(prompt: string)` - sanitizes a single string iteratively
- `recursivelySanitizeUnicode(value: string)` - sanitizes a string
- `recursivelySanitizeUnicode<T>(value: T[])` - sanitizes an array recursively
- `recursivelySanitizeUnicode<T extends object>(value: T)` - sanitizes an object recursively (keys and values)

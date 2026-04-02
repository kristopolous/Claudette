# staticPrefix

## Purpose
PowerShell static command prefix extraction. Mirrors bash's prefix extraction but uses the PowerShell AST parser. Feeds the "Yes, and don't ask again for: ___" editable input in the permission dialog.

## Imports
- **Internal**: ../bash/registry, ../shell/specPrefix, ../stringUtils, ./dangerousCmdlets, ./parser

## Logic
1. `extractPrefixFromElement()` extracts a prefix from a single parsed command element. Returns null for applications (path-like names), NEVER_SUGGEST cmdlets, or commands with dynamic args. For external commands, consults fig spec registry and uses buildPrefix for depth-aware subcommand extraction. Guards against word-splitting bugs (positional arg matching) and bare-root over-broad rules.
2. `getCommandPrefixStatic()` parses the command, finds the first CommandAst, returns a prefix suggestion. Returns null on parse failure or when no safe prefix can be extracted.
3. `getCompoundCommandPrefixesStatic()` handles compound commands (semicolon/&&/|| chains). Extracts prefixes for all subcommands, skips excluded ones, then collapses prefixes sharing a root via word-aligned LCP. Guards against collapsing to bare subcommand-aware roots (e.g. "git" from "git add" + "git commit").
4. `wordAlignedLCP()` computes word-aligned longest common prefix. Case-insensitive comparison, emits first-seen casing. Never chops mid-word.

## Exports
- `getCommandPrefixStatic` - Returns { commandPrefix: string | null } for a PowerShell command
- `getCompoundCommandPrefixesStatic` - Returns string[] of prefixes for compound commands, with LCP collapse

## Source
`staticPrefix`

# utils/bash/treeSitterAnalysis

## Purpose
Tree-sitter AST analysis utilities for bash command security validation.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `TreeSitterNode` - type, text, startIndex, endIndex, children, childCount
2. `QuoteContext` - withDoubleQuotes, fullyUnquoted, unquotedKeepQuoteChars
3. `CompoundStructure` - hasCompoundOperators, hasPipeline, hasSubshell, hasCommandGroup, operators, segments
4. `DangerousPatterns` - hasCommandSubstitution, hasProcessSubstitution, hasParameterExpansion, hasHeredoc, hasComment
5. `TreeSitterAnalysis` - combines quoteContext, compoundStructure, hasActualOperatorNodes, dangerousPatterns
6. `QuoteSpans` - raw (single-quoted), ansiC ($'...'), double, heredoc spans
7. Single-pass collection of quote-related spans (5x faster than separate walks)
8. Replicates per-type walk semantics: each walk stops at its own type
9. raw_string walk recurses through string nodes to find nested raw_string inside $()
10. Native NAPI parser returns plain JS objects - no cleanup needed
11. Used by security validators for accurate bash command analysis

## Exports
- `TreeSitterNode` - AST node type
- `QuoteContext` - quote context type
- `CompoundStructure` - compound structure type
- `DangerousPatterns` - dangerous patterns type
- `TreeSitterAnalysis` - analysis result type
- `QuoteSpans` - quote spans type
- (Analysis functions)

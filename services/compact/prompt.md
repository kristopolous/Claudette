# compact/prompt

## Purpose
Provides compact summary prompts and instructions for conversation summarization.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: message types, proactive module (conditional)

## Logic
1. `NO_TOOLS_PREAMBLE` - aggressive no-tools instruction to prevent wasted turns
2. Emphasizes TEXT ONLY response, no tool calls (Read, Bash, Grep, etc.)
3. Tool calls rejected with maxTurns:1 means no text output → streaming fallback
4. `DETAILED_ANALYSIS_INSTRUCTION_BASE` - full conversation analysis instructions
5. `DETAILED_ANALYSIS_INSTRUCTION_PARTIAL` - scoped to recent messages only
6. `<analysis>` block is drafting scratchpad stripped by formatCompactSummary
7. `BASE_COMPACT_PROMPT` - main compact prompt with 9 required sections:
   - Primary Request and Intent
   - Key Technical Concepts
   - Files and Code Sections (with full snippets)
   - Errors and fixes
   - Problem Solving
   - All user messages (not tool results)
   - Pending Tasks
   - Current Work (detailed, with code snippets)
   - Optional Next Step (with verbatim quotes)
8. Proactive module conditionally imported for PROACTIVE/KAIROS features

## Exports
- `NO_TOOLS_PREAMBLE` - no-tools instruction text
- `DETAILED_ANALYSIS_INSTRUCTION_BASE` - full analysis instructions
- `DETAILED_ANALYSIS_INSTRUCTION_PARTIAL` - partial analysis instructions
- `BASE_COMPACT_PROMPT` - main compact prompt template
- (Additional compact prompt variants)

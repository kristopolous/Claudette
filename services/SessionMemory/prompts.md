# SessionMemory/prompts

## Purpose
Provides prompt templates for session memory extraction and updates.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: (none)
- **Internal**: tokenEstimation, envUtils, errors, log

## Logic
1. `MAX_SECTION_LENGTH` (2000), `MAX_TOTAL_SESSION_MEMORY_TOKENS` (12000) - limits
2. `DEFAULT_SESSION_MEMORY_TEMPLATE` - template with sections:
   - Session Title, Current State, Task specification
   - Files and Functions, Workflow, Errors & Corrections
   - Codebase and System Documentation, Learnings
   - Key results, Worklog
3. `getDefaultUpdatePrompt` - main update prompt with critical rules
4. Structure preservation: headers and italic descriptions must stay intact
5. Only updates content BELOW italic section descriptions
6. Parallel Edit tool calls in single message
7. Detailed, info-dense content with specifics (file paths, function names, errors)
8. Skips sections with no substantial new insights (no filler)
9. Always updates "Current State" for continuity after compaction
10. Per-section ~2000 token limit with condensation

## Exports
- `MAX_SECTION_LENGTH`, `MAX_TOTAL_SESSION_MEMORY_TOKENS` - limits
- `DEFAULT_SESSION_MEMORY_TEMPLATE` - session memory template
- `getDefaultUpdatePrompt` - default update prompt

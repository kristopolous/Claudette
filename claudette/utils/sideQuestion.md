# sideQuestion

## Purpose
Side Question ("/btw") feature — allows asking quick questions without interrupting the main agent context. Uses `runForkedAgent` to leverage prompt caching from the parent context while keeping the side question response separate.

## Imports
- **Internal**: ../services/api/errorUtils, ../services/api/logging, ../types/message, ./forkedAgent, ./messages

## Logic
1. `BTW_PATTERN` - regex `/^\/btw\b/gi` to detect "/btw" at start of input (case-insensitive, word boundary)
2. `findBtwTriggerPositions(text)` - finds positions of "/btw" keyword for UI highlighting (similar to findThinkingTriggerPositions)
3. `runSideQuestion({ question, cacheSafeParams })` - runs a forked agent with:
   - Question wrapped in a system-reminder instructing: no tools, single response, no follow-up turns, answer from existing context only
   - `canUseTool` always returns `deny` with reason `side_question`
   - `maxTurns: 1` — single turn only
   - `skipCacheWrite: true` — no future request shares this suffix
   - Does NOT override thinkingConfig (thinking is part of the API cache key; diverging busts the prompt cache)
   - `querySource: 'side_question'`, `forkLabel: 'side_question'`
4. `extractSideQuestionResponse(messages)` - extracts display string from forked agent messages:
   - Flattens all assistant content blocks across per-block messages (claude.ts yields one AssistantMessage per content block, not per API response)
   - Concatenates text blocks via `extractTextContent`
   - If no text but model tried tool_use → returns error message suggesting rephrasing
   - If no assistant content (API error exhausted retries) → surfaces the first system api_error message
5. `SideQuestionResult` type: `{ response: string | null, usage: NonNullableUsage }`

## Exports
- `findBtwTriggerPositions` - finds "/btw" positions in text for highlighting
- `SideQuestionResult` - type alias for the result of runSideQuestion
- `runSideQuestion` - async function that runs a side question via forked agent

## Source
`sideQuestion`

### Helpful Prompt Templates

- **Side question wrapper instructions** - "<system-reminder>This is a side question from the user. You must answer this question directly in a single response.\n\nIMPORTANT CONTEXT:\n- You are a separate, lightweight agent spawned to answer this one question\n- The main agent is NOT interrupted - it continues working independently in the background\n- You share the conversation context but are a completely separate instance\n- Do NOT reference being interrupted or what you were \"previously doing\" - that framing is incorrect\n\nCRITICAL CONSTRAINTS:\n- You have NO tools available - you cannot read files, run commands, search, or take any actions\n- This is a one-off response - there will be no follow-up turns\n- You can ONLY provide information based on what you already know from the conversation context\n- NEVER say things like \"Let me try...\", \"I'll now...\", \"Let me check...\", or promise to take any action\n- If you don't know the answer, say so - do not offer to look it up or investigate\n\nSimply answer the question with the information you have.</system-reminder>\n\n${question}"

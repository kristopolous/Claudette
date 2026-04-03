# compact/prompt

## Purpose
Provides compact summary prompts and instructions for conversation summarization.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS
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

### Helpful Prompt Templates

- **No-tools preamble (injected before every compact prompt)** - "CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.

- Do NOT use Read, Bash, Grep, Glob, Edit, Write, or ANY other tool.
- You already have all the context you need in the conversation above.
- Tool calls will be REJECTED and will waste your only turn — you will fail the task.
- Your entire response must be plain text: an <analysis> block followed by a <summary> block."

- **Detailed analysis instruction (BASE — full conversation)** - "Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
   - Errors that you ran into and how you fixed them
   - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly."

- **Detailed analysis instruction (PARTIAL — recent messages only)** - "Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Analyze the recent messages chronologically. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
   - Errors that you ran into and how you fixed them
   - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly."

- **Base compact prompt (full conversation summarization)** - "Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

[DETAILED_ANALYSIS_INSTRUCTION_BASE]

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List all errors that you ran into, and how you fixed them. Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages that are not tool results. These are critical for understanding the users' feedback and changing intent.
7. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
8. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
9. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's most recent explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests or really old requests that were already completed without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation."

- **Partial compact prompt (recent messages only)** - "Your task is to create a detailed summary of the RECENT portion of the conversation — the messages that follow earlier retained context. The earlier messages are being kept intact and do NOT need to be summarized. Focus your summary on what was discussed, learned, and accomplished in the recent messages only.

[DETAILED_ANALYSIS_INSTRUCTION_PARTIAL]

Your summary should include the following sections:

1. Primary Request and Intent: Capture the user's explicit requests and intents from the recent messages
2. Key Technical Concepts: List important technical concepts, technologies, and frameworks discussed recently.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List errors encountered and how they were fixed.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages from the recent portion that are not tool results.
7. Pending Tasks: Outline any pending tasks from the recent messages.
8. Current Work: Describe precisely what was being worked on immediately before this summary request.
9. Optional Next Step: List the next step related to the most recent work. Include direct quotes from the most recent conversation."

- **Partial compact up_to prompt (summarize prefix, keep suffix)** - "Your task is to create a detailed summary of this conversation. This summary will be placed at the start of a continuing session; newer messages that build on this context will follow after your summary (you do not see them here). Summarize thoroughly so that someone reading only your summary and then the newer messages can fully understand what happened and continue the work.

[DETAILED_ANALYSIS_INSTRUCTION_BASE]

Your summary should include the following sections:

1. Primary Request and Intent: Capture the user's explicit requests and intents in detail
2. Key Technical Concepts: List important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List errors encountered and how they were fixed.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages that are not tool results.
7. Pending Tasks: Outline any pending tasks.
8. Work Completed: Describe what was accomplished by the end of this portion.
9. Context for Continuing Work: Summarize any context, decisions, or state that would be needed to understand and continue the work in subsequent messages."

- **No-tools trailer (appended after every compact prompt)** - "REMINDER: Do NOT call any tools. Respond with plain text only — an <analysis> block followed by a <summary> block. Tool calls will be rejected and you will fail the task."

- **Session continuation message (post-compact, suppress follow-up)** - "This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.

[formatted summary]

Continue the conversation from where it left off without asking the user any further questions. Resume directly — do not acknowledge the summary, do not recap what was happening, do not preface with \"I'll continue\" or similar. Pick up the last task as if the break never happened."

- **Session continuation (proactive/autonomous mode)** - "You are running in autonomous/proactive mode. This is NOT a first wake-up — you were already working autonomously before compaction. Continue your work loop: pick up where you left off based on the summary above. Do not greet the user or ask what to work on."

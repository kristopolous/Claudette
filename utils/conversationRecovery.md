# utils/conversationRecovery

## Purpose
Provides conversation recovery utilities for session resume and consistency checking.

## Imports
- **Stdlib**: `path`
- **External**: `bun:bundle`
- **Internal**: cwd, bootstrap state, ids, logs types, message types, permissions, attachments, fileHistory, log, messages, plans, sessionStart, sessionStorage, toolResultStorage

## Logic
1. `migrateLegacyAttachmentTypes` - migrates legacy attachment types
2. Handles backward compatibility for attachment type changes
3. `loadConversationForResume` - loads conversation for resume
4. Checks resume consistency
5. Builds conversation chain from logs
6. Filters orphaned thinking-only messages
7. Filters unresolved tool uses
8. Filters whitespace-only assistant messages
9. Normalizes messages for API
10. `checkResumeConsistency` - checks if resume is consistent
11. `getLastSessionLog` - gets last session log
12. `getSessionIdFromLog` - extracts session ID from log
13. `isLiteLog` - checks if log is lite (messages not loaded)
14. `loadFullLog` - loads full log with messages
15. `loadMessageLogs` - loads message logs
16. `loadTranscriptFile` - loads transcript file
17. `removeExtraFields` - removes extra fields from serialized data
18. `buildConversationChain` - builds conversation chain
19. `processSessionStartHooks` - processes session start hooks
20. `suppressNextSkillListing` - suppresses skill listing
21. `addInvokedSkill` - adds invoked skill
22. `copyFileHistoryForResume` - copies file history for resume
23. `copyPlanForResume` - copies plan for resume
24. `createAssistantMessage`, `createUserMessage` - message creation
25. `NO_RESPONSE_REQUESTED` - no response constant

## Exports
- `loadConversationForResume` - loads conversation for resume
- `checkResumeConsistency` - checks resume consistency
- `getLastSessionLog` - gets last session log
- `getSessionIdFromLog` - extracts session ID
- `isLiteLog` - checks lite log
- `loadFullLog` - loads full log
- `loadMessageLogs` - loads message logs
- `loadTranscriptFile` - loads transcript
- `removeExtraFields` - removes extra fields
- `buildConversationChain` - builds conversation chain
- (Conversation recovery functions)

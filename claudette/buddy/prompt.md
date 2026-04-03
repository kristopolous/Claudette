# prompt

## Purpose
Provides companion intro attachment and system prompt helpers for the buddy feature.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS feature flag
- **Internal**: Message type, Attachment utils, config, companion

## Logic
1. `companionIntroText` - generates system prompt explaining companion behavior
2. Explains that companion is separate from the assistant, responds when addressed by name
3. Instructs assistant to stay out of the way (ONE line or less) when user addresses companion
4. `getCompanionIntroAttachment` - creates companion_intro attachment for message history
5. Skips if buddy feature disabled, no companion, or companion muted
6. Avoids duplicate attachments by checking existing message history

## Exports
- `companionIntroText` - generates companion system prompt text
- `getCompanionIntroAttachment` - creates intro attachment if not already present

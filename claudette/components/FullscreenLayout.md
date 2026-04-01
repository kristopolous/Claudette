## Purpose
Layout wrapper for the REPL that manages fullscreen mode with scrollable content, sticky prompts, message pills, and modal overlays.

## Imports
- **Stdlib**: url (fileURLToPath)
- **External**: figures, react, react/compiler-runtime
- **Internal**: ../context/modalContext.js (ModalContext), ../context/promptOverlayContext.js (PromptOverlayProvider, usePromptOverlay, usePromptOverlayDialog), ../hooks/useTerminalSize.js (useTerminalSize), ../ink/components/ScrollBox.js (ScrollBox), ../ink/instances.js (instances), ../ink.js (Box, Text), ../types/message.js (Message), ../utils/browser.js (openBrowser, openPath), ../utils/fullscreen.js (isFullscreenEnvEnabled), ../utils/stringUtils.js (plural), ./messages/nullRenderingAttachments.js (isNullRenderingAttachment), ./PromptInput/PromptInputFooterSuggestions.js (PromptInputFooterSuggestions), ./VirtualMessageList.js (StickyPrompt)

## Logic
In fullscreen mode, renders scrollable content in a ScrollBox with sticky scroll, pins bottom content via flexbox, and overlays a modal pane with a transcript peek area. Tracks unseen messages using a divider index and scroll height snapshot, displaying a "N new messages" pill when scrolled up. Manages sticky prompt headers that show the current conversation turn when scrolled into history. Outside fullscreen mode, renders content sequentially. Provides ScrollChromeContext for scroll-derived chrome updates and ModalContext for modal sizing.

## Exports
- `ScrollChromeContext` - Context for scroll-derived chrome like sticky headers and pills
- `useUnseenDivider` - Hook that tracks the unseen message divider position and provides scroll-away/repin handlers
- `countUnseenAssistantTurns` - Counts assistant message turns past a divider index, skipping tool-use-only entries
- `computeUnseenDivider` - Builds the unseen divider object with UUID and message count for the pill display
- `FullscreenLayout` - Main layout component that arranges scrollable content, bottom panel, overlays, and modals

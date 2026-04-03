# textInputTypes

## Purpose
Provides TypeScript types for text input components including inline ghost text and base props.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`, `crypto`, REACT
- **Internal**: agentSdkTypes, ink, config, imageResizer, textHighlighting, ids, message types

## Logic
1. `InlineGhostText` - mid-input command autocomplete (text, fullCommand, insertPosition)
2. `BaseTextInputProps` - base props for text input components
3. History navigation callbacks (onHistoryUp, onHistoryDown)
4. Placeholder text, multiline support (default true)
5. Focus routing for multiple input components
6. Password mask, cursor visibility, paste highlighting
7. Value/onChange controlled input pattern
8. onSubmit handler with Enter key support
9. Key event handlers for custom keybinding
10. Image dimensions for inline image previews
11. TextHighlight for selection/range highlighting
12. PermissionResult for tool permission prompts
13. AgentId, AssistantMessage, MessageOrigin for agent context

## Exports
- `InlineGhostText` - type for ghost text autocomplete
- `BaseTextInputProps` - type for text input base props
- (Many more text input related types)

## Purpose
Renders a message response with a decorative prefix and handles nesting to avoid duplicate indicators.

## Imports
- **Stdlib**: none
- **External**: react, react/compiler-runtime
- **Internal**: ../ink.js (Box, NoSelect, Text), ./design-system/Ratchet

## Logic
Uses a React context to detect if a MessageResponse is nested inside another MessageResponse. When nested, it renders children directly without the ⎿ prefix. When not nested, it wraps content in a provider and renders the prefix alongside children in a row layout. If no height is specified, the content is wrapped in a Ratchet component with offscreen locking.

## Exports
- `MessageResponse` - Renders message response content with optional height constraint and automatic prefix handling
- `MessageResponseProvider` - Provider component that sets the context to true for descendant MessageResponse components

## Purpose
Defines attachment types that render as null and provides a filter function to exclude them from the message render pipeline.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: attachment types, message types

## Logic
1. Maintains a const array of attachment type strings that should produce no visible output (hook success, plan mode reminders, token usage, etc.)
2. Exports a type alias for TypeScript exhaustiveness checking in AttachmentMessage's switch default branch
3. Creates a ReadonlySet for efficient lookup
4. isNullRenderingAttachment checks if a message is an attachment with a null-rendering type

## Exports
- `NullRenderingAttachmentType` - TypeScript type union of all null-rendering attachment types
- `isNullRenderingAttachment` - Returns true if the message is an attachment type that renders as null

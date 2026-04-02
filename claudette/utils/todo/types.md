# types (todo)

## Purpose
Defines Zod schemas and TypeScript types for todo items and todo lists, using lazy schemas to avoid circular dependencies.

## Imports
- **External**: zod/v4
- **Internal**: ../lazySchema

## Logic
Uses `lazySchema` wrappers to defer schema evaluation and avoid circular imports. `TodoStatusSchema` is an enum of `'pending' | 'in_progress' | 'completed'`. `TodoItemSchema` is an object with `content` (non-empty string), `status`, and `activeForm` (non-empty string). `TodoListSchema` is an array of `TodoItemSchema`.

## Exports
- `TodoItemSchema` - Lazy Zod schema for a todo item: `{ content: string, status: 'pending'|'in_progress'|'completed', activeForm: string }`
- `TodoItem` - Inferred TypeScript type from TodoItemSchema
- `TodoListSchema` - Lazy Zod schema: array of TodoItemSchema
- `TodoList` - Inferred TypeScript type from TodoListSchema

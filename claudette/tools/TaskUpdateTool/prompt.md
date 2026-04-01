# TaskUpdateTool/prompt.ts

## Purpose

Exports the prompt documentation and description for TaskUpdateTool. Explains how to update task status, fields, dependencies, and provides examples. Guides agents in managing task lifecycles within a shared todo list.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `PROMPT`: Multi-line string covering:
  - **Purpose**: Update a task in the task list
  - **When to Use**:
    - Mark tasks as resolved (completed work, no longer needed, assigned tasks must be resolved when done)
    - Delete tasks (no longer relevant or erroneous)
    - Update task details (changed requirements, dependencies)
  - **Fields You Can Update** (13 fields listed):
    - `status` (with status workflow reference)
    - `subject` (imperative title)
    - `description`
    - `activeForm` (present continuous for spinner)
    - `owner` (agent name)
    - `metadata` (merge keys; null to delete)
    - `addBlocks` (tasks blocked by this one)
    - `addBlockedBy` (tasks that must complete before this starts)
  - **Status Workflow**: `pending → in_progress → completed`; use `deleted` to remove
  - **Staleness**: Always read latest state with `TaskGet` before updating
  - **Examples**: JSON snippets for marking in_progress, completed, deleted, claiming owner, setting dependencies
- `DESCRIPTION = 'Update a task in the task list'`

## Exports

- `PROMPT: string`
- `DESCRIPTION: string`

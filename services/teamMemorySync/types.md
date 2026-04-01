# services/teamMemorySync/types

## Purpose
Provides Zod schemas and types for repo-scoped team memory sync API.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: lazySchema

## Logic
1. `TeamMemoryContentSchema` - entries record with optional entryChecksums
2. Keys are file paths relative to team memory directory
3. Values are UTF-8 string content (typically Markdown)
4. entryChecksums: per-key SHA-256 (`sha256:<hex>`), optional for forward-compat
5. `TeamMemoryDataSchema` - full GET response with organizationId, repo, version, lastModified, checksum, content
6. `TeamMemoryTooManyEntriesSchema` - structured 413 error body
7. error.details.error_code: 'team_memory_too_many_entries'
8. max_entries, received_entries for limit feedback
9. `SkippedSecretFile` - file skipped due to detected secret
10. path (relative), ruleId (gitleaks ID), label (human-readable)
11. `TeamMemorySyncFetchResult` - fetch result with success, data, isEmpty (404), error, errorType
12. `TeamMemorySyncPushResult` - push result with success, uploaded, skippedSecrets, error, errorType, httpStatus
13. `TeamMemorySyncUploadResult` - upload result type

## Exports
- `TeamMemoryContentSchema` - content schema
- `TeamMemoryDataSchema` - full data schema
- `TeamMemoryTooManyEntriesSchema` - too many entries error schema
- `TeamMemoryData` - inferred data type
- `SkippedSecretFile` - skipped secret file type
- `TeamMemorySyncFetchResult` - fetch result type
- `TeamMemorySyncPushResult` - push result type
- `TeamMemorySyncUploadResult` - upload result type

# filePersistence

## Purpose
Orchestrates file persistence at end of each turn, uploading modified files to the Files API in BYOC mode or reading file IDs via xattrs in Cloud mode.

## Imports
- **Stdlib**: BUILDFLAGS (feature), `path` (join, relative)
- **Internal**: ../../services/analytics/index (logEvent, AnalyticsMetadata), ../../services/api/filesApi (FilesApiConfig, uploadSessionFiles), ../cwd (getCwd), ../errors (errorMessage), ../log (logError), ../sessionIngressAuth (getSessionIngressAuthToken), ./outputsScanner (findModifiedFiles, getEnvironmentKind, logDebug), ./types (DEFAULT_UPLOAD_CONCURRENCY, FailedPersistence, FILE_COUNT_LIMIT, FilesPersistedEventData, OUTPUTS_SUBDIR, PersistedFile, TurnStartTime)

## Logic
1. `runFilePersistence` - main entry point:
   - Checks environment kind (only runs in 'byoc' mode currently)
   - Requires session access token and CLAUDE_CODE_REMOTE_SESSION_ID
   - Builds outputs dir path: {cwd}/{sessionId}/outputs
   - Routes to BYOC or Cloud execution
   - Logs started/completed analytics events with counts and duration
   - Returns null if no files to report
   - Catches errors and returns failed result

2. `executeBYOCPersistence` - BYOC mode:
   - Scans local filesystem for modified files via findModifiedFiles
   - Enforces FILE_COUNT_LIMIT (returns error if exceeded)
   - Filters out files resolving outside outputs directory (security)
   - Uploads files in parallel via uploadSessionFiles
   - Separates results into persisted and failed arrays

3. `executeCloudPersistence` - Cloud mode (stub):
   - TODO: read file_id from xattr on output files
   - Currently returns empty result

4. `executeFilePersistence` - wrapper that calls runFilePersistence and emits result via callback, swallows errors

5. `isFilePersistenceEnabled` - checks feature flag, environment kind, auth token, and session ID

## Exports
- `runFilePersistence` - async function that executes file persistence, returns FilesPersistedEventData or null
- `executeFilePersistence` - async wrapper that calls runFilePersistence and invokes callback with result
- `isFilePersistenceEnabled` - sync check if file persistence is fully configured

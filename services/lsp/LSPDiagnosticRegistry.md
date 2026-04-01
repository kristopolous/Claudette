# services/lsp/LSPDiagnosticRegistry

## Purpose
Stores LSP diagnostics received asynchronously from servers for attachment delivery.

## Imports
- **Stdlib**: `crypto`
- **External**: `lru-cache`
- **Internal**: debug, errors, log, JSON utils, diagnosticTracking

## Logic
1. `PendingLSPDiagnostic` - serverName, files, timestamp, attachmentSent
2. Follows AsyncHookRegistry pattern for consistent async attachment delivery
3. Pattern: publishDiagnostics → register → checkFor → getAttachments → deliver
4. `MAX_DIAGNOSTICS_PER_FILE` (10), `MAX_TOTAL_DIAGNOSTICS` (30) - volume limits
5. `MAX_DELIVERED_FILES` (500) - deduplication cache limit
6. `pendingDiagnostics` - Map of UUID-keyed pending diagnostics
7. `deliveredDiagnostics` - LRUCache tracking delivered diagnostic keys
8. Diagnostic keys: hash of message+severity+range
9. `registerPendingLSPDiagnostic` - stores diagnostic with UUID for uniqueness
10. Cross-turn deduplication prevents repeat attachments
11. Timestamp tracking for ordering and cleanup
12. `checkForLSPDiagnostics` - retrieves pending diagnostics
13. `getLSPDiagnosticAttachments` - converts to Attachment[]
14. `getAttachments` - delivers to conversation automatically

## Exports
- `PendingLSPDiagnostic` - pending diagnostic type
- `registerPendingLSPDiagnostic` - registers diagnostic from server
- `checkForLSPDiagnostics` - checks for pending diagnostics
- `getLSPDiagnosticAttachments` - gets diagnostic attachments
- `getAttachments` - gets attachments for delivery

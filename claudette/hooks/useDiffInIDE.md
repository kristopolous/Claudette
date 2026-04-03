## Purpose
Shows file edit diffs in the connected IDE via MCP; handles accept/reject/close and recomputes edits from modified content.

## Imports
- **External**: `crypto` (randomUUID), `path` (basename), REACT (useEffect, useMemo, useRef, useState)
- **Internal**:
  - src/services/analytics/index` (logEvent)
  - src/utils/fileRead` (readFileSync)
  - src/utils/path` (expandPath)
  - `./components/permissions/FilePermissionDialog/permissionOptions` (PermissionOption)
  - `./services/mcp/types` (MCPServerConnection, McpSSEIDEServerConfig, McpWebSocketIDEServerConfig)
  - `./Tool` (ToolUseContext)
  - `./tools/FileEditTool/types` (FileEdit)
  - `./tools/FileEditTool/utils` (getEditsForPatch, getPatchForEdits)
  - `./utils/config` (getGlobalConfig)
  - `./utils/diff` (getPatchFromContents)
  - `./utils/errors` (isENOENT)
  - `./utils/ide` (callIdeRpc, getConnectedIdeClient, getConnectedIdeName, hasAccessToIDEExtensionDiffFeature)
  - `./utils/idePathConversion` (WindowsToWSLConverter)
  - `./utils/log` (logError)
  - `./utils/platform` (getPlatform)

## Logic
- `useDiffInIDE({ onChange, toolUseContext, filePath, edits, editMode })`
  - Conditions: MCP clients present, `diffTool === 'auto'`, file not `.ipynb`
  - On mount: calls `showDiff()`
  - `showDiff()`: opens diff tab in IDE, waits for user action
    - Reads old content; sends `openDiff` RPC with new contents
    - Handles responses:
      * `FILE_SAVED` → resolves with saved content
      * `TAB_CLOSED` → resolves with computed updatedFile (no changes)
      * `DIFF_REJECTED` → rejects (no change)
    - On reject: closes tab, calls `onChange({type:'reject'}, original edits)`
    - On accept: recomputes edits via `computeEditsFromContents(old, new, mode)`; calls `onChange({type:'accept-once'}, newEdits)`
  - Returns `{ closeTabInIDE, showingDiffInIDE, ideName, hasError }`
- `computeEditsFromContents(filePath, oldContent, newContent, editMode)`: generates patch then edits to capture user modifications

## Exports
- `useDiffInIDE` - Hook returning `{ closeTabInIDE: () => Promise<void>, showingDiffInIDE: boolean, ideName: string, hasError: boolean }`
- `computeEditsFromContents` - Helper function `(filePath, oldContent, newContent, editMode) => FileEdit[]`

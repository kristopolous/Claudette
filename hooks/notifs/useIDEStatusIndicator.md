## Purpose
Manages multiple IDE-related notifications: hint to enable `/ide`, disconnected status, JetBrains-specific info, and installation errors.

## Imports
- **External**: `react` (useEffect, useRef)
- **Internal**:
  - `src/context/notifications.js` (useNotifications)
  - `src/ink.js` (Text)
  - `src/services/mcp/types.js` (MCPServerConnection)
  - `src/utils/config.js` (getGlobalConfig, saveGlobalConfig)
  - `src/utils/ide.js` (detectIDEs, IDEExtensionInstallationStatus, isJetBrainsIde, isSupportedTerminal)
  - `../../bootstrap/state.js` (getIsRemoteMode)
  - `../useIdeConnectionStatus.js` (useIdeConnectionStatus)
  - `../useIdeSelection.js` (IDESelection)

## Logic
Hook takes `Props`: `ideInstallationStatus`, `ideSelection`, `mcpClients`
Derived booleans:
- `isJetBrains`: ideInstallationStatus.ideType is JetBrains
- `showIDEInstallErrorOrJetBrainsInfo`: error exists or isJetBrains
- `shouldShowIdeSelection`: ideStatus === 'connected' && (filePath or text/lineCount)
- `shouldShowConnected`: connected but not showing selection
- `showIDEInstallError`: non-JetBrains error while not connected and not showing selection
- `showJetBrainsInfo`: isJetBrains and not connected and not showing selection

Four independent effects (all suppressed in remote mode):
1. **IDE hint** (`ide-status-hint`): if unsupported terminal, no ideStatus yet, and showJetBrainsInfo, and shown count < 5 → after 3s, detectIDEs → low-priority hint " /ide for <name>"
2. **Disconnected** (`ide-status-disconnected`): when ideStatus becomes "disconnected" with ideName known (and not showing JetBrains info/error)
3. **JetBrains info** (`ide-status-jetbrains-disconnected`): when showJetBrainsInfo, prompts "/status for info"
4. **Install error** (`ide-status-install-error`): when showIDEInstallError, prompts see /status

Notifications removed when conditions no longer apply.

## Exports
- `useIDEStatusIndicator` - Hook `(props: { ideInstallationStatus: IDEExtensionInstallationStatus | null, ideSelection: IDESelection | undefined, mcpClients: MCPServerConnection[] }) => void`

# wrapper

## Purpose
Safe: `binding` is only populated when `currentToolUseContext` is set.

## Imports
- **Stdlib**: react
- **External**: @ant/computer-use-mcp
- **Internal**: ../../bootstrap/state.js, ../../components/permissions/ComputerUseApproval/ComputerUseApproval.js, ../../Tool.js, ../debug.js, ./computerUseLock.js, ./escHotkey.js, ./gates.js, ./hostAdapter.js, ./toolRendering.js

## Items

### tuc
**Type**: Function

### formatLockHeld
**Type**: Function

### buildSessionContext
**Type**: Function

### getOrBind
**Type**: Function

### getComputerUseMCPToolOverrides
**Type**: Function

### runPermissionDialog
**Type**: Function

### CallOverride
**Type**: Type alias

### Binding
**Type**: Type alias

### ComputerUseMCPToolOverrides
**Type**: Type alias

## Exports
- buildSessionContext
- getComputerUseMCPToolOverrides

## Source
`wrapper.tsx`
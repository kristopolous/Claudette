# components/ClaudeCodeHint/PluginHintMenu

## Purpose
Provides plugin recommendation hint menu component.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink (Box, Text), CustomSelect select (Select), permissions PermissionDialog (PermissionDialog)

## Logic
1. `Props` - { pluginName, pluginDescription?, marketplaceName, sourceCommand, onResponse }
2. `AUTO_DISMISS_MS` (30s) - auto-dismiss timeout
3. `PluginHintMenu` - UI component for plugin hint menu
4. Uses useRef for onResponse to handle timeout callback
5. Auto-dismisses to 'no' after AUTO_DISMISS_MS
6. `onSelect` - handles selection: 'yes' → onResponse('yes'), 'disable' → onResponse('disable'), default → onResponse('no')
7. Options:
   - "Yes, install {pluginName}" (value: 'yes')
   - "No" (value: 'no')
   - "No, and don't show plugin installation hints again" (value: 'disable')
8. Renders PermissionDialog with title "Plugin Recommendation"
9. Shows source command suggestion
10. Shows plugin name and marketplace
11. Shows plugin description if available
12. Shows Select component with options
13. onCancel calls onResponse('no')

## Exports
- `PluginHintMenu` - plugin hint menu component

# components/LspRecommendation/LspRecommendationMenu

## Purpose
Provides LSP plugin recommendation menu component.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink, CustomSelect select, permissions PermissionDialog

## Logic
1. `Props` - { pluginName, pluginDescription?, fileExtension, onResponse }
2. `AUTO_DISMISS_MS` (30s) - auto-dismiss timeout
3. `LspRecommendationMenu` - UI component for LSP recommendation
4. Uses useRef for onResponse to avoid timer reset when onResponse changes
5. 30-second auto-dismiss timer counts as ignored (no)
6. `onSelect` - handles selection: 'yes' → onResponse('yes'), 'no' → onResponse('no'), 'never' → onResponse('never'), 'disable' → onResponse('disable')
7. Options:
   - "Yes, install {pluginName}" (value: 'yes')
   - "No, not now" (value: 'no')
   - "Never for {pluginName}" (value: 'never')
   - "Disable all LSP recommendations" (value: 'disable')
8. Renders PermissionDialog with title "LSP Plugin Recommendation"
9. Explains LSP provides code intelligence (go-to-definition, error checking)
10. Shows plugin name and description if available
11. Shows file extension that triggered recommendation
12. Shows Select component with options
13. onCancel calls onResponse('no')

## Exports
- `LspRecommendationMenu` - LSP recommendation menu component

## Purpose
Command to display and manage privacy settings, specifically the "Help improve Claude" (grove) feature.

## Imports
- **External**: `react`
- **Internal**: 
  - `../../components/grove/Grove.js` (GroveDecision, GroveDialog, PrivacySettingsDialog)
  - `../../services/analytics/index.js` (logEvent, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
  - `../../services/api/grove.js` (getGroveSettings, getGroveNoticeConfig, isQualifiedForGrove)
  - `../../types/command.js` (LocalJSXCommandOnDone)

## Logic
1. Check if user is qualified for Grove feature
2. If not qualified, show fallback message and exit
3. Fetch current privacy settings and notice config in parallel
4. If settings fetch fails, show fallback message
5. Depending on whether user has already accepted terms:
   - If accepted (settings.grove_enabled is not null): show PrivacySettingsDialog directly
   - If not accepted: show GroveDialog to prompt for acceptance
6. When dialog completes, re-fetch settings and report the final grove_enabled status
7. Log analytics event if the grove setting changed

## Exports
- `call` - Main command function that renders the appropriate privacy settings dialog

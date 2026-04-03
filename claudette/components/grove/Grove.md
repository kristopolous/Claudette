# components/grove/Grove

## Purpose
Provides Grove privacy settings dialog component.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: analytics, ink, API grove, CustomSelect index, design-system Byline/Dialog/KeyboardShortcutHint

## Logic
1. `GroveDecision` - 'accept_opt_in' | 'accept_opt_out' | 'defer' | 'escape' | 'skip_rendering'
2. `Props` - { showIfAlreadyViewed, location, onDone }
3. `NEW_TERMS_ASCII` - ASCII art for new terms notification
4. `GracePeriodContentBody` - UI component for grace period content
5. Uses REACT_COMPILER runtime (_c) for memoization
6. Shows update to Consumer Terms and Privacy Policy effective October 8, 2025
7. Explains changes: help improve Claude (opt-in for chat usage), data retention extended to 5 years
8. Links to data privacy controls, news, and terms
9. `GroveDialog` - main UI component for Grove dialog
10. Uses useEffect, useState for state management
11. Uses useInput for keyboard input handling
12. Uses Select component for decision selection
13. Calculates shouldShowGrove via calculateShouldShowGrove
14. Gets/updates Grove settings via getGroveSettings, updateGroveSettings
15. Gets Grove notice config via getGroveNoticeConfig
16. Marks notice viewed via markGroveNoticeViewed
17. `AccountSettings`, `GroveConfig` - settings types
18. `calculateShouldShowGrove` - calculates if should show Grove
19. `getGroveNoticeConfig` - gets Grove notice config
20. `getGroveSettings` - gets Grove settings
21. `markGroveNoticeViewed` - marks notice viewed
22. `updateGroveSettings` - updates Grove settings
23. `logEvent`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - analytics types

## Exports
- `GroveDecision` - Grove decision type
- `GroveDialog` - Grove dialog component
- `PrivacySettingsDialog` - privacy settings dialog component

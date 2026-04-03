# components/LogoV2/feedConfigs

## Purpose
Provides feed configuration factory functions for LogoV2 welcome screen feeds.

## Imports
- **Stdlib**: `os` (homedir)
- **External**: `figures`, REACT
- **Internal**: projectOnboardingState, API referral, types/logs, utils/cwd, utils/format, LogoV2 Feed

## Logic
1. `createRecentActivityFeed(activities)` - maps LogOption[] to FeedLine[] with relative timestamps, returns FeedConfig with title "Recent activity" and footer "/resume for more"
2. `createWhatsNewFeed(releaseNotes)` - maps release notes to FeedLine[], parses timestamp/text for ant builds, returns FeedConfig with title "What's new" and footer "/release-notes for more"
3. `createProjectOnboardingFeed(steps)` - filters enabled steps, sorts by completion, adds home directory warning if cwd === homedir, returns FeedConfig with title "Tips for getting started"
4. `createGuestPassesFeed()` - returns FeedConfig with customContent showing guest pass stars and referral subtitle, width 48, footer "/passes"

## Exports
- `createRecentActivityFeed` - creates recent activity feed config
- `createWhatsNewFeed` - creates what's new feed config
- `createProjectOnboardingFeed` - creates project onboarding feed config
- `createGuestPassesFeed` - creates guest passes feed config

# projectOnboardingState

## Purpose
Provides project onboarding state management utilities.

## Imports
- **Stdlib**: `path`
- **External**: `lodash-es/memoize`
- **Internal**: utils config, utils cwd, utils file, utils fsOperations

## Logic
1. `Step` - { key, text, isComplete, isCompletable, isEnabled }
2. `getSteps` - gets onboarding steps
3. Checks for CLAUDE.md file existence
4. Checks if workspace directory is empty
5. Returns workspace step (ask Claude to create app or clone repo)
6. Returns claudemd step (run /init to create CLAUDE.md)
7. `isProjectOnboardingComplete` - checks if onboarding complete
8. Filters steps by isCompletable and isEnabled
9. Checks if all filtered steps are complete
10. `maybeMarkProjectOnboardingComplete` - marks onboarding complete if conditions met
11. Short-circuits on cached config (isProjectOnboardingComplete hits filesystem)
12. Saves hasCompletedProjectOnboarding to current project config
13. `shouldShowProjectOnboarding` - memoized check if should show onboarding
14. Short-circuits on cached config before filesystem hit
15. Returns false if hasCompletedProjectOnboarding or projectOnboardingSeenCount >= 4 or IS_DEMO
16. Returns !isProjectOnboardingComplete
17. `incrementProjectOnboardingSeenCount` - increments seen count
18. Saves incremented count to current project config
19. `getCurrentProjectConfig`, `saveCurrentProjectConfig` - config functions
20. `getCwd` - gets current working directory
21. `isDirEmpty` - checks if directory empty
22. `getFsImplementation` - gets fs implementation

## Exports
- `Step` - step type
- `getSteps` - gets onboarding steps
- `isProjectOnboardingComplete` - checks if complete
- `maybeMarkProjectOnboardingComplete` - marks complete
- `shouldShowProjectOnboarding` - checks if should show
- `incrementProjectOnboardingSeenCount` - increments seen count

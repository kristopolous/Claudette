## Purpose
ANT-ONLY: Banner component intended to prompt users to report issues via /issue when friction is detected in the conversation.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `constants/figures`, `ink`

## Logic
1. Returns null in all builds (the component body is stripped for non-ANT builds)
2. In ANT builds, would render a warning-colored banner with flag icon and text prompting users to report issues

## Exports
- `IssueFlagBanner` - component that returns null (ANT-only feature, eliminated in external builds)

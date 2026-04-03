# components/LogoV2/Clawd

## Purpose
Provides Clawd ASCII art component with pose support.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, env

## Logic
1. `ClawdPose` - 'default' | 'arms-up' | 'look-left' | 'look-right'
2. arms-up: both arms raised (used during jump)
3. look-left: both pupils shifted left
4. look-right: both pupils shifted right
5. `Props` - { pose? }
6. Standard-terminal pose fragments, each row split into segments
7. Vary only parts that change (eyes, arms) while keeping body/bg spans stable
8. All poses end up 9 cols wide
9. arms-up: row-2 arm shapes (▝▜ / ▛▘) move to row 1 as bottom-heavy mirrors (▗▟ / ▙▖)
10. look-* use top-quadrant eye chars (▙/▟) so both eyes change from default (▛/▜, bottom pupils)
11. `Segments` - { r1L, r1E, r1R, r2L, r2R }
12. `POSES` - Record<ClawdPose, Segments> with pose definitions
13. Apple Terminal uses bg-fill trick, so only eye poses make sense
14. Arm poses fall back to default
15. `APPLE_EYES` - Record<ClawdPose, string> for Apple Terminal eye poses
16. `Clawd` - UI component for Clawd
17. Uses REACT_COMPILER runtime (_c) for memoization
18. Renders appropriate pose segments based on pose prop
19. Falls back to default pose if pose not provided
20. `env` - environment utilities
21. `Box`, `Text` - ink components

## Exports
- `ClawdPose` - Clawd pose type
- `Clawd` - Clawd component

# components/LogoV2/AnimatedClawd

## Purpose
Provides Clawd component with click-triggered animations.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, settings settings, LogoV2 Clawd

## Logic
1. `Frame` - { pose: ClawdPose, offset: number }
2. `hold` - holds a pose for n frames (60ms each)
3. Returns array of frames with same pose and offset
4. Offset semantics: marginTop in fixed-height-3 container
5. 0 = normal, 1 = crouched
6. Container height stays 3 so layout never shifts
7. During crouch (offset=1) Clawd's feet row dips below container and gets clipped
8. Reads as "ducking below the frame" before springing back up
9. `JUMP_WAVE` - click animation: crouch, spring up with arms raised, twice
10. `LOOK_AROUND` - click animation: glance right, left, back
11. `CLICK_ANIMATIONS` - array of click animations
12. `IDLE` - default idle frame
13. `FRAME_MS` (60) - frame duration in ms
14. `incrementFrame` - increments frame index
15. `CLAWD_HEIGHT` (3) - Clawd height
16. `AnimatedClawd` - UI component for animated Clawd
17. Uses useClawdAnimation for pose, bounceOffset, onClick
18. Renders Clawd with pose
19. Wraps in Box with marginTop={bounceOffset}, flexShrink={0}
20. Click only fires when mouse tracking enabled (inside AlternateScreen/fullscreen)
21. Otherwise renders and behaves identically to plain Clawd
22. `useEffect`, `useRef`, `useState` - UI hooks
23. `useClawdAnimation` - Clawd animation hook
24. `Clawd`, `ClawdPose` - Clawd component and pose type
25. `getInitialSettings` - gets initial settings
26. `Box` - ink box component

## Exports
- `AnimatedClawd` - animated Clawd component

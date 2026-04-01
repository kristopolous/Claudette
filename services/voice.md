# voice

## Purpose
Implements audio recording for push-to-talk voice input using native audio capture.

## Imports
- **Stdlib**: `child_process`, `fs/promises`
- **External**: (none)
- **Internal**: debug, envUtils, log, platform

## Logic
1. Uses native audio capture (cpal) on macOS, Linux, Windows
2. Falls back to SoX `rec` or arecord (ALSA) if native unavailable
3. `audioNapi` - lazy-loaded native audio module (audio-capture-napi)
4. Load deferred to first voice keypress (avoids 1-8s startup freeze)
5. `loadAudioNapi` - loads module, triggers isNativeAudioAvailable check
6. `RECORDING_SAMPLE_RATE` (16000), `RECORDING_CHANNELS` (1)
7. `SILENCE_DURATION_SECS` (2.0), `SILENCE_THRESHOLD` (3%) - SoX silence detection
8. `hasCommand` - checks if command exists via spawnSync --version
9. `probeArecord` - probes arecord device availability (memoized)
10. Handles WSL1/WSL2/WSLg differences for ALSA/PulseAudio
11. Returns early on Windows (no arecord)
12. 150ms timeout for device open detection

## Exports
- `RECORDING_SAMPLE_RATE`, `RECORDING_CHANNELS` - recording constants
- `SILENCE_DURATION_SECS`, `SILENCE_THRESHOLD` - silence detection constants
- `hasCommand` - checks command availability
- `probeArecord` - probes arecord device availability
- (Recording control functions)

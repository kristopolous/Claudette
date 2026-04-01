# utils/bash/bashAutoApprove

## Purpose
Provides bash command auto-approval logic for auto mode.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. Auto-approves safe bash commands in auto mode
2. Maintains allowlist of safe command patterns
3. Checks command against denylist for blocked commands
4. Uses classifier for ambiguous commands
5. Handles command prefixes and arguments
6. Supports glob patterns for command matching
7. Tracks approval history for learning
8. Integrates with yoloClassifier for ML-based approval

## Exports
- (Bash auto-approval functions)

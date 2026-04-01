# utils/classifierApprovals

## Purpose
Tracks classifier auto-approvals for tool uses (bash classifier, auto-mode transcript classifier).

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: signal

## Logic
1. `ClassifierApproval` - { classifier, matchedRule, reason }
2. `CLASSIFIER_APPROVALS` - Map of toolUseID to approval
3. `CLASSIFIER_CHECKING` - Set of toolUseIDs being checked
4. `classifierChecking` - signal for checking state changes
5. `setClassifierApproval` - sets bash classifier approval
6. BASH_CLASSIFIER feature-gated
7. `getClassifierApproval` - gets bash classifier approval
8. Returns matchedRule if classifier is 'bash'
9. `setYoloClassifierApproval` - sets auto-mode classifier approval
10. TRANSCRIPT_CLASSIFIER feature-gated
11. `getYoloClassifierApproval` - gets auto-mode classifier approval
12. Returns reason if classifier is 'auto-mode'
13. `setClassifierChecking` - marks tool use as being checked
14. `clearClassifierChecking` - clears checking state
15. `subscribeClassifierChecking` - subscribes to checking changes
16. `isClassifierChecking` - checks if tool use is being checked
17. `deleteClassifierApproval` - deletes approval entry

## Exports
- `ClassifierApproval` - classifier approval type
- `setClassifierApproval` - sets bash classifier approval
- `getClassifierApproval` - gets bash classifier approval
- `setYoloClassifierApproval` - sets auto-mode approval
- `getYoloClassifierApproval` - gets auto-mode approval
- `setClassifierChecking` - sets checking state
- `clearClassifierChecking` - clears checking state
- `subscribeClassifierChecking` - subscribes to changes
- `isClassifierChecking` - checks if checking
- `deleteClassifierApproval` - deletes approval

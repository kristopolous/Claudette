# useSkillImprovementSurvey

## Purpose
Manages the skill improvement survey modal, handling suggestion display and user responses.

## Imports
- **Stdlib**: `useCallback`, `useRef`, `useState` from 'react'
- **External**: None
- **Internal**: `logEvent`, `useAppState`, `useSetAppState`, `Message`, `FeedbackSurveyResponse`, `SkillUpdate`, `applySkillImprovement`, `createSystemMessage`

## Logic
1. Tracks suggestion from AppState and opens modal when new suggestion arrives
2. Logs analytics when survey appears
3. On user selection:
   - If dismissed: clears suggestion from AppState
   - If applied: calls applySkillImprovement and adds system message
4. Logs analytics response event

## Exports
- `useSkillImprovementSurvey` - Hook returning isOpen, suggestion, handleSelect

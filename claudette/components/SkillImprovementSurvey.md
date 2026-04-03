## Purpose
Displays a survey prompting users to apply or dismiss suggested skill improvements.

## Imports
- **Stdlib**: none
- **External**: REACT (React, useEffect, useRef)
- **Internal**: ../constants/figures (BLACK_CIRCLE, BULLET_OPERATOR), ./ink (Box, Text), ./utils/hooks/skillImprovement (SkillUpdate), ../utils/stringUtils (normalizeFullWidthDigits), ./FeedbackSurvey/FeedbackSurveyView (isValidResponseInput), ./FeedbackSurvey/utils (FeedbackSurveyResponse)

## Logic
Renders a skill improvement suggestion with the skill name, a list of proposed changes, and keyboard-selectable options (1 to apply, 0 to dismiss). Monitors input value changes to detect single-key selection, normalizes full-width digits, and triggers the onSelect callback with "good" or "dismissed" responses.

## Exports
- `SkillImprovementSurvey` - main survey component that gates rendering based on open state and input validity

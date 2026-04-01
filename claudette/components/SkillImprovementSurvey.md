## Purpose
Displays a survey prompting users to apply or dismiss suggested skill improvements.

## Imports
- **Stdlib**: none
- **External**: react (React, useEffect, useRef)
- **Internal**: ../constants/figures.js (BLACK_CIRCLE, BULLET_OPERATOR), ../ink.js (Box, Text), ../utils/hooks/skillImprovement.js (SkillUpdate), ../utils/stringUtils.js (normalizeFullWidthDigits), ./FeedbackSurvey/FeedbackSurveyView.js (isValidResponseInput), ./FeedbackSurvey/utils.js (FeedbackSurveyResponse)

## Logic
Renders a skill improvement suggestion with the skill name, a list of proposed changes, and keyboard-selectable options (1 to apply, 0 to dismiss). Monitors input value changes to detect single-key selection, normalizes full-width digits, and triggers the onSelect callback with "good" or "dismissed" responses.

## Exports
- `SkillImprovementSurvey` - main survey component that gates rendering based on open state and input validity
- `SkillImprovementSurveyView` - internal view component rendering the survey UI with change list and selection options

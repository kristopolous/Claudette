# skillImprovement

## Purpose
Only run every TURN_BATCH_SIZE user messages

## Imports
- **Stdlib**: BUILDFLAGS
- **Internal**: ../../bootstrap/state, .././services/analytics/growthbook, .././services/api/claude, .././Tool, .././types/message, ./abortController, ./array, ../cwd, ../errors, ../log...

## Items

### formatRecentMessages
**Type**: Function

### findProjectSkill
**Type**: Function

### createSkillImprovementHook
**Type**: Function

### initSkillImprovement
**Type**: Function

### applySkillImprovement
**Type**: Function

### SkillUpdate
**Type**: Type alias

## Exports
- SkillUpdate
- initSkillImprovement
- applySkillImprovement

## Source
`skillImprovement`

### Helpful Prompt Templates

- **Skill improvement analysis prompt** - "You are analyzing a conversation where a user is executing a skill (a repeatable process).\nYour job: identify if the user's recent messages contain preferences, requests, or corrections that should be permanently added to the skill definition for future runs.\n\n<skill_definition>\n${projectSkill.content}\n</skill_definition>\n\n<recent_messages>\n${formatRecentMessages(newMessages)}\n</recent_messages>\n\nLook for:\n- Requests to add, change, or remove steps: \"can you also ask me X\", \"please do Y too\", \"don't do Z\"\n- Preferences about how steps should work: \"ask me about energy levels\", \"note the time\", \"use a casual tone\"\n- Corrections: \"no, do X instead\", \"always use Y\", \"make sure to...\"\n\nIgnore:\n- Routine conversation that doesn't generalize (one-time answers, chitchat)\n- Things the skill already does\n\nOutput a JSON array inside <updates> tags. Each item: {\"section\": \"which step/section to modify or 'new step'\", \"change\": \"what to add/modify\", \"reason\": \"which user message prompted this\"}.\nOutput <updates>[]</updates> if no updates are needed."

- **Skill improvement system prompt** - "You detect user preferences and process improvements during skill execution. Flag anything the user asks for that should be remembered for next time."

- **Skill file editing prompt** - "You are editing a skill definition file. Apply the following improvements to the skill.\n\n<current_skill_file>\n${currentContent}\n</current_skill_file>\n\n<improvements>\n${updateList}\n</improvements>\n\nRules:\n- Integrate the improvements naturally into the existing structure\n- Preserve frontmatter (--- block) exactly as-is\n- Preserve the overall format and style\n- Do not remove existing content unless an improvement explicitly replaces it\n- Output the complete updated file inside <updated_file> tags"

- **Skill file editing system prompt** - "You edit skill definition files to incorporate user preferences. Output only the updated file content."
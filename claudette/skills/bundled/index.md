# index

## Purpose
Initializes all bundled skills at startup by calling their register functions.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS feature flag
- **Internal**: All bundled skill register functions, claudeInChrome setup, batch skill

## Logic
1. `initBundledSkills` - main entry point called at startup
2. Registers skills unconditionally: updateConfig, keybindings, verify, debug, loremIpsum, skillify, remember, simplify, batch, stuck
3. Feature-gated skills:
   - KAIROS/KAIROS_DREAM → dream skill
   - REVIEW_ARTIFACT → hunter skill
   - AGENT_TRIGGERS → loop skill (isEnabled delegates to isKairosCronEnabled)
   - AGENT_TRIGGERS_REMOTE → scheduleRemoteAgents skill
4. Claude in Chrome skill if shouldAutoEnableClaudeInChrome returns true
5. To add new skill: create file, export register function, import and call here

## Exports
- `initBundledSkills` - function that initializes all bundled skills

# userPromptKeywords

## Purpose
Detects negative sentiment keywords and "keep going" continuation patterns in user input, used to classify short user prompts.

## Imports
(none)

## Logic
1. `matchesNegativeKeyword(input)` — lowercases input and tests against a regex matching frustration/anger patterns: `wtf`, `wth`, `ffs`, `omfg`, `shit`/`shitty`/`shittiest`, `dumbass`, `horrible`, `awful`, `pissed off`/`pissing off`, `piece of shit/crap/junk`, `what the fuck/hell`, `fucking broken/useless/terrible/awful/horrible`, `fuck you`, `screw this/you`, `so frustrating`, `this sucks`, `damn it`
2. `matchesKeepGoingKeyword(input)` — lowercases and trims input; matches if input is exactly `"continue"`, or contains `"keep going"` or `"go on"` as whole words

## Exports
- `matchesNegativeKeyword` — returns true if input matches frustration/anger keyword patterns
- `matchesKeepGoingKeyword` — returns true if input matches continuation/keep-going patterns

## Source
`userPromptKeywords`

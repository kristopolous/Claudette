## Purpose
Provides a doubly-linked-list-backed map for efficient sequential navigation through select options.

## Imports
- **Stdlib**: none
- **External**: REACT (ReactNode type)
- **Internal**: `select` (OptionWithDescription type)

## Logic
Extends Map to store options with `previous` and `next` pointers, enabling O(1) forward/backward traversal. During construction, iterates through the options array, links each item to its predecessor and successor, and tracks `first` and `last` references for wrap-around navigation.

## Exports
- `OptionMap` - a Map subclass that stores options as linked nodes with `first` and `last` properties for boundary access

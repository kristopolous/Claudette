# utils/bash/specs/index

## Purpose
Exports array of command specifications for bash prefix extraction.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec, individual command specs

## Logic
1. Imports all command specs: pyright, timeout, sleep, alias, nohup, time, srun
2. Exports as default array satisfying CommandSpec[]
3. Used by getCommandSpec for spec lookup
4. Centralized export for all bash command specs

## Exports
- Default array of CommandSpec objects

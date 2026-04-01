# utils/bash/specs/srun

## Purpose
Command specification for the `srun` SLURM cluster command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `srun` command spec for prefix extraction
2. Description: "Run a command on SLURM cluster nodes"
3. Options:
   - `-n`/`--ntasks`: Number of tasks to run
   - `-N`/`--nodes`: Number of nodes to allocate
4. Single arg: command (isCommand: true)
5. Used by getCommandPrefixStatic for permission rule matching
6. Handles SLURM cluster job submission

## Exports
- `srun` - srun command specification

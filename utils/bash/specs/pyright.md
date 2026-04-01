# utils/bash/specs/pyright

## Purpose
Command specification for the `pyright` Python type checker.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `pyright` command spec for prefix extraction
2. Description: "Type checker for Python"
3. Many options for type checking configuration:
   - --help/-h, --version, --watch/-w
   - --project/-p, --createstub, --typeshedpath/-t
   - --verifytypes, --ignoreexternal, --pythonpath
   - --pythonplatform, --pythonversion, --venvpath/-v
   - --outputjson, --verbose, --stats, --dependencies
   - --level, --skipunannotated, --warnings, --threads
4. Used by getCommandPrefixStatic for permission rule matching
5. Handles Python type checker command parsing

## Exports
- `pyright` - pyright command specification

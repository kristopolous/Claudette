# tools/AgentTool/built-in/statuslineSetup

## Purpose
Defines the Statusline Setup agent for creating/updating Claudette status line commands.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: loadAgentsDir

## Logic
1. `STATUSLINE_SYSTEM_PROMPT` - generates statusline setup prompt
2. Reads shell config files in order: ~/.zshrc, ~/.bashrc, ~/.bash_profile, ~/.profile
3. Extracts PS1 value via regex: /(?:^|\n)\s*(?:export\s+)?PS1\s*=\s*["']([^"']+)["']/m
4. Converts PS1 escape sequences to shell commands:
   - \u → $(whoami), \h → $(hostname -s), \H → $(hostname)
   - \w → $(pwd), \W → $(basename "$(pwd)"), \$ → $
   - \n, \t → $(date +%H:%M:%S), \d → $(date "+%a %b %d")
   - \@ → $(date +%I:%M%p), \# → #, \! → !
5. Uses printf for ANSI color codes (preserves colors, dimmed in status line)
6. Removes trailing "$" or ">" characters from output
7. Asks for further instructions if no PS1 found
8. statusLine command receives JSON via stdin with:
   - session_id, session_name, transcript_path, cwd
   - model (id, display_name)
   - workspace (current_dir, project_dir, added_dirs)
   - version, output_style, context_window, token usage

## Exports
- `STATUSLINE_SETUP_AGENT` - statusline setup agent definition

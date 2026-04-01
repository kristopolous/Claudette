## Purpose
A high-performance UI module that provides a fuzzy-search interface for quickly finding and opening files within the project, featuring real-time syntax-highlighted previews.

## Imports
- **Stdlib**: `path`
- **Internal**: 
    - UI: `ink`, `design-system/FuzzyPicker`, `design-system/LoadingState`
    - Logic/State: `context/overlayContext`, `hooks/fileSuggestions`, `hooks/useTerminalSize`, `services/analytics`, `utils/cwd`, `utils/editor`, `utils/format`, `utils/highlightMatch`, `utils/readFileInRange`

## Logic
1. **Search and Discovery**:
    - Uses fuzzy matching logic to generate real-time file suggestions based on user input.
    - Limits search results to file-type entities, excluding directories and metadata.
    - Implements an asynchronous query generator with an abort mechanism to handle rapid keystrokes without UI lag.
2. **Interactive Preview**:
    - As a user navigates the search results, the module fetches and displays the first 20 lines of the focused file.
    - The preview layout automatically adapts based on terminal width (side-by-side vs. stacked).
    - Highlights text matches within the preview content to provide immediate visual context.
3. **Action Routing**:
    - **Open**: Launches the selected file in the user's default external editor.
    - **Insert/Mention**: Allows for inserting the file path or an "@file" mention directly into the active prompt.
4. **Adaptive UI**:
    - Dynamically calculates the number of visible results and preview height based on current terminal dimensions.
    - Uses path truncation (middle-truncation) to ensure long file paths remain readable within constrained terminal widths.

## Exports
- `QuickOpenDialog` - The main component for the file-search and preview interface.

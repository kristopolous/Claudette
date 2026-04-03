## Purpose
Renders an image reference as a clickable terminal hyperlink that opens the stored image file.

## Imports
- **Stdlib**: `url`
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink/components/Link`, `ink/supports-hyperlinks`, `ink`, `utils/imageStore`, `utils/theme`

## Logic
1. Retrieves the stored image file path using the image ID
2. Converts the file path to a file URL for the hyperlink
3. Renders a clickable Link component when the terminal supports hyperlinks and the image exists
4. Falls back to styled text with background color and selection state when hyperlinks are unsupported or the image is not found

## Exports
- `ClickableImageRef` - UI component that displays an image reference like [Image #1] as a clickable link or styled text fallback

# imagePaste

## Purpose
Native NSPasteboard reader. GrowthBook gate tengu_collage_kaleidoscope is

## Imports
- **Stdlib**: BUILDFLAGS, crypto, execa, path
- **Internal**: ../services/analytics/growthbook, ./tools/FileReadTool/imageProcessor, /debug, ./execFileNoThrow, ./fsOperations, ./log

## Items

### getClipboardCommands
**Type**: Function

### hasImageInClipboard
**Type**: Function

### getImageFromClipboard
**Type**: Function

### getImagePathFromClipboard
**Type**: Function

### removeOuterQuotes
**Type**: Function

### stripBackslashEscapes
**Type**: Function

### isImageFilePath
**Type**: Function

### asImageFilePath
**Type**: Function

### tryReadImageFromPath
**Type**: Function

### SupportedPlatform
**Type**: Type alias

### ImageWithDimensions
**Type**: Type alias

## Exports
- PASTE_THRESHOLD
- ImageWithDimensions
- hasImageInClipboard
- getImageFromClipboard
- getImagePathFromClipboard
- IMAGE_EXTENSION_REGEX
- isImageFilePath
- asImageFilePath
- tryReadImageFromPath

## Source
`imagePaste`
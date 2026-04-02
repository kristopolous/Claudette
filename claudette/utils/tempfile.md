# tempfile

## Purpose
Generates stable or random temporary file paths in the system temp directory.

## Imports
- **Stdlib**: crypto, os, path

## Logic
Produces paths in `tmpdir()` with format `<prefix>-<id><extension>`. The identifier is either a random UUID or a SHA-256 hash (first 16 hex chars) of provided content. Content-hashed paths are stable across processes — critical for prompt cache prefix validity when paths appear in tool descriptions sent to the inference API.

## Exports
- `generateTempFilePath` - `(prefix?, extension?, options?) => string`. Defaults: prefix=`'claude-prompt'`, extension=`'.md'`. When `options.contentHash` is provided, derives the ID from its SHA-256 hash instead of a random UUID for cross-process stability.

## Source
`tempfile`

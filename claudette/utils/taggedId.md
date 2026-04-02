# taggedId

## Purpose
Encodes account UUIDs into the API's tagged ID format (e.g., `user_01PaGUP2rbg1XDh7Z9W1CEpd`). Must stay in sync with `api/api/common/utils/tagged_id.py`.

## Imports
- (none)

## Logic
1. Format: `{tag}_{version}{base58(uuid_as_128bit_int)}` where version is `"01"`
2. UUID string (with or without hyphens) is parsed to a 128-bit bigint via `uuidToBigInt`
3. Base58 encoding uses `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz` (no 0, O, I, l)
4. Encoded base58 portion is fixed at 22 characters (ceil(128 / log2(58)))
5. `base58Encode` pads with the first base58 character (`1`) to ensure fixed length

## Exports
- `toTaggedId(tag, uuid)` - converts a tag prefix (e.g., `"user"`, `"org"`) and UUID string into a tagged ID string

## Source
`taggedId`

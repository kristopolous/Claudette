# FileReadTool/imageProcessor.ts

## Purpose

Provides dynamic loading of image processing libraries (Sharp or native `image-processor-napi`) for reading and manipulating images in the FileReadTool. Handles image resizing, format conversion, and metadata extraction. Manages fallbacks between bundled native modules and standard Sharp.

## Imports

- **Stdlib**: Type `Buffer` from 'buffer'
- **External**: None (only dynamic imports of 'sharp' and 'image-processor-napi')
- **Internal**: `isInBundledMode` (utility)

## Logic

**Types**:
- `SharpInstance`: Subset of Sharp's API:
  - `metadata(): Promise<{width, height, format}>`
  - `resize(width, height, options?)` returns `SharpInstance`
  - `jpeg(options?)`, `png(options?)`, `webp(options?)` return `SharpInstance`
  - `toBuffer(): Promise<Buffer>`
- `SharpFunction`: `(input: Buffer) => SharpInstance`
- `MaybeDefault<T>`: `T | { default: T }` (handles ESM/CJS interop)
- Module caches: `imageProcessorModule`, `imageCreatorModule`

**Functions**:
- `getImageProcessor(): Promise<SharpFunction>`:
  - Returns cached module if already loaded
  - If `isInBundledMode()`: tries dynamic import of `image-processor-napi` (native module) first
    - On failure, logs warning and falls back to Sharp
  - For non-bundled builds or as fallback: imports `sharp` via dynamic import
  - Uses `unwrapDefault` to handle both CJS and ESM forms
  - Caches and returns the Sharp function
- `getImageCreator(): Promise<SharpCreator>`:
  - Always uses Sharp directly (image-processor-napi doesn't support creation)
  - Caches and returns Sharp creator function
- `unwrapDefault(mod)`: Returns `mod` if it's a function, otherwise `mod.default`

## Exports

- `SharpInstance: type`
- `SharpFunction: (input: Buffer) => SharpInstance`
- `getImageProcessor(): Promise<SharpFunction>`
- `getImageCreator(): Promise<SharpCreator>`

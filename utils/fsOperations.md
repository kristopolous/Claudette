# utils/fsOperations

## Purpose
Provides filesystem operations interface with type safety and abstraction.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: errors, slowOperations

## Logic
1. `FsOperations` - interface for filesystem operations
2. cwd() - gets current working directory
3. existsSync() - checks if file/directory exists
4. stat() - gets file stats asynchronously
5. readdir() - lists directory contents with file types
6. unlink() - deletes file asynchronously
7. rmdir() - removes empty directory asynchronously
8. rm() - removes files/directories with recursive option
9. mkdir() - creates directory recursively
10. readFile() - reads file content as string
11. rename() - renames/moves file asynchronously
12. statSync() - gets file stats synchronously
13. lstatSync() - gets stats without following symlinks
14. readFileSync() - reads file with encoding
15. readFileBytesSync() - reads raw bytes as Buffer
16. readSync() - reads specified bytes from file start
17. appendFileSync() - appends string to file
18. copyFileSync() - copies file
19. unlinkSync() - deletes file synchronously
20. renameSync() - renames file synchronously
21. Allows abstraction for mock/virtual implementations

## Exports
- `FsOperations` - filesystem operations interface
- (Filesystem operation implementations)

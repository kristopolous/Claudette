import { getSelectedFiles } from './tree-utils.js';
import { relative } from 'node:path';
export function packageFeatures(rootNodes, selectedIds, claudetteDir) {
    const selectedFiles = getSelectedFiles(rootNodes, selectedIds);
    return selectedFiles.map((f) => relative(claudetteDir, f));
}

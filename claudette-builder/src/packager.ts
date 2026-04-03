import { FeatureNode } from './feature-tree.js';
import { getSelectedFiles } from './tree-utils.js';
import { relative } from 'node:path';

export function packageFeatures(
  rootNodes: FeatureNode[],
  selectedIds: Set<string>,
  claudetteDir: string,
): string[] {
  const selectedFiles = getSelectedFiles(rootNodes, selectedIds);
  return selectedFiles.map((f) => relative(claudetteDir, f));
}

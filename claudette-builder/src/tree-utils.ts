import { FeatureNode } from './feature-tree.js';

export interface FlatItem {
  node: FeatureNode;
  depth: number;
  expanded: boolean;
  selected: boolean;
  partiallySelected: boolean;
  required: boolean;
}

export function flattenTree(
  nodes: FeatureNode[],
  expandedIds: Set<string>,
  selectedIds: Set<string>,
  depth = 0,
): FlatItem[] {
  const result: FlatItem[] = [];

  for (const node of nodes) {
    const isSelected = selectedIds.has(node.id);
    const isExpanded = expandedIds.has(node.id);
    const isRequired = node.required || false;

    result.push({
      node,
      depth,
      expanded: isExpanded,
      selected: isSelected,
      partiallySelected: !isSelected && hasSelectedDescendant(node, selectedIds),
      required: isRequired,
    });

    if (node.children.length > 0 && isExpanded) {
      result.push(...flattenTree(node.children, expandedIds, selectedIds, depth + 1));
    }
  }

  return result;
}

function hasSelectedDescendant(node: FeatureNode, selectedIds: Set<string>): boolean {
  for (const child of node.children) {
    if (selectedIds.has(child.id) || hasSelectedDescendant(child, selectedIds)) {
      return true;
    }
  }
  return false;
}

export function getAllDescendantIds(node: FeatureNode): string[] {
  const ids: string[] = [];
  for (const child of node.children) {
    ids.push(child.id);
    ids.push(...getAllDescendantIds(child));
  }
  return ids;
}

export function getSelectedFiles(
  nodes: FeatureNode[],
  selectedIds: Set<string>,
): string[] {
  const files = new Set<string>();

  function walk(node: FeatureNode) {
    if (selectedIds.has(node.id)) {
      for (const f of node.files) {
        files.add(f);
      }
    }
    for (const child of node.children) {
      walk(child);
    }
  }

  for (const node of nodes) {
    walk(node);
  }

  return Array.from(files);
}

export function getRequiredIds(nodes: FeatureNode[]): string[] {
  const ids: string[] = [];
  function walk(node: FeatureNode) {
    if (node.required) {
      ids.push(node.id);
    }
    for (const child of node.children) {
      walk(child);
    }
  }
  for (const node of nodes) {
    walk(node);
  }
  return ids;
}

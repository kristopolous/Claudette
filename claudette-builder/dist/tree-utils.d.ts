import { FeatureNode } from './feature-tree.js';
export interface FlatItem {
    node: FeatureNode;
    depth: number;
    expanded: boolean;
    selected: boolean;
    partiallySelected: boolean;
    required: boolean;
}
export declare function flattenTree(nodes: FeatureNode[], expandedIds: Set<string>, selectedIds: Set<string>, depth?: number): FlatItem[];
export declare function getAllDescendantIds(node: FeatureNode): string[];
export declare function getSelectedFiles(nodes: FeatureNode[], selectedIds: Set<string>): string[];
export declare function getRequiredIds(nodes: FeatureNode[]): string[];

export interface FeatureNode {
    id: string;
    label: string;
    description: string;
    path: string;
    children: FeatureNode[];
    files: string[];
    isLeaf: boolean;
    required?: boolean;
}
/**
 * Feature tree organized around what users actually want or skip.
 * Each feature maps to real documentation files in claudette/.
 */
export declare function buildFeatureTree(basePath: string): Promise<FeatureNode[]>;
/**
 * Resolve file paths relative to the actual claudette/ directory.
 * Walks the tree and fills in .path for each node.
 */
export declare function resolveFeaturePaths(tree: FeatureNode[], basePath: string): Promise<FeatureNode[]>;

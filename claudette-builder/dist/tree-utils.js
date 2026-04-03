export function flattenTree(nodes, expandedIds, selectedIds, depth = 0) {
    const result = [];
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
function hasSelectedDescendant(node, selectedIds) {
    for (const child of node.children) {
        if (selectedIds.has(child.id) || hasSelectedDescendant(child, selectedIds)) {
            return true;
        }
    }
    return false;
}
export function getAllDescendantIds(node) {
    const ids = [];
    for (const child of node.children) {
        ids.push(child.id);
        ids.push(...getAllDescendantIds(child));
    }
    return ids;
}
export function getSelectedFiles(nodes, selectedIds) {
    const files = new Set();
    function walk(node) {
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
export function getRequiredIds(nodes) {
    const ids = [];
    function walk(node) {
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

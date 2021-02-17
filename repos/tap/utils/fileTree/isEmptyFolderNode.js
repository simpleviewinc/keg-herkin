
/**
 * Check whether this node is an empty folder or not
 * 
 * @param {Object} node - file tree node obj
 * @returns {Boolean}
 */
export const isEmptyFolderNode = (node) => !node?.children?.length && node?.type === 'folder'
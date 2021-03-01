/**
 * Finds the node based on given id
 * @param {string} id 
 * @param {Array<object>} nodes 
 * 
 * @returns {object} node
 */
export const findNode = (id, nodes) => nodes?.find((node) => node.id === id , {})
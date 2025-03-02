const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
    this.length = 0;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (this._root) {
      this._insertNode(this._root, newNode);
    } else {
      this._root = newNode;
      this.length++;
    }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left) {
        this._insertNode(node.left, newNode);
      } else {
        node.left = newNode;
        this.length++;
      }
    } else if (newNode.data > node.data) {
      if (node.right) {
        this._insertNode(node.right, newNode);
      } else {
        node.right = newNode;
        this.length++;
      }
    }
  }

  has(data) {
    return this._searchNode(this._root, data) !== null;
  }

  _searchNode(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      return this._searchNode(node.left, data);
    } else if (data > node.data) {
      return this._searchNode(node.right, data);
    } else {
      return node;
    }
  }

  find(data) {
    return this._searchNode(this._root, data);
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      // node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // node with two children: Get the inorder successor (smallest in the right subtree)
      node.data = this._minValue(node.right);

      // Delete the inorder successor
      node.right = this._removeNode(node.right, node.data);
      return node;
    }
  }

  _minValue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  min() {
    if (this._root === null) {
      return null;
    }
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
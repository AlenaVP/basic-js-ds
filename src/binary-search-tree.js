const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root) {
      this._insertNode(this._root, newNode)
    } else {
      this._root = newNode;
    }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left) {
        this._insertNode(node.left, newNode);
      } else {
        node.left = newNode;
      }
    } else if (newNode.data > node.data) {
      if (node.right) {
        this._insertNode(node.right, newNode);
      } else {
        node.right = newNode;
      }
    }
  }

  _searchNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
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

  has(data) {
    return this._searchNode(this._root, data) !== null;
  }

  remove(data) {
    return this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data === node.data) {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      const successorData = this._minValue(node.right);

      node.data = successorData;
      node.right = this._removeNode(node.right, successorData);
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      return node;
    }
  }

  _minValue(node) {
    if (node === null) {
      return null;
    }

    while (node.left !== null) {
      node = node.left;
    }

    return node.data;
  }

  min() {
    return this._minValue(this._root);
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
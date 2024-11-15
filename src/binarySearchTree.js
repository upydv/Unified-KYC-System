// binarySearchTree.js

class Node {
  constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
      this.root = null;
  }

  insert(key) {
      if (!this.root) {
          this.root = new Node(key);
      } else {
          this._insertRecursive(this.root, key);
      }
  }

  _insertRecursive(node, key) {
      if (key < node.key) {
          if (!node.left) {
              node.left = new Node(key);
          } else {
              this._insertRecursive(node.left, key);
          }
      } else if (key > node.key) {
          if (!node.right) {
              node.right = new Node(key);
          } else {
              this._insertRecursive(node.right, key);
          }
      }
  }

  search(key) {
      return this._searchRecursive(this.root, key);
  }

  _searchRecursive(node, key) {
      if (!node) {
          return false;
      } else if (node.key === key) {
          return true;
      } else if (key < node.key) {
          return this._searchRecursive(node.left, key);
      } else {
          return this._searchRecursive(node.right, key);
      }
  }
}

module.exports = { BinarySearchTree, Node };

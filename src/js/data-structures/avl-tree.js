// import { Compare, defaultCompare } from '../util';
// import BinarySearchTree from './binary-search-tree';
// import { Node } from './models/node';

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class Node {
  constructor(key) {
    this.key = key; // {1} valor do nó
    this.left = undefined; // referência ao nó que é o filho à esquerda
    this.right = undefined; // referência ao nó que é o filho à direita
  }

  toString() {
    return `${this.key}`;
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = undefined;
  }

  insert(key) {
    if (this.root == null) { // {1}
      this.root = new Node(key); // {2}
    } else {
      this.insertNode(this.root, key); // {3}
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {4}
      if (node.left == null) { // {5}
        node.left = new Node(key); // {6}
      } else {
        this.insertNode(node.left, key); // {7}
      }
    } else if (node.right == null) { // {8}
      node.right = new Node(key); // {9}
    } else {
      this.insertNode(node.right, key); // {10}
    }
  }

  inOrderTraverseNode(node, callback) {
    if (node != null) { // {2}
      this.inOrderTraverseNode(node.left, callback); // {3}
      callback(node.key); // {4}
      this.inOrderTraverseNode(node.right, callback); // {5}
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback); // {1}
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback); // {1}
      this.postOrderTraverseNode(node.right, callback); // {2}
      callback(node.key); // {3}
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  minNode(node) {
    let current = node;

    while (current != null && current.left != null) { // {2}
      current = current.left; // {3}
    }

    return current; // {4}
  }

  min() {
    return this.minNode(this.root); // {1}
  }

  maxNode(node) {
    let current = node;

    while (current != null && current.right != null) {
      current = current.right;
    }

    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  search(key) {
    return this.searchNode(this.root, key); // {1}
  }

  searchNode(node, key) {
    if (node == null) return false; // {2}

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {3}
      return this.searchNode(node.left, key); // {4}
    }

    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // {5}
      return this.searchNode(node.right, key); // {6}
    }

    return true; // {7}
  }

  remove(key) {
    return this.removeNode(this.root, key); // {1}
  }

  removeNode(node, key) {
    if (node == null) return null; // {2}

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {3}
      node.left = this.removeNode(node.left, key); // {4}

      return node; // {5}
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // {6}
      node.right = this.removeNode(node.right, key); // {7}

      return node; // {8}
    }

    if (node.left == null && node.right == null) { // {9}
      node = null; // {10}

      return node; // {11}
    }

    if (node.left == null) { // {12}
      node = node.right; // {13}

      return node; // {14}
    }

    if (node.right == null) { // {15}
      node = node.left; // {16}

      return node; // {17}
    }

    const aux = this.minNode(node.right); // {18}
    node.key = aux.key; // {19}
    node.right = this.removeNode(node.right, aux.key); // {20}

    return node; // {21}
  }

  getRoot() {
    return this.root;
  }
}

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node) {
    if (node == null) return -1;

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);

    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  rotationLL(node) {
    const tmp = node.left; // {1}
    node.left = tmp.right; // {2}
    tmp.right = node; // {3}

    return tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;

    return tmp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);

    return this.rotationLR;
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.left);

    return this.rotationRL;
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    // insere o nó como em uma BST
    if (node == null) return new Node(key);

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // chave duplicada
    }
    // balanceia a árvore, se for necessário
    const balanceFactor = this.getBalanceFactor(node); // {1}

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {2}
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) { // {3}
        node = this.rotationLL(node); // {4}
      } else {
        return this.rotationLR(node); // {5}
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {6}
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) { // {7}
        node = this.rotationRR(node); // {8}
      } else {
        return this.rotationRL(node); // {9}
      }
    }

    return node;
  }
}

const avl = new AVLTree();

console.log(avl);

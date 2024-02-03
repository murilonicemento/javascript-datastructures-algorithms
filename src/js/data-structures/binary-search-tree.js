// import { Compare, defaultCompare } from '../util';
// import { Node } from './models/node';

/**
 * • insert(key): esse método insere uma nova chave na árvore.
 * • search(key): esse método busca a chave na árvore e
 devolve true se ela  existir, e false se o nó não existir.
 * • inOrderTraverse(): esse método visita todos os nós da árvore
 usando um percurso em-ordem (in-order).
 * • preOrderTraverse(): esse método visita todos os nós da árvore
 usando um percurso pré-ordem (pre-order).
 * • postOrderTraverse(): esse método visita todos os nós da árvore
 usando um percurso pós-ordem (post-order).
 * • min(): esse método devolve a chave/valor mínimo da árvore.
 * • max(): esse método devolve a chave/valor máximo da árvore.
 * • remove(key): esse método remove a chave da árvore.
*/

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
}

const tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

const printNode = (value) => console.log(value); // {6}
tree.inOrderTraverse(printNode); // {7}

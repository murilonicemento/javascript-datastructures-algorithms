// import { defaultEquals } from '../util';
// import LinkedList from './linked-list';
// import { DoublyNode } from './models/linked-list-models';

function defaultEquals(a, b) {
  return a === b;
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }

  push(element) {
    const node = new Node(element); // {1}
    let current; // {2}
    if (this.head == null) { // {3}
      this.head = node;
    } else {
      current = this.head; // {4}
      while (current.next != null) { // {5} obtém o último item
        current = current.next;
      }
      // e atribui o novo elemento a next para criar a ligação
      current.next = node; // {6}
    }
    this.count++; // {7}
  }

  removeAt(index) {
    // verifica valores fora do intervalo
    if (index >= 0 && index < this.count) { // {1}
      let current = this.head; // {2}
      // remove o primeiro item
      if (index === 0) { // {3}
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        // let previous; // {4}
        // for (let i = 0; i < index; i++) { // {5}
        //   previous = current; // {6}
        //   current = current.next; // {7}
        // }
        // faz a ligação de previous com o next de current: pula esse elemento para removê-lo
        previous.next = current.next; // {8}
      }
      this.count--; // {9}
      return current.element;
    }
    return undefined; // {10}
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) { // {1}
      let node = this.head; // {2}

      for (let i = 0; i < index && node != null; i++) { // {3}
        node = node.next;
      }
      return node; // {4}
    }
    return undefined; // {5}
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) { // {1}
      const node = new Node(element);
      if (index === 0) { // adiciona na primeira posição
        const current = this.head;
        node.next = current; // {2}
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1); // {3}
        const current = previous.next; // {4}
        node.next = current; // {5}
        previous.next = node; // {6}
      }
      this.count++; // atualiza o tamanho da lista
      return true;
    }
    return false; // {7}
  }

  indexOf(element) {
    let current = this.head; // {1}
    for (let i = 0; i < this.count && this.count != null; i++) { // {2}
      if (this.equalsFn(element, current.element)) { // {3}
        return i; // {4}
      }
      current = current.next; // {5}
    }
    return -1; // {6}
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.head == null) return ''; // {1}

    let objString = `${this.head.element}`; // {2}
    let current = this.head.next; // {3}

    for (let i = 1; i < this.size() && current != null; i++) { // {4}
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }

    return objString; // {5}
  }
}

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev; // NOVO
  }
}
class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined; // NOVO
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) { // {1} NOVO
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head; // {2}
          current.prev = node; // {3} NOVO
          this.head = node; // {4}
        }
      } else if (index === this.count) { // último item – NOVO
        current = this.tail; // {5}
        current.next = node; // {6}
        node.prev = current; // {7}
        this.tail = node; // {8}
      } else {
        const previous = this.getElementAt(index - 1); // {9}
        current = previous.next; // {10}
        node.next = current; // {11}
        previous.next = node; // {12}
        current.prev = node; // {13}
        node.prev = previous; // {14}
      }
      this.count++;
      return true;
    }
    return false;
  }
}

const doublyLinkedList = new DoublyLinkedList();
console.log(doublyLinkedList);

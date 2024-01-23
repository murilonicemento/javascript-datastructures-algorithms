// import { defaultEquals } from '../util';
// import LinkedList from './linked-list';
// import { Node } from './models/linked-list-models';

function defaultEquals(a, b) {
  return a === b;
}

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
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

class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node; // {1}
          node.next = this.head; // {2} NOVO
        } else {
          node.next = current; // {3}
          current = this.getElementAt(this.size()); // {4}
          // atualiza o último elemento
          this.head = node; // {5}
          current.next = this.head; // {6} NOVO
        }
      } else { // sem alterações neste cenário
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }

    return false;
  }
}

const circularLinkedList = new CircularLinkedList();
console.log(circularLinkedList);

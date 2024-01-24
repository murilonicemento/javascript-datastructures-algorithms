// import DoublyLinkedList from './doubly-linked-list';

function defaultEquals(a, b) {
  return a === b;
}

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev; // NOVO
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

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined; // NOVO
  }

  push(element) {
    const node = new DoublyNode(element);
    if (this.head == null) {
      this.head = node;
      this.tail = node; // NOVO
    } else {
      // Anexar ao nó final // NOVO
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
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

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next; // {1}
        // se houver apenas um item, atualizamos tail também – NOVO
        if (this.count === 1) { // {2}
          this.tail = undefined;
        } else {
          this.head.prev = undefined; // {3}
        }
      } else if (index === this.count - 1) { // último item – NOVO
        current = this.tail; // {4}
        this.tail = current.prev; // {5}
        this.tail.next = undefined; // {6}
      } else {
        current = this.getElementAt(index); // {7}
        const previous = current.prev; // {8}
        // faz a ligação de previous com o next de current – pula esse elemento para removê-lo
        previous.next = current.next; // {9}
        current.next.prev = previous; // {10} NOVO
      }
      this.count--;
      return current.element;
    }

    return undefined;
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current != null) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  clear() {
    super.clear();
    this.tail = undefined;
  }

  toString() {
    if (this.head == null) return '';

    let objString = `${this.head.element}`;
    let current = this.head.next;

    while (current != null) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }

    return objString;
  }

  inverseToString() {
    if (this.tail == null) return '';

    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;

    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }

    return objString;
  }
}

export default class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList(); // {1}
  }

  push(element) {
    this.items.push(element); // {2}
  }

  pop() {
    if (this.items.isEmpty()) return undefined;

    return this.items.removeAt(this.size - 1); // {3}
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items.getElementAt(this.size() - 1).element;
  }

  isEmpty() {
    return this.items.isEmpty();
  }

  size() {
    return this.items.size();
  }

  clear() {
    this.items.clear();
  }

  toString() {
    return this.items.toString();
  }
}

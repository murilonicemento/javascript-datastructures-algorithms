// import { defaultToString } from '../util';
// import LinkedList from './linked-list';
// import { ValuePair } from './models/value-pair';

function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } if (item === undefined) {
    return 'UNDEFINED';
  } if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

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

class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') return key; // {1}

    const tableKey = this.toStrFn(key); // {2}
    let hash = 0; // {3}

    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i); // {4}
    }

    return hash % 37; // {5}
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) { // {1}
        this.table[position] = new LinkedList(); // {2}
      }
      this.table[position].push(new ValuePair(key, value)); // {3}

      return true;
    }

    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position]; // {1}

    if (linkedList != null && !linkedList.isEmpty()) { // {2}
      let current = linkedList.getHead(); // {3}

      while (current != null) { // {4}
        if (current.element.key === key) { // {5}
          return current.element.value; // {6}
        }
        current = current.next; // {7}
      }
    }
    return undefined; // {8}
  }

  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];

    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();

      while (current != null) {
        if (current.element.key === key) { // {1}
          linkedList.remove(current.element); // {2}

          if (linkedList.isEmpty) { // {3}
            delete this.table[position]; // {4}
          }

          return true; // {5}
        }

        current = current.next; // {6}
      }
    }

    return false; // {7}
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getTable() {
    return this.table;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) return '';

    const keys = Object.keys(this.table);
    let objString = `${keys[0]} => ${this.table[keys[0].toString()]}`;

    for (let i = 1; i < keys.length; i++) {
      objString += `${keys[i]} => ${this.table[keys[i].toString()]}`;
    }

    return objString;
  }
}

const hashTable = new HashTableSeparateChaining();

console.log(hashTable);

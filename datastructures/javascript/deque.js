/**
 * • addFront(element): esse método adiciona um novo elemento na frente do deque.
 * • addBack(element): esse método adiciona um novo elemento no fim do deque (a mesma implementação do método enqueue da classe Queue).
 * • removeFront(): esse método remove o primeiro elemento do deque (a mesma implementação do método dequeue da classe Queue).
 * • removeBack(): esse método remove o último elemento do deque (a mesma implementação do método pop da classe Stack).
 * • peekFront(): esse método devolve o primeiro elemento do deque (a mesma implementação do método peek da classe Queue).
 * • peekBack(): esse método devolve o último elemento do deque (a mesma implementação do método peek da classe Stack).
 */

class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack();
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }

      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) return undefined;

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;

    return result;
  }

  removeBack() {
    if (this.isEmpty()) return undefined;

    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];

    return result;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;

    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) return undefined;

    return this.items[this.count - 1];
  }

  isEmpty() {
    // return this.size() === 0;
    return this.count - this.lowestCount === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) return "";

    let objString = `${this.items[this.lowestCount]}`;

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }

    return objString;
  }
}

const deque = new Deque();

console.log(deque.isEmpty());

deque.addBack("John");
deque.addBack("Jack");

console.log(deque.toString());

deque.addBack("Camila");

console.log(deque.toString());
console.log(deque.size());
console.log(deque.isEmpty());

deque.removeFront();

console.log(deque.toString());

deque.removeBack();

console.log(deque.toString());

deque.addFront("John");

console.log(deque.toString());
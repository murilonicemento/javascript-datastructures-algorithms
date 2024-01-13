/**
 * • enqueue(element): esse método adiciona um novo elemento no final da fila.
 * • dequeue(): esse método remove o primeiro elemento da fila (o item que está na frente). Também devolve o elemento removido.
 * • peek(): esse método devolve o primeiro elemento da fila – é o primeiro item adicionado e o primeiro que será removido da fila. A fila não é modificada (o elemento não é removido, mas será devolvido apenas como informação – é muito semelhante ao método peek da classe Stack). Funciona igualmente como o método front, como é conhecido em outras linguagens.
 * • isEmpty(): esse método devolve true se a fila não contiver nenhum elemento, e false se o tamanho for maior que 0.
 * • size(): esse método devolve o número de elementos contidos na fila. É semelhante à propriedade length do array.
 */

class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;

    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;

    return this.items[this.lowestCount];
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

const queue = new Queue();

/**
 * • push(element(s)): esse método adiciona um novo elemento (ou vários elementos) no topo da pilha.
 * • pop(): esse método remove o elemento que está no topo da pilha. Também devolve o elemento removido.
 * • peek(): esse método devolve o elemento que está no topo da pilha. A pilha não é modificada 
  (o elemento não é removido; ele é devolvido apenas como informação).
* • isEmpty(): esse método devolve true se a pilha não contiver nenhum elemento e false se o tamanho da pilha for maior que 0.
* • clear(): esse método remove todos os elementos da pilha.
* • size(): esse método devolve o número de elementos contidos na pilha. É semelhante à propriedade length de um array.
 */
class Stack {
  constructor() {
    this._count = 0;
    this._items = {};
  }

  push(element) {
    this._items[this._count] = element;
    this._count++;
  }

  pop() {
    if (this.isEmpty()) return undefined;

    this._count--;
    const result = this._items[this._count];
    delete this._items[this._count];

    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this._items[this._count - 1];
  }

  isEmpty() {
    return this._count === 0;
  }

  size() {
    return this._count;
  }

  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this._items = {};
    this._count = 0;
  }

  toString() {
    if (this.isEmpty()) return "";

    let objString = `${this._items[0]}`;

    for (let i = 1; i < this._count; i++) {
      objString = `${objString},${this._items[i]}`;

    }
    return objString;
  }
}

const stack = new Stack();
console.log("Is Empty:", stack.isEmpty());

stack.push(5);
stack.push(8);

// let objectSymbols = Object.getOwnPropertySymbols(stack);
// console.log(objectSymbols.length);
// console.log(objectSymbols);
// console.log(objectSymbols[0]);
// stack[objectSymbols[0]].push(1);

console.log("Peek:", stack.peek());

stack.push(11);

console.log("Size:", stack.size());
console.log("Is Empty:", stack.isEmpty());

stack.push(15);

stack.pop();
stack.pop();

console.log("Size:", stack.size());

/****************************************************CONVERTENDO DECIMAIS PARA BINÁRIOS************************************************** */

function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = "";

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

console.log(decimalToBinary(233));
console.log(decimalToBinary(10));
console.log(decimalToBinary(1000));
/**
 * • push(element(s)): esse método adiciona um novo elemento (ou vários elementos) no topo da pilha.
 * • pop(): esse método remove o elemento que está no topo da pilha. Também devolve o elemento removido.
 * • peek(): esse método devolve o elemento que está no topo da pilha. A pilha não é modificada  (o elemento não é removido; ele é devolvido apenas como informação).
 * • isEmpty(): esse método devolve true se a pilha não contiver nenhum elemento e false se o tamanho da pilha for maior que 0.
 * • clear(): esse método remove todos os elementos da pilha.
 * • size(): esse método devolve o número de elementos contidos na pilha. É semelhante à propriedade length de um array.
 */

class Stack {
  constructor(private _count: number = 0, private _items: any = {}) {}

  public push(element: any): void {
    this._items[this._count] = element;
    this._count++;
  }

  public pop(): any {
    if (this.isEmpty()) return undefined;

    this._count--;
    const result = this._items[this._count];
    delete this._items[this._count];

    return result;
  }

  public peek(): any {
    return this._items[this._count - 1];
  }

  public isEmpty(): boolean {
    return this._count === 0;
  }

  public clear(): void {
    // while (!this.isEmpty()) this.pop();

    this._items = {};
    this._count = 0;
  }

  public size(): number {
    return this._count;
  }

  public toString(): string | undefined {
    if (this.isEmpty()) return undefined;

    let objString = `${this._items[0]}`;

    for (let i = 0; i < this._count; i++)
      objString = `${objString}, ${this._items[i]}`;

    return objString;
  }
}

const stack = new Stack();

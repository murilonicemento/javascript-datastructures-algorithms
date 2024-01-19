/**
 * • push(element): esse método adiciona um novo elemento no final da lista.
 * • insert(element, position): esse método insere um novo elemento em uma posição específica da lista.
 * • getElementAt(index): esse método devolve o elemento que está em uma posição específica da lista. Se o elemento não estiver na lista, undefined será devolvido.
 * • remove(element): esse método remove um elemento da lista.
 * • indexOf(element): esse método devolve o índice do elemento na lista. Se o elemento não estiver na lista, -1 será devolvido.
 * • removeAt(position): esse método remove um item de uma posição específica da lista.
 * • isEmpty(): esse método devolve true se a lista ligada não contiver nenhum elemento, e false se o tamanho da lista ligada for maior que 0.
 * • size(): esse método devolve o número de elementos contidos na lista ligada. É semelhante à propriedade length do array.
 * • toString(): esse método devolve uma representação em string da lista ligada. Como a lista usa uma classe Node como elemento, devemos sobrescrever o método toString default herdado da classe Object de JavaScript a fim de exibir somente os valores dos elementos.
 */

import { Node } from "./models/linked-list-models.js";
import { defaultEqual } from "./util.js";

export class LinkedList {
  constructor(equalsFn = defaultEqual) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element);
    console.log(node);
  }
}

const linkedList = new LinkedList();
linkedList.push("john");
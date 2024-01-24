/**
 * • add(element): adiciona um novo element ao conjunto.
 * • delete(element): remove element do conjunto.
 * • has(element): devolve true se element estiver no conjunto, e false caso contrário.
 * • clear(): remove todos os elementos do conjunto.
 * • size(): devolve quantos elementos estão contidos no conjunto.
 É semelhante à propriedade length de um array.
 * • values(): devolve um array com todos os valores (elementos) que estão no conjunto.
 */
class Set {
  constructor() {
    this.items = {};
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element; // {1}
      return true;
    }

    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element]; // {1}
      return true;
    }

    return false;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
    // let count = 0;

    // for (const key in this.items) {
    //   if (this.items.hasOwnProperty(key)) count++;
    // }

    // return count;
  }

  values() {
    return Object.values(this.items);
    // let values = [];

    // for (let key in this.items) {
    //   if (this.items.hasOwnProperty(key)) values.push(key);
    // }

    // return values;
  }
}

const set = new Set();

set.add(1);

console.log(set.values()); // exibe [1]
console.log(set.has(1)); // exibe true
console.log(set.size()); // exibe 1

set.add(2);

console.log(set.values()); // exibe [1, 2]
console.log(set.has(2)); // true
console.log(set.size()); // 2

set.delete(1);

console.log(set.values()); // exibe [2]

set.delete(2);

console.log(set.values()); // exibe []

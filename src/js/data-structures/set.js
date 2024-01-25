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

  union(otherSet) {
    const unionSet = new Set(); // {1}

    this.values().forEach(value => unionSet.add(value)); // {2}
    otherSet.values().forEach(value => unionSet.add(value)); // {3}

    return unionSet;
  }

  intersection(otherSet) {
    // const intersectionSet = new Set(); // {1}
    // const values = this.values();

    // for (let i = 0; i < values.length; i++) { // {2}
    //   if (otherSet.has(values[i])) { // {3}
    //     intersectionSet.add(values[i]); // {4}
    //   }
    // }

    // return intersectionSet;

    const intersectionSet = new Set(); // {1}
    const values = this.values(); // {2}
    const otherValues = otherSet.values(); // {3}
    let biggerSet = values; // {4}
    let smallerSet = otherValues; // {5}

    if (otherValues.length - values.length > 0) { // {6}
      biggerSet = otherSet;
      smallerSet = values;
    }

    smallerSet.forEach(value => { // {7}
      if (biggerSet.includes(value)) intersectionSet.add(value);
    });

    return intersectionSet;
  }

  difference(otherSet) {
    const differenceSet = new Set(); // {1}

    this.values().forEach(value => { // {2}
      if (!otherSet.has(value)) { // {3}
        differenceSet.add(value); // {4}
      }
    });

    return differenceSet;
  }

  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) return false; // {1}

    let isSubset = true; // {2}

    this.values().every(value => { // {3}
      if (!otherSet.has(value)) { // {4}
        isSubset = false; // {5}
        return false;
      }
      return true; // {6}
    });

    return isSubset; // {7}
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

const setA = new Set();

setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();

setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

const unionAB = setA.union(setB);

console.log(unionAB.values());

const intersectionAB = setA.intersection(setB);

console.log(intersectionAB.values());

const differenceAB = setA.difference(setB);

console.log(differenceAB.values());

const setC = new Set();

setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.isSubsetOf(setB));
console.log(setA.isSubsetOf(setC));

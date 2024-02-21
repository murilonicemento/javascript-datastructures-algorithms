// import Dictionary from './dictionary';

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

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn; // {1}
    this.table = {}; // {2}
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key); // {1}
      this.table[tableKey] = new ValuePair(key, value); // {2}
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)]; // {1}

    return valuePair == null ? undefined : valuePair.value; // {2}

    // if (this.hasKey(key)) {
    //   return this.table[this.toStrFn(key)];
    // }
    // return undefined;
  }

  keyValues() {
    return Object.values(this.table);

    // const valuePairs = [];
    // for (const k in this.table) { // {1}
    //   if (this.hasKey(k)) {
    //     valuePairs.push(this.table[k]); // {2}
    //   }
    // }
    // return valuePairs;

  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key);

    // const keys = [];
    // const valuePairs = this.keyValues();
    // for (let i = 0; i < valuePairs.length; i++) {
    //   keys.push(valuePairs[i].key);
    // }
    // return keys;
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value);

    // const values = [];
    // const valuePairs = this.keyValues();
    // for (let i = 0; i < valuePairs.length; i++) {
    //   keys.push(valuePairs[i].value);
    // }
    // return values;
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues(); // {1}

    for (let i = 0; i < valuePairs.length; i++) { // {2}
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // {3}
      if (result === false) break; // {4}
    }
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) return '';

    const valuesPair = this.keyValues();
    let objString = `${valuesPair[0].toString()}`; // {1}

    for (let i = 1; i < valuesPair.length; i++) {
      objString = `${objString}, ${valuesPair[i].toString}`; // {2}
    }

    return objString; // {3}
  }
}

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected; // {1}
    this.vertices = []; // {2}
    this.adjList = new Dictionary(); // {3}
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) { // {5}
      this.vertices.push(v); // {6}
      this.adjList.set(v, []); // {7}
    }
  }

  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v); // {8}
    }

    if (!this.adjList.get(w)) {
      this.addVertex(w); // {9}
    }

    this.adjList.get(v).push(w); // {10}

    if (!this.isDirected) {
      this.adjList.get(w).push(v); // {11}
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';

    for (let i = 0; i < this.vertices.length; i++) { // {15}
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]); // {16}

      for (let j = 0; j < neighbors.length; j++) { // {17}
        s += `${neighbors[j]}`;
      }

      s += '\n'; // {18}
    }

    return s;
  }
}

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // {12}

for (let i = 0; i < myVertices.length; i++) { // {13}
  graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B'); // {14}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

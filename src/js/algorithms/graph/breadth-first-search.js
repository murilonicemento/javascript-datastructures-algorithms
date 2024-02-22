// import Queue from '../../data-structures/queue';

const { version } = require("yargs");

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
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

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

class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this.items = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

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

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

const initializeColor = vertices => {
  const color = {};

  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }

  return color;
};

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices); // {1}
  const queue = new Queue(); // {2}

  queue.enqueue(startVertex); // {3}

  while (!queue.isEmpty()) { // {4}
    const u = queue.dequeue(); // {5}
    const neighbors = adjList.get(u); // {6}
    color[u] = Colors.GREY; // {7}

    for (let i = 0; i < neighbors.length; i++) { // {8}
      const w = neighbors[i]; // {9}

      if (color[w] === Colors.WHITE) { // {10}
        color[w] = Colors.GREY; // {11}
        queue.enqueue(w); // {12}
      }
    }

    color[u] = Colors.BLACK; // {13}

    if (callback) { // {15}
      callback(u);
    }
  }
};

const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distance = {}; // {1}
  const predecessor = {}; // {2}

  queue.enqueue(startVertex);

  for (let i = 0; i < vertices.length; i++) { // {3}
    distance[vertices[i]] = 0; // {4}
    predecessor[vertices[i]] = null; // {5}
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];

      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distance[w] = distance[u] + 1; // {6}
        predecessor[w] = u; // {7}
        queue.enqueue(w);
      }
    }

    color[u] = color.BLACK;
  }

  return { distance, predecessor }; // {8}
};

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

const printVertex = (value) => console.log(`Visited vertex: ${value}`); // {15}
breadthFirstSearch(graph, myVertices[0], printVertex);

const shortestPathA = BFS(graph, myVertices[0]);
console.log(shortestPathA);

const fromVertex = myVertices[0]; // {9}

for (let i = 1; i < myVertices.length; i++) { // {10}
  const toVertex = myVertices[i]; // {11}
  const path = new Stack(); // {12}

  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessor[v]) { // {13}
    path.push(v); // {14}
  }

  path.push(fromVertex); // {15}
  let s = path.pop(); // {16}

  while (!path.isEmpty()) { // {17}
    s += ` - ${path.pop()}`; // {18}
  }

  console.log(s); // {19}
}

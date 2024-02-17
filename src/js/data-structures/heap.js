// import {
//   Compare, defaultCompare, reverseCompare, swap
// } from '../util';

/**
 * insert(value): esse método insere um novo value no heap. Devolve true se
 value for inserido com sucesso, e false caso contrário.
 * • extract(): esse método remove o value mínimo (heap mínimo)
 ou máximo (heap máximo) e devolve esse valor.
 * • findMinimum(): esse método devolve o value mínimo (heap mínimo)
 ou máximo (heap máximo) sem removê-lo.
*/

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // {1}
    this.heap = []; // {2}
  }

  getLeftIndex(index) {
    return 2 * index + 1;
  }

  getRightIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    if (index === 0) return undefined;

    return Math.floor((index - 1) / 2);
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value); // {1}
      this.siftUp(this.heap.length - 1); // {2}

      return true;
    }

    return false;
  }

  siftUp(index) {
    let parent = this.getParentIndex(index); // {1}

    while (
      index > 0
      && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
    ) { // {2}
      swap(this.heap, parent, index); // {3}
      index = parent;
      parent = this.getParentIndex(index); // {4}
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]; // {1}
  }
}
class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.compareFn = reverseCompare(compareFn);
  }
}

const minHeap = new MinHeap();
const maxHeap = new MaxHeap();

minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(1);

console.log('Heap size: ', minHeap.size()); // 5
console.log('Heap is empty: ', minHeap.isEmpty()); // false
console.log('Heap min value: ', minHeap.findMinimum()); // 1

console.log(maxHeap);

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
}
class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.compareFn = reverseCompare(compareFn);
  }
}

const maxHeap = new MaxHeap();

console.log(maxHeap);

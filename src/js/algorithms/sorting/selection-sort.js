// import { Compare, defaultCompare, swap } from '../../util';

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

function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

const selectionSort = (array, compareFn = defaultCompare) => {
  const { length } = array; // {1}
  let indexMin;

  for (let i = 0; i < length - 1; i++) { // {2}
    indexMin = i; // {3}

    for (let j = i; j < length; i++) { // {4}
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) { // {5}
        indexMin = j; // {6}
      }
    }

    if (i !== indexMin) { // {7}
      swap(array, i, indexMin);
    }
  }

  return array;
};

function createNonSortedArray(size) { // 6
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}

let array = createNonSortedArray(5);

console.log(array.join());
array = selectionSort(array);
console.log(array.join());

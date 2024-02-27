// import { Compare, defaultCompare } from '../../util';

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

function insertionSort(array, compareFn = defaultCompare) {
  const { length } = array; // {1}
  let temp;

  for (let i = 1; i < length; i++) { // {2}
    let j = i; // {3}
    temp = array[i]; // {4}

    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) { // {5}
      array[j] = array[j - 1]; // {6}
      j--;
    }

    array[j] = temp; // {7}
  }

  return array;
}

function createNonSortedArray(size) { // 6
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}

let array = createNonSortedArray(5); // {7}
console.log(array.join()); // {8}
array = insertionSort(array); // {9}
console.log(array.join()); // {10}

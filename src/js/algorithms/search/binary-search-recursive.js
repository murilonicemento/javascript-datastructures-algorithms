// import { Compare, defaultCompare, DOES_NOT_EXIST } from '../../util';
// import { quickSort } from '../sorting/quicksort';

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

const DOES_NOT_EXIST = -1;

function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)]; // {8}
  let i = left; // {9}
  let j = right; // {10}

  while (i <= j) { // {11}
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) { // {12}
      i++;
    }

    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) { // {13}
      j--;
    }

    if (i <= j) { // {14}
      swap(array, i, j); // {15}
      i++;
      j--;
    }
  }

  return i; // {16}
}

function quick(array, left, right, compareFn) {
  let index; // {1}

  if (array.length > 1) { // {2}
    index = partition(array, left, right, compareFn); // {3}

    if (left < index - 1) { // {4}
      quick(array, left, index - 1, compareFn); // {5}
    }

    if (index < right) { // {6}
      quick(array, index, right, compareFn); // {7}
    }
  }

  return array;
}

function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}

function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) { // {1}
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    }
    if (compareFn(element, value) === Compare.BIGGER_THAN) { // {2}
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    }

    return mid; // {3}
  }

  return DOES_NOT_EXIST; // {4}
}

function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;

  return binarySearchRecursive(array, value, low, high, compareFn);
}

export { binarySearch };

// import { Compare, defaultCompare, DOES_NOT_EXIST } from '../../util';
// import { quickSort } from '../sorting/quicksort';

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

const DOES_NOT_EXIST = -1;

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

function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array); // {1}
  let low = 0; // {2}
  let high = sortedArray.length - 1; // {3}

  while (low <= high) { // {4}
    const mid = Math.floor((low + high) / 2); // {5}
    const element = sortedArray[mid]; // {6}

    if (compareFn(element, value) === Compare.LESS_THAN) { // {7}
      low = mid + 1; // {8}
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) { // {9}
      high = mid - 1; // {10}
    } else {
      return mid; // {11}
    }
  }

  return DOES_NOT_EXIST; // {12}
}

export { binarySearch };

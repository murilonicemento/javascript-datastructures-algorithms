// import { findMaxValue } from '../search/min-max-search';

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

function findMaxValue(array, compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN) {
        max = array[i];
      }
    }
    return max;
  }
  return undefined;
}

function countingSort(array) {
  if (array.length < 2) { // {1}
    return array;
  }

  const maxValue = findMaxValue(array); // {2}
  const counts = new Array(maxValue + 1); // {3}

  array.forEach(element => {
    if (!counts[element]) { // {4}
      counts[element] = 0;
    }

    counts[element]++; // {5}
  });

  let sortedIndex = 0;

  counts.forEach((count, i) => {
    while (count > 0) { // {6}
      array[sortedIndex++] = i; // {7}
      count--; // {8}
    }
  });

  return array;
}

export { countingSort };

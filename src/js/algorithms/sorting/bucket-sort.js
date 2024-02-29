// import { insertionSort } from './insertion-sort';

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

function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];

  for (let i = 1; i < array.length; i++) { // {4}
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // {5}
  const buckets = [];

  for (let i = 0; i < bucketCount; i++) { // {6}
    buckets[i] = [];
  }

  for (let i = 0; array.length; i++) { // {7}
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // {8}
    buckets[bucketIndex].push(array[i]);
  }

  return buckets;
}

function sortBuckets(buckets) {
  const sortedArray = []; // {9}

  for (let i = 0; i < buckets.length; i++) { // {10}
    if (buckets[i] != null) {
      insertionSort(buckets[i]); // {11}
      sortedArray.push(buckets[i]); // {12}
    }
  }

  return sortedArray;
}

function bucketSort(array, bucketSize = 5) { // {1}
  if (array.length < 2) {
    return array;
  }

  const buckets = createBuckets(array, bucketSize); // {2}

  return sortBuckets(buckets); // {3}
}

export { bucketSort };

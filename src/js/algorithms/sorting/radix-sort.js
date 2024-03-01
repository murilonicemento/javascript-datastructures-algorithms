// import { findMaxValue, findMinValue } from '../search/min-max-search';

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

function findMinValue(array, compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compareFn(min, array[i]) === Compare.BIGGER_THAN) {
        min = array[i];
      }
    }
    return min;
  }
  return undefined;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];

  for (let i = 0; i < radixBase; i++) { // {5}
    buckets[i] = 0;
  }

  for (let i = 0; i < array.length; i++) { // {6}
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); // {7}
    buckets[bucketsIndex]++; // {8}
  }

  for (let i = 1; i < radixBase; i++) { // {9}
    buckets[i] += buckets[i - 1];
  }

  for (let i = array.length - 1; i >= 0; i--) { // {10}
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); // {11}
    aux[--buckets[bucketsIndex]] = array[i]; // {12}
  }

  for (let i = 0; i < array.length; i++) { // {13}
    array[i] = aux[i];
  }

  return array;
}

function radixSort(array, radixBase = 10) {
  if (array.length < 2) return array;

  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);
  let significantDigit = 1; // {1}

  while ((maxValue - minValue) / significantDigit >= 1) { // {2}
    array = countingSortForRadix(array, radixBase, significantDigit, minValue); // {3}
    significantDigit *= radixBase; // {4}
  }

  return array;
}

export { radixSort };

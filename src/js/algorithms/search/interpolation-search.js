// import {
//   biggerEquals,
//   Compare,
//   defaultCompare,
//   defaultEquals,
//   defaultDiff,
//   DOES_NOT_EXIST,
//   lesserEquals
// } from '../../util';

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function biggerEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function defaultEquals(a, b) {
  return a === b;
}

function defaultDiff(a, b) {
  return Number(a) - Number(b);
}

const DOES_NOT_EXIST = -1;

function lesserEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

function interpolationSearch(
  array,
  value,
  compareFn = defaultCompare,
  equalsFn = defaultEquals,
  diffFn = defaultDiff
) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;

  while (
    low <= high
    && biggerEquals(value, array[low], compareFn)
    && lesserEquals(value, array[high], compareFn)
  ) {
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low]); // {1}
    position = low + Math.floor((high - low) * delta); // {2}

    if (equalsFn(array[position], value)) { // {3}
      return position;
    }

    if (compareFn(array[position], value) === Compare.LESS_THAN) { // {4}
      low = position + 1;
    }

    if (compareFn(array[position], value) === Compare.BIGGER_THAN) {
      high = position - 1;
    }
  }

  return DOES_NOT_EXIST;
}

export { interpolationSearch };

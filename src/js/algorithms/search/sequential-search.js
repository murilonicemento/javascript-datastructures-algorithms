// import { defaultEquals, DOES_NOT_EXIST } from '../../util';

function defaultEquals(a, b) {
  return a === b;
}

const DOES_NOT_EXIST = -1;

function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) { // {1}
    if (equalsFn(value, array[i])) { // {2}
      return i; // {3}
    }
  }

  return DOES_NOT_EXIST; // {4}
}

export { sequentialSearch };

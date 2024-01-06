// ? Criando array
let daysOfWeek = new Array();
daysOfWeek = new Array(7);
daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

// ? Preferido

daysOfWeek = [];

daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // {3}

console.log('daysOfWeek.length', daysOfWeek.length);

// ? Percorrer um array

for (let i = 0; i < daysOfWeek.length; i++) {
  console.log(`daysOfWeek[${i}]`, daysOfWeek[i]);
}

const fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 1;

for (let i = 0; i < 20; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
}

// ? Acrescentando elementos

// ! No final

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
numbers[numbers.length] = 10;

numbers.push(11);
numbers.push(12, 13);

// ! No início

Array.prototype.insertFirstPosition = function (value) {
  for (let i = this.length; i >= 0; i--) {
    this[i] = this[i - 1];
  }
  this[0] = value;
};
numbers.insertFirstPosition(-1);

numbers.unshift(-2);
numbers.unshift(-4, -3);

// ? Removendo elementos

// ! No final

numbers.pop();

// ! No início

for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i + 1];
}

Array.prototype.reIndex = function (myArray) {
  const newArray = [];
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] !== undefined) {
      newArray.push(myArray[i]);
    }
  }

  return newArray;
};

// remove a primeira posição manualmente e executa reIndex
Array.prototype.removeFirstPosition = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }

  return this.reIndex(this);
};

numbers = numbers.removeFirstPosition();

numbers.shift();

// ? Adicionando e removendo elementos de uma posição específica
// removendo elementos a partir da 5 posição
numbers.splice(5, 3);

delete numbers[0];
// adicionando em elementos a partir da 5 posição
numbers.splice(5, 0, 2, 3, 4);

// removendo e adicionando elementos
numbers.splice(5, 3, 2, 3, 4);

// ? Arrays bidimensionais e multidimensionais

let averageTemDay = [];
averageTemDay[0] = [72, 75, 79, 79, 81, 81];
averageTemDay[1] = [81, 79, 75, 75, 73, 72];

averageTemp[0] = [];
averageTemp[0][0] = 72;
averageTemp[0][1] = 75;
averageTemp[0][2] = 79;
averageTemp[0][3] = 79;
averageTemp[0][4] = 81;
averageTemp[0][5] = 81;

averageTemp[1] = [];
averageTemp[1][0] = 81;
averageTemp[1][1] = 79;
averageTemp[1][2] = 75;
averageTemp[1][3] = 75;
averageTemp[1][4] = 73;
averageTemp[1][5] = 73;

function printMatrix(myMatrix) {
  for (let i = 0; i < myMatrix.length; i++) {
    for (let j = 0; j < myMatrix[i].length; j++) {
      console.log(myMatrix[i][j]);
    }
  }
}

printMatrix(averageTemDay);

// ? Matriz multidimensional

const matrix3x3x3 = [];

for (let i = 0; i < matrix3x3x3.length; i++) {
  matrix3x3x3[i] = [];
  for (let j = 0; j < matrix3x3x3[i].length; j++) {
    matrix3x3x3[i][j] = [];
    for (let z = 0; z < matrix3x3x3[i][j].length; z++) {
      matrix3x3x3[i][j][z] = i + j + z;
    }
  }
}

// ? Juntando arrays

const zero = 0;
const positiveNumbers = [1, 2, 3];
const negativeNumbers = [-3, -2, -1];
let numbers = negativeNumbers.concat(zero, positiveNumbers);

// ? Função de iteração

function isEven(x) {
  return x % 2 === 0 ? true : false;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// ? Iterando com o método every

numbers.every(isEven);

// ? Iterando com o método some

numbers.some(isEven);

// ? Iterando com forEach

numbers.forEach(x => console.log(x % 2 === 0));

// ? Usando map e filter

const myMap = numbers.map(isEven);

const evenNumbers = numbers.filter(isEven);

// ? Usando o método reduce

// ! parâmetros: previousValue, currentValue, index e array

numbers.reduce((previous, current) => previous + current);

// ? Iterando com o laço for…of

for (const n of numbers) {
  console.log(n % 2 === 0 ? 'even' : 'odd');
}

// ? Usando o objeto @@iterator

let iterator = numbers[Symbol.iterator]();

console.log('iterator.next().value', iterator.next().value); // 1
console.log('iterator.next().value', iterator.next().value); // 2
console.log('iterator.next().value', iterator.next().value); // 3
console.log('iterator.next().value', iterator.next().value); // 4
console.log('iterator.next().value', iterator.next().value); // 5

iterator = numbers[Symbol.iterator]();

for (const n of iterator) {
  console.log(n);
}

// ? Métodos entries, key e values de array

let aEntries = numbers.entries(); // retrieve iterator of key/value

console.log('aEntries.next().value', aEntries.next().value); // [0, 1] - position 0, value 1
console.log('aEntries.next().value', aEntries.next().value); // [1, 2] - position 1, value 2
console.log('aEntries.next().value', aEntries.next().value); // [2, 3] - position 2, value 3

aEntries = numbers.entries();

for (const n of aEntries) {
  console.log(n);
}


const aKeys = numbers.keys(); // obtém um iterator de chaves

console.log(aKeys.next()); // {value: 0, done: false }
console.log(aKeys.next()); // {value: 1, done: false }
console.log(aKeys.next()); // {value: 2, done: false }

/**
 * Para o array numbers, keys conterá os índices do array. Quando não houver 
 * mais valores para iterar, o código aKeys.next() devolverá undefined como 
 * value e done como true. Se done tiver um valor igual a false, isso significa
 * que ainda há mais chaves para iterar no array.
 */

const aValues = numbers.values();

console.log(aValues.next()); // {value: 1, done: false }
console.log(aValues.next()); // {value: 2, done: false }
console.log(aValues.next()); // {value: 3, done: false }

// ? Usando o método from

// ! O método Array.from cria outro array a partir de um array existente

let numbers2 = Array.from(numbers);

let evens = Array.from(numbers, x => x % 2 === 0);

// ? Usando o método Array.of

// ! O método Array.of cria outro array a partir dos argumentos passados para o método.

let numbers3 = Array.of(1);
let numbers4 = Array.of(1, 2, 3, 4, 5, 6);
let numbersCopy = Array.of(...numbers4);

// ? Usando o método fill

// ! O método fill preenche o array com um valor

numbersCopy.fill(0);

// * Passando index de início

numbersCopy.fill(2, 1); // [0,2,2,2,2,2]

// * Passando index final

numbersCopy.fill(1, 3, 5); //  [0,2,2,1,1,2]

// * Inicializando um array

let ones = Array(6).fill(1); // [1,1,1,1,1,1]

// ? Usando o método copyWithin

// ! O método copyWithin copia uma sequência de valores do array para a posição de um índice de início

let copyArray = [1, 2, 3, 4, 5, 6];

copyArray.copyWithin(0, 3); // [4,5,6,4,5,6]

opyArray = [1, 2, 3, 4, 5, 6];
copyArray.copyWithin(1, 3, 5); // [1,4,5,4,5,6]

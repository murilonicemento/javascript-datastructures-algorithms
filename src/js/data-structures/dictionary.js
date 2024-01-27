// import { defaultToString } from '../util';
// import { ValuePair } from './models/value-pair';

/**
 * • set(key, value): esse método adiciona um novo elemento ao dicionário.
  Se key já existir, seu valor será sobrescrito com o novo valor.
 * • remove(key): esse método remove value do dicionário usando key como o parâmetro de busca.
 * • hasKey(key): esse método devolve true se key estiver presente no dicionário,
  e false caso contrário.
 * • get(key): esse método devolve um value específico do dicionário usando
 key como o parâmetro de busca.
 * • clear(): esse método remove todos os valores do dicionário.
 * • size(): esse método devolve a quantidade de valores contida no dicionário.
  É semelhante à propriedade length da classe Array.
 * • isEmpty(): esse método devolve true se size for igual a zero, e false caso contrário.
 * • keys(): esse método devolve um array com todas as chaves contidas no dicionário.
 * • values(): esse método devolve um array com todos os valores contidos no dicionário.
 * • keyValues(): esse método devolve um array com todos os pares de valores
  [chave, valor] contidos no dicionário.
 * • forEach(callBackFn): esse método itera pelos valores (value) do
  dicionário. A função callbackFn tem dois parâmetros: key e value. Esse
  método também pode ser interrompido caso a função de callback devolva
  false (é semelhante ao método every da classe Array).
 */

function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } if (item === undefined) {
    return 'UNDEFINED';
  } if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn; // {1}
    this.table = {}; // {2}
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key); // {1}
      this.table[tableKey] = new ValuePair(key, value); // {2}
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)]; // {1}

    return valuePair == null ? undefined : valuePair.value; // {2}

    // if (this.hasKey(key)) {
    //   return this.table[this.toStrFn(key)];
    // }
    // return undefined;
  }

  keyValues() {
    return Object.values(this.table);

    // const valuePairs = [];
    // for (const k in this.table) { // {1}
    //   if (this.hasKey(k)) {
    //     valuePairs.push(this.table[k]); // {2}
    //   }
    // }
    // return valuePairs;

  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key);

    // const keys = [];
    // const valuePairs = this.keyValues();
    // for (let i = 0; i < valuePairs.length; i++) {
    //   keys.push(valuePairs[i].key);
    // }
    // return keys;
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value);

    // const values = [];
    // const valuePairs = this.keyValues();
    // for (let i = 0; i < valuePairs.length; i++) {
    //   keys.push(valuePairs[i].value);
    // }
    // return values;
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues(); // {1}

    for (let i = 0; i < valuePairs.length; i++) { // {2}
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // {3}
      if (result === false) break; // {4}
    }
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) return '';

    const valuesPair = this.keyValues();
    let objString = `${valuesPair[0].toString()}`; // {1}

    for (let i = 1; i < valuesPair.length; i++) {
      objString = `${objString}, ${valuesPair[i].toString}`; // {2}
    }

    return objString; // {3}
  }
}

const dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.hasKey('Gandalf'));

console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));

dictionary.remove('John');

console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.keyValues());

dictionary.forEach((key, value) => {
  console.log('forEach: ', `key: ${key}, value: ${value}`);
});

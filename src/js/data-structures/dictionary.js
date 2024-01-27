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

}

const dictionary = new Dictionary();

dictionary.set(0, 10);
dictionary.set(1, 20);

console.log(dictionary.table);
